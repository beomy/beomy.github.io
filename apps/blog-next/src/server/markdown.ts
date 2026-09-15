import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import type { Root } from 'hast';

export type Heading = {
  depth: number;
  id: string;
  text: string;
};

export type ProcessedMarkdown = {
  html: string;
  tableOfContents: string;
  excerpt: string;
  timeToRead: number;
};

const TOC_MAX_DEPTH = 3;

/**
 * rehype-slug 이후, autolink 이전에 실행하여 h1~h3 헤딩 정보를 수집한다.
 * (목차는 TOC_MAX_DEPTH 까지만 포함)
 */
const collectHeadings = (headings: Heading[]) => () => (tree: Root) => {
  visit(tree, 'element', (node) => {
    const match = /^h([1-6])$/.exec(node.tagName);
    if (!match) return;
    const depth = Number(match[1]);
    const id = node.properties?.id;
    if (depth <= TOC_MAX_DEPTH && typeof id === 'string') {
      headings.push({ depth, id, text: toString(node) });
    }
  });
};

/**
 * 수집한 헤딩으로 중첩 <ul> 목차 HTML 을 생성한다.
 * TableOfContents 오거니즘은 `#id` 형태의 앵커를 기대한다.
 */
const buildTableOfContents = (headings: Heading[]): string => {
  if (headings.length === 0) return '';

  const minDepth = Math.min(...headings.map((h) => h.depth));
  let html = '';
  let currentDepth = minDepth - 1;

  headings.forEach((heading) => {
    const level = heading.depth;
    if (level > currentDepth) {
      for (let i = currentDepth; i < level; i += 1) html += '<ul>';
    } else if (level < currentDepth) {
      for (let i = level; i < currentDepth; i += 1) html += '</li></ul>';
      html += '</li>';
    } else {
      html += '</li>';
    }
    const anchor = encodeURIComponent(heading.id);
    html += `<li><a href="#${anchor}">${heading.text}</a>`;
    currentDepth = level;
  });

  for (let i = minDepth - 1; i < currentDepth; i += 1) html += '</li></ul>';

  return html;
};

/**
 * 마크다운 본문 -> 순수 텍스트 (excerpt / timeToRead 계산용)
 */
const toPlainText = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ') // 코드 블록 제거
    .replace(/`[^`]*`/g, ' ') // 인라인 코드 제거
    .replace(/<[^>]+>/g, ' ') // HTML 태그 제거
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // 이미지 제거
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 링크는 텍스트만 남김
    .replace(/[#>*_~`-]/g, ' ') // 마크다운 기호 제거
    .replace(/\s+/g, ' ')
    .trim();

const PRUNE_LENGTH = 140; // 요약(excerpt) 최대 길이

const buildExcerpt = (plainText: string): string => {
  if (plainText.length <= PRUNE_LENGTH) return plainText;
  return `${plainText.slice(0, PRUNE_LENGTH).trimEnd()}…`;
};

const WORDS_PER_MINUTE = 265;

const calcTimeToRead = (plainText: string): number => {
  const words = plainText ? plainText.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export const processMarkdown = async (
  content: string,
): Promise<ProcessedMarkdown> => {
  const headings: Heading[] = [];

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(collectHeadings(headings))
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        className: ['anchor', 'after'],
        ariaHidden: 'true',
        tabIndex: -1,
      },
      content: {
        type: 'element',
        tagName: 'span',
        properties: { className: ['anchor-icon'] },
        children: [{ type: 'text', value: '#' }],
      },
    })
    .use(rehypePrismPlus, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const plainText = toPlainText(content);

  return {
    html: String(file),
    tableOfContents: buildTableOfContents(headings),
    excerpt: buildExcerpt(plainText),
    timeToRead: calcTimeToRead(plainText),
  };
};
