import type { ReactNode } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { ThemeProvider } from '@emotion/react';
import { BaseStyles } from '@beomy/design-system';
import * as themes from '@beomy/design-system/tokens';
import { useMount, useLocalStorage } from '@beomy/utils';
import { Theme } from '@/model/theme';
import { useBeomyTheme } from '@/hooks';
import { themeState } from '@/stores/themeStore';
import { Notification } from '@/organisms';

type ElementProps = {
  children: ReactNode;
};

export const PageComponent = ({ children }: ElementProps) => {
  const [theme] = useBeomyTheme();
  const [localStorageTheme] = useLocalStorage<Theme>('beomy.theme');
  const [, setRecoilTheme] = useRecoilState(themeState);

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
    matchMedia.addEventListener('change', handleModeChange);
    return () => matchMedia.removeEventListener('change', handleModeChange);
  });

  return (
    <ThemeProvider theme={themes[theme ?? 'light']}>
      <BaseStyles />
      {children}
      <Notification />
    </ThemeProvider>
  );
};

export const RootComponent = ({ children }: ElementProps) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
