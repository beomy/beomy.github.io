import type { Metadata } from 'next';
import { getPostsDesc } from '@/lib/posts';
import { buildMetadata } from '@/lib/metadata';
import HomeView from '@/views/HomeView';

export const metadata: Metadata = buildMetadata({ title: 'Home', path: '/' });

export default async function Page() {
  const posts = await getPostsDesc();
  return <HomeView posts={posts} />;
}
