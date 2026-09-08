'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks';

const LIGHT_PRISM =
  'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css';
const DARK_PRISM =
  'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css';

/**
 * 코드 하이라이트(Prism) 테마 CSS 를 현재 테마에 맞춰 <head> 에 주입/교체한다.
 * (기존 post 템플릿의 Helmet <link> 대체)
 */
const PrismTheme = () => {
  const [theme] = useTheme();

  useEffect(() => {
    const href = theme === 'dark' ? DARK_PRISM : LIGHT_PRISM;
    let link = document.getElementById(
      'prism-theme',
    ) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = 'prism-theme';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (link.href !== href) link.href = href;
  }, [theme]);

  return null;
};

export default PrismTheme;
