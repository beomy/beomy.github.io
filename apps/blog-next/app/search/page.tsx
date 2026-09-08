import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getPostsDesc } from '@/lib/posts';
import { buildMetadata } from '@/lib/metadata';
import SearchView from '@/views/SearchView';

export const metadata: Metadata = buildMetadata({
  title: 'Search',
  path: '/search/',
});

export default async function Page() {
  const posts = await getPostsDesc();
  return (
    <Suspense>
      <SearchView posts={posts} />
    </Suspense>
  );
}
