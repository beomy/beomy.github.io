import { getAllPosts } from '@/server/posts';
import { siteMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

const escapeXml = (unsafe: string): string =>
  unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });

export async function GET() {
  const posts = await getAllPosts();
  const descPosts = [...posts].reverse();

  const items = descPosts
    .map((post) => {
      const url = `${siteMetadata.siteUrl}${post.slug}`;
      const pubDate = new Date(post.createdDate).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt)}</description>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="false">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <content:encoded><![CDATA[${post.html}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteMetadata.title)}</title>
    <description>${escapeXml(siteMetadata.description)}</description>
    <link>${escapeXml(siteMetadata.siteUrl)}</link>
    <atom:link href="${escapeXml(
      `${siteMetadata.siteUrl}rss.xml`,
    )}" rel="self" type="application/rss+xml" />
    <language>ko</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
