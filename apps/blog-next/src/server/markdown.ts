import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { createHighlighter, type Highlighter } from 'shiki';
import rehypeShikiFromHighlighter from '@shikijs/rehype/core';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { toHtml } from 'hast-util-to-html';
import type { Root } from 'hast';
import { getImageDimensions } from './images';

/*
 * shiki 하이라이터는 문법·테마 로드 비용이 커서 모듈 수준에서 한 번만 만들어 공유한다.
 * (포스트마다 새로 만들면 정적 생성이 수십 배 느려진다)
 */
// 고대비 변형: 기본 github 테마의 주석색(#6A737D)은 배경 대비 3.6:1 로 접근성 기준(4.5:1) 미달
const SHIKI_THEMES = {
  light: 'github-light-high-contrast',
  dark: 'github-dark-high-contrast',
} as const;
const SHIKI_LANGS = [
  'html',
  'js',
  'jsx',
  'ts',
  'tsx',
  'json',
  'http',
  'bash',
  'css',
  'scss',
];

let highlighterPromise: Promise<Highlighter> | null = null;
const getHighlighter = (): Promise<Highlighter> =>
  (highlighterPromise ??= createHighlighter({
    themes: Object.values(SHIKI_THEMES),
    langs: SHIKI_LANGS,
  }));

export type Heading = {
  depth: number;
  id: string;
  text: string;
};

export type MarkdownMeta = {
  excerpt: string;
  timeToRead: number;
};

export type RenderedMarkdown = {
  html: string;
  tableOfContents: string;
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
      // 헤딩 내부 HTML 을 그대로 보존한다 (인라인 <code> 등). 이스케이프도 toHtml 이 처리.
      headings.push({ depth, id, text: toHtml(node.children) });
    }
  });
};

/**
 * 본문 <img> 에 원본 크기(width/height)를 넣어 로드 전 영역을 확보하고(CLS 방지), lazy loading 을 건다.
 */
const rehypeImageAttributes = () => (tree: Root) => {
  visit(tree, 'element', (node) => {
    if (node.tagName !== 'img') return;
    const src = node.properties?.src;
    if (typeof src !== 'string') return;
    node.properties.loading ??= 'lazy';
    node.properties.decoding ??= 'async';
    if (!src.startsWith('/')) return; // 외부 이미지는 크기를 알 수 없다
    const size = getImageDimensions(src);
    if (!size) return;
    node.properties.width ??= size.width;
    node.properties.height ??= size.height;
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

/** 목록·메타용 경량 처리 (요약, 읽기 시간). 파이프라인을 태우지 않아 비용이 거의 없다. */
export const extractMarkdownMeta = (content: string): MarkdownMeta => {
  const plainText = toPlainText(content);
  return {
    excerpt: buildExcerpt(plainText),
    timeToRead: calcTimeToRead(plainText),
  };
};

/**
 * 본문 HTML 과 목차 렌더링. shiki 하이라이트가 포함되어 비용이 크므로
 * 포스트 상세 페이지와 RSS 처럼 실제로 HTML 이 필요한 곳에서만 호출한다.
 */
export const renderMarkdown = async (
  content: string,
): Promise<RenderedMarkdown> => {
  const headings: Heading[] = [];
  const highlighter = await getHighlighter();

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeImageAttributes)
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
    .use(rehypeShikiFromHighlighter, highlighter, {
      // 라이트/다크 색을 CSS 변수(--shiki-dark)로 함께 인라인한다.
      // 다크 전환은 PostContents.css 에서 <html data-theme='dark'> 일 때 변수를 바꿔 끼운다.
      themes: SHIKI_THEMES,
      defaultColor: 'light',
      fallbackLanguage: 'text',
      transformers: [
        {
          // 코드 블록 우상단 언어 라벨용 (PostContents.css [data-language])
          pre(node) {
            node.properties['data-language'] = this.options.lang;
          },
        },
      ],
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    html: String(file),
    tableOfContents: buildTableOfContents(headings),
  };
};
