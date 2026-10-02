import { siteMetadata } from './metadata';

const BASE = siteMetadata.siteUrl.replace(/\/$/, '');
const LOGO = `${BASE}/assets/img/brand/beomy-logo.png`;

const toIso = (date?: string): string | undefined =>
  date ? `${date}T00:00:00+00:00` : undefined;

type BlogPostingInput = {
  title: string;
  description?: string;
  thumbnail?: string;
  createdDate?: string;
  url: string;
};

/** 포스트용 BlogPosting 구조화 데이터 */
export const buildBlogPostingJsonLd = ({
  title,
  description,
  thumbnail,
  createdDate,
  url,
}: BlogPostingInput) => {
  const published = toIso(createdDate);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description || siteMetadata.description,
    ...(thumbnail
      ? { image: [`${BASE}/assets/img/thumbnails/${thumbnail}`] }
      : {}),
    ...(published ? { datePublished: published, dateModified: published } : {}),
    author: { '@type': 'Person', name: siteMetadata.author },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.title,
      logo: { '@type': 'ImageObject', url: LOGO },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };
};

/** 사이트 전역 WebSite 구조화 데이터 (사이트 검색 액션 포함) */
export const buildWebSiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteMetadata.title,
  url: `${BASE}/`,
  description: siteMetadata.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE}/search?keyword={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

/** JSON-LD 스크립트 태그 (서버 컴포넌트에서 렌더) */
export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
