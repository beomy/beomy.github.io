'use client';

import type { ReactNode } from 'react';
import { Provider as JotaiProvider, useAtom } from 'jotai';
import { ThemeProvider } from '@emotion/react';
import { BaseStyles } from '@beomy/design-system';
import * as themes from '@beomy/design-system/tokens';
import { useMount, useLocalStorage } from '@beomy/utils';
import type { Theme } from '@/models/theme';
import { useTheme } from '@/hooks';
import { themeState } from '@/stores/theme';
import { Notification } from '@/organisms';
import { NavProvider } from '@/lib/nav-context';
import type { NavData } from '@/lib/nav-context';
import EmotionRegistry from './emotion';
import PrismTheme from './prism-theme';

const themeMap = themes as unknown as Record<Theme, (typeof themes)['light']>;

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

  return (
    <ThemeProvider theme={themeMap[theme ?? 'light']}>
      <BaseStyles />
      <PrismTheme />
      {children}
      <Notification />
    </ThemeProvider>
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
    <EmotionRegistry>
      <JotaiProvider>
        <NavProvider value={navData}>
          <ThemedApp>{children}</ThemedApp>
        </NavProvider>
      </JotaiProvider>
    </EmotionRegistry>
  );
};

export default Providers;
