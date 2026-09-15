import type { MetadataRoute } from 'next';
import { getAllPosts, getAllCategorySlugs } from '@/server/posts';
import { siteMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

const BASE = siteMetadata.siteUrl.replace(/\/$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const categorySlugs = await getAllCategorySlugs();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/about/`, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}${post.slug}`,
    lastModified: post.createdDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE}${slug}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries, ...categoryEntries];
}
