// 클라이언트 컴포넌트에서 import 하면 빌드 단계에서 에러를 낸다. (fs 를 쓰는 서버 전용 모듈)
import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { extractMarkdownMeta, renderMarkdown } from './markdown';
import type { RenderedMarkdown } from './markdown';
// 개발 모드 HMR 센티널: 이 import 로 posts.ts 가 콘텐츠 버전 모듈에 의존하게 되어
// .md 변경 시 워처가 값을 바꾸면 Fast Refresh 가 트리거된다. (src/server/content-version.ts 참고)
import { CONTENT_VERSION } from './content-version';
import { arrayToTree } from '@/lib/tree';
import type { TreeItem } from '@/models/tree';
import type { Post } from '@/models/post';
import type { NavData } from '@/contexts/nav-context';

const POSTS_DIR = path.join(process.cwd(), 'posts');
const DRAFTS_DIR = path.join(process.cwd(), 'drafts');

type Frontmatter = {
  layout?: string;
  title: string;
  summary?: string;
  category?: string[];
  ['featured-img']?: string;
};

export type PostRecord = {
  slug: string; // 예: /tech/svelte/introduction-svelte/
  title: string;
  summary: string;
  thumbnail?: string;
  category: string[]; // frontmatter 원본 카테고리 (예: ['tech', 'svelte'])
  categorySlugs: string[]; // 슬러그 목록 (예: ['/tech/', '/tech/svelte/'])
  layout: string;
  createdDate: string; // yyyy-MM-dd
  createdTime: number; // 정렬용 timestamp
  timeToRead: number;
  excerpt: string;
  /** 마크다운 본문 원문. HTML 은 renderPost() 로 필요할 때만 렌더한다. */
  content: string;
};

/** 카테고리 배열을 계층 슬러그 목록으로 변환 (예: ['tech','svelte'] → ['/tech/','/tech/svelte/']) */
const categoryToSlugs = (category?: string[]): string[] => {
  if (!category) return [];
  let slug = '';
  return category.reduce<string[]>((acc, name) => {
    slug += `/${name}`;
    if (!acc.includes(`${slug}/`)) acc.push(`${slug}/`);
    return acc;
  }, []);
};

/** 디렉터리를 재귀적으로 순회하며 .md 파일 경로를 수집 */
const walk = (dir: string): string[] => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (entry.isFile() && entry.name.endsWith('.md')) return [full];
    return [];
  });
};

const buildRecord = (filePath: string, rootDir: string): PostRecord => {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as Frontmatter;

  // 파일 경로를 루트 기준 상대 슬러그로 변환 (앞뒤 슬래시 포함, 확장자 제거)
  const relative = path
    .relative(rootDir, filePath)
    .replace(/\.md$/, '')
    .split(path.sep)
    .join('/');
  const relativeFilePath = `/${relative}/`;

  const dateMatch = relativeFilePath.match(/\d{4}-\d{2}-\d{2}/);
  const createdDateObj = dateMatch ? new Date(dateMatch[0]) : new Date();
  const slug = dateMatch
    ? relativeFilePath.replace(`${dateMatch[0]}-`, '')
    : relativeFilePath;

  const { excerpt, timeToRead } = extractMarkdownMeta(content);

  const category = frontmatter.category ?? [];

  return {
    slug,
    title: frontmatter.title,
    summary: frontmatter.summary ?? excerpt,
    thumbnail: frontmatter['featured-img'],
    category,
    categorySlugs: categoryToSlugs(category),
    layout: frontmatter.layout ?? 'post',
    createdDate: format(createdDateObj, 'yyyy-MM-dd'),
    createdTime: createdDateObj.getTime(),
    timeToRead,
    excerpt,
    content,
  };
};

// 프로덕션(빌드 타임)에서만 캐시한다. 개발 모드에서 캐시하면 .md 를 수정해도
// 새로고침 시 이전 내용이 그대로 보여서(HMR/리로드가 반영되지 않음) 캐시하지 않는다.
const isDev = process.env.NODE_ENV === 'development';
let cache: PostRecord[] | null = null;

