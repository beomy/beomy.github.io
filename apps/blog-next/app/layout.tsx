import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { getNavData } from '@/lib/posts';
import { siteMetadata } from '@/lib/metadata';
import Providers from './providers';

const GA_TRACKING_ID = 'G-MD8G3F353P';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author }],
  icons: {
    icon: '/assets/images/beomy-icon.png',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'Beomy RSS Feed' }],
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#663399',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navData = await getNavData();

  return (
    <html lang="ko">
      <body>
        <Providers navData={navData}>{children}</Providers>

        {/* Google Analytics (gtag) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
