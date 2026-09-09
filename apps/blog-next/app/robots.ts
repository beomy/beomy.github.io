import type { MetadataRoute } from 'next';
import { siteMetadata } from '@/lib/metadata';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteMetadata.siteUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}
