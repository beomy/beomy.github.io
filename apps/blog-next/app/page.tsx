import type { Metadata } from 'next';
import { getPostsDesc } from '@/lib/posts';
import { buildMetadata, siteMetadata } from '@/lib/metadata';
import { JsonLd, buildWebSiteJsonLd } from '@/lib/jsonLd';
import HomeView from '@/views/HomeView';

export const metadata: Metadata = buildMetadata({
  title: `${siteMetadata.title} — Front-End 개발자 기술 블로그`,
  path: '/',
  absoluteTitle: true,
});

export default async function Page() {
  const posts = await getPostsDesc();
  return (
    <>
      <JsonLd data={buildWebSiteJsonLd()} />
      <HomeView posts={posts} />
    </>
  );
}
