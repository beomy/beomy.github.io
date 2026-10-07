import { Feed } from 'feed';
import { getAllPosts, renderPost } from '@/server/posts';
import { siteMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

const BASE = siteMetadata.siteUrl.replace(/\/$/, '');

export async function GET() {
  // getAllPosts 는 생성일 오름차순이므로 최신 글이 먼저 오도록 뒤집는다.
  const posts = [...(await getAllPosts())].reverse();
  const rendered = await Promise.all(posts.map(renderPost));

  const feed = new Feed({
    title: siteMetadata.title,
    description: siteMetadata.description,
    id: `${BASE}/`,
    link: `${BASE}/`,
    language: 'ko',
    copyright: `© ${siteMetadata.author}`,
    feedLinks: { rss: `${BASE}/rss.xml` },
    author: { name: siteMetadata.author },
  });

  posts.forEach((post, index) => {
    const url = `${BASE}${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: rendered[index].html,
      date: new Date(post.createdDate),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
