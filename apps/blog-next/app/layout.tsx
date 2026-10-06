import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { getNavData } from '@/server/posts';
import { siteMetadata } from '@/lib/metadata';
import Providers from './providers';
import './globals.css';

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
    icon: '/assets/img/brand/beomy-icon.png',
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
    // theme-init 스크립트가 하이드레이션 전에 <html data-theme> 을 설정하므로
    // 서버/클라이언트 속성 불일치는 의도된 것 → suppressHydrationWarning 으로 무시한다.
    <html lang="ko" suppressHydrationWarning>
      <body>
        {/* 페인트 전에 테마를 적용해 다크모드 플래시(FOUC)를 방지한다. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var v=localStorage.getItem('beomy.theme');var t=v?JSON.parse(v):null;if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`}
        </Script>

        <Providers navData={navData}>{children}</Providers>

        {/* Google Analytics (gtag). lazyOnload: 페이지 로드가 끝난 뒤 받는다.
            498KB 짜리 스크립트가 느린 회선에서 첫 화면 이미지(LCP)와 대역폭을 경쟁하지 않도록. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
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
