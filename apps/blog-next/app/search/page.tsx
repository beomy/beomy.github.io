import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPostsDesc } from '@/server/posts';
import { buildMetadata } from '@/lib/metadata';
import SearchView from '@/views/SearchView';

export const metadata: Metadata = {
  ...buildMetadata({ title: 'Search', path: '/search/' }),
  // 검색 결과 페이지는 색인 대상에서 제외
  robots: { index: false, follow: true },
};

export default async function Page() {
  const posts = await getPostsDesc();
  return (
    <Suspense>
      <SearchView posts={posts} />
    </Suspense>
  );
}