/** 모든 포스트를 생성일 오름차순으로 반환 (개발 모드에서는 drafts 포함) */
export const getAllPosts = async (): Promise<PostRecord[]> => {
  // CONTENT_VERSION 을 참조해 HMR 의존성이 트리쉐이킹으로 제거되지 않도록 한다.
  void CONTENT_VERSION;
  if (!isDev && cache) return cache;

  const roots: string[] = [POSTS_DIR];
  if (isDev) roots.push(DRAFTS_DIR);

  const records = roots.flatMap((root) =>
    walk(root).map((file) => buildRecord(file, root)),
  );

  records.sort((a, b) => a.createdTime - b.createdTime);
  if (!isDev) cache = records;
  return records;
};

const recordToPost = (record: PostRecord): Post => ({
  title: record.title,
  url: record.slug,
  thumbnail: record.thumbnail,
  createdDate: record.createdDate,
  timeToRead: record.timeToRead,
  summary: record.summary,
  category: record.category,
});

// 렌더 결과도 빌드 타임에만 슬러그 단위로 캐시한다 (개발 모드는 .md 수정 반영을 위해 매번 렌더).
const renderCache = new Map<string, Promise<RenderedMarkdown>>();

/**
 * 포스트 본문 HTML 과 목차를 렌더한다. shiki 하이라이트 비용이 커서
 * 모든 포스트를 미리 렌더하지 않고 상세 페이지·RSS 에서만 호출한다.
 */
export const renderPost = (record: PostRecord): Promise<RenderedMarkdown> => {
  if (isDev) return renderMarkdown(record.content);
  let rendered = renderCache.get(record.slug);
  if (!rendered) {
    rendered = renderMarkdown(record.content);
    renderCache.set(record.slug, rendered);
  }
  return rendered;
};

/** 최신순 Post 목록 (홈/검색용) */
export const getPostsDesc = async (): Promise<Post[]> => {
  const posts = await getAllPosts();
  return [...posts].reverse().map(recordToPost);
};

export const getPostRecordBySlug = async (
  slug: string,
): Promise<PostRecord | undefined> => {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
};

export type PostNavigation = {
  post: PostRecord;
  previous: Post | null;
  next: Post | null;
};

/** 포스트 상세 + 이전/다음 글 (생성일 오름차순 기준) */
export const getPostNavigation = async (
  slug: string,
): Promise<PostNavigation | undefined> => {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return undefined;

  // 생성일 오름차순 정렬에서의 이전/다음 글로 매핑
  const previousRecord = posts[index - 1];
  const nextRecord = posts[index + 1];

  return {
    post: posts[index],
    previous: previousRecord ? recordToPost(previousRecord) : null,
    next: nextRecord ? recordToPost(nextRecord) : null,
  };
};

/** 카테고리 슬러그에 속한 포스트들 (최신순) */
export const getPostsByCategorySlug = async (
  categorySlug: string,
): Promise<Post[]> => {
  const posts = await getAllPosts();
  return [...posts]
    .reverse()
    .filter((post) => post.categorySlugs.includes(categorySlug))
    .map(recordToPost);
};

/** 존재하는 모든 카테고리 슬러그 (예: '/tech/', '/tech/svelte/') */
export const getAllCategorySlugs = async (): Promise<string[]> => {
  const posts = await getAllPosts();
  return posts.reduce<string[]>(
    (acc, post) => [...new Set([...acc, ...post.categorySlugs])],
    [],
  );
};

/** Header 상단 GNB 용 최상위 카테고리 목록 */
export const getCategoryList = async (): Promise<string[]> => {
  const posts = await getAllPosts();
  return [...new Set(posts.map((post) => post.category?.[0]))].filter(
    (x): x is string => !!x,
  );
};

/** Menu(SNB) 트리 */
export const getMenuTree = async (): Promise<TreeItem[]> => {
  const posts = await getAllPosts();
  const menuArray = posts.map((post) => post.category ?? []).filter((x) => !!x);
  return arrayToTree(menuArray);
};

export const getNavData = async (): Promise<NavData> => ({
  categoryList: await getCategoryList(),
  menuTree: await getMenuTree(),
});

const EMPTY_MENU: TreeItem = { key: '', counter: 0, children: [] };

/** 카테고리 페이지 상단 서브메뉴용 1depth 메뉴 (예: '/tech/svelte/' → tech 메뉴) */
export const getCategoryMenu = async (
  categorySlug: string,
): Promise<TreeItem> => {
  const firstDepth = categorySlug.split('/').filter(Boolean)[0];
  const menuTree = await getMenuTree();
  return menuTree.find((menu) => menu.key === firstDepth) ?? EMPTY_MENU;
};
