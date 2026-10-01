'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useMount, useLocalStorage } from '@beomy/utils';
import type { Theme } from '@/models/theme';
import { useTheme } from '@/hooks';
import { useThemeStore } from '@/stores/theme';
import { Notification } from '@/components/layout';
import { NavProvider } from '@/contexts/nav-context';
import type { NavData } from '@/contexts/nav-context';
import PrismTheme from './prism-theme';

const ThemedApp = ({ children }: { children: ReactNode }) => {
  const [theme] = useTheme();
  const [localStorageTheme] = useLocalStorage<Theme>('beomy.theme');
  const setTheme = useThemeStore((state) => state.setTheme);

  useMount(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    if (localStorageTheme) {
      setTheme(localStorageTheme);
    } else if (matchMedia.matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    const handleModeChange = (value: MediaQueryListEvent) => {
      if (localStorage.getItem('beomy.theme')) return;
      setTheme(value.matches ? 'dark' : 'light');
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
    <NavProvider value={navData}>
      <ThemedApp>{children}</ThemedApp>
    </NavProvider>
  );
};

export default Providers;
