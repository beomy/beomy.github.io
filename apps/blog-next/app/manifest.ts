import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'beomy-blog',
    short_name: 'beomy',
    start_url: '/',
    background_color: '#663399',
    display: 'minimal-ui',
    icons: [
      {
        src: '/assets/img/brand/beomy-icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
