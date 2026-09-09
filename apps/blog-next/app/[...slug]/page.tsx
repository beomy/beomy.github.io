import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getAllCategorySlugs,
  getPostNavigation,
  getPostsByCategorySlug,
  getPostRecordBySlug,
} from '@/lib/posts';
import { buildMetadata, siteMetadata } from '@/lib/metadata';
import { JsonLd, buildBlogPostingJsonLd } from '@/lib/jsonLd';
import PostView from '@/views/PostView';
import CategoryView from '@/views/CategoryView';

export const dynamicParams = false;

type Params = { slug: string[] };

const toKey = (segments: string[]) => `/${segments.join('/')}/`;

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  const categorySlugs = await getAllCategorySlugs();

  const postParams = posts.map((post) => ({
    slug: post.slug.split('/').filter(Boolean),
  }));
  const categoryParams = categorySlugs.map((slug) => ({
    slug: slug.split('/').filter(Boolean),
  }));

  return [...postParams, ...categoryParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = toKey(slug);

  const postRecord = await getPostRecordBySlug(key);
  if (postRecord) {
    return buildMetadata({
      title: postRecord.title,
      description: postRecord.summary,
      path: key,
      type: 'article',
      image: postRecord.thumbnail
        ? `/assets/images/${postRecord.thumbnail}`
        : undefined,
      publishedTime: `${postRecord.createdDate}T00:00:00+00:00`,
    });
  }

  // 카테고리 페이지: 마지막 세그먼트를 읽기 쉬운 제목으로 사용
  const categoryName = slug[slug.length - 1] ?? '';
  return buildMetadata({
    title: categoryName,
    description: `Beomy 블로그의 "${categoryName}" 카테고리 글 목록입니다.`,
    path: key,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const key = toKey(slug);

  // 1) 포스트 슬러그인지 확인
  const navigation = await getPostNavigation(key);
  if (navigation) {
    const { post, previous, next } = navigation;
    const canonicalUrl = `${siteMetadata.siteUrl.replace(/\/$/, '')}${key}`;
    return (
      <>
        <JsonLd
          data={buildBlogPostingJsonLd({
            title: post.title,
            description: post.summary,
            thumbnail: post.thumbnail,
            createdDate: post.createdDate,
            url: canonicalUrl,
          })}
        />
        <PostView
          post={{
            title: post.title,
            url: post.slug,
            thumbnail: post.thumbnail,
            createdDate: post.createdDate,
            timeToRead: post.timeToRead,
            summary: post.summary,
            category: post.category,
            html: post.html,
            tableOfContents: post.tableOfContents,
          }}
          previous={previous}
          next={next}
          slug={key}
        />
      </>
    );
  }

  // 2) 카테고리 슬러그인지 확인
  const categorySlugs = await getAllCategorySlugs();
  if (categorySlugs.includes(key)) {
    const posts = await getPostsByCategorySlug(key);
    return <CategoryView posts={posts} slug={key} />;
  }

  notFound();
}
