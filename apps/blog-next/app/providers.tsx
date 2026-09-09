'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Provider as JotaiProvider, useAtom } from 'jotai';
import { useMount, useLocalStorage } from '@beomy/utils';
import type { Theme } from '@/models/theme';
import { useTheme } from '@/hooks';
import { themeState } from '@/stores/theme';
import { Notification } from '@/organisms';
import { NavProvider } from '@/lib/nav-context';
import type { NavData } from '@/lib/nav-context';
import PrismTheme from './prism-theme';

const ThemedApp = ({ children }: { children: ReactNode }) => {
  const [theme] = useTheme();
  const [localStorageTheme] = useLocalStorage<Theme>('beomy.theme');
  const [, setRecoilTheme] = useAtom(themeState);

  useMount(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    if (localStorageTheme) {
      setRecoilTheme(localStorageTheme);
    } else if (matchMedia.matches) {
      setRecoilTheme('dark');
    } else {
      setRecoilTheme('light');
    }

    const handleModeChange = (value: MediaQueryListEvent) => {
      if (localStorage.getItem('beomy.theme')) return;
      setRecoilTheme(value.matches ? 'dark' : 'light');
    };
    matchMedia?.addEventListener?.('change', handleModeChange);
    return () => matchMedia?.removeEventListener?.('change', handleModeChange);
  });

  // 테마 변경 시 <html data-theme> 을 갱신한다. (Tailwind 다크모드 토글)
  useEffect(() => {
    if (!theme) return;
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <PrismTheme />
      {children}
      <Notification />
    </>
  );
};

const Providers = ({
  navData,
  children,
}: {
  navData: NavData;
  children: ReactNode;
}) => {
  return (
    <JotaiProvider>
      <NavProvider value={navData}>
        <ThemedApp>{children}</ThemedApp>
      </NavProvider>
    </JotaiProvider>
  );
};

export default Providers;
