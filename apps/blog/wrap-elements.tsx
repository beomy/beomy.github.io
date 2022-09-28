import type { ReactNode } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { ThemeProvider } from '@emotion/react';
import { BaseStyles } from '@beomy/design-system';
import * as themes from '@beomy/design-system/tokens';
import { useMount } from '@beomy/utils';
import { useBeomyTheme } from '@/hooks';
import { themeState } from '@/stores/themeStore';

type ElementProps = {
  children: ReactNode;
};

export const PageComponent = ({ children }: ElementProps) => {
  const [theme = 'light'] = useBeomyTheme();
  const [, setRecoilTheme] = useRecoilState(themeState);

  useMount(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const handleModeChange = (value: MediaQueryListEvent) => {
      if (localStorage.getItem('beomy.theme')) return;
      setRecoilTheme(value.matches ? 'dark' : 'light');
    };
    matchMedia.addEventListener('change', handleModeChange);
    return () => matchMedia.removeEventListener('change', handleModeChange);
  });

  return (
    <ThemeProvider theme={themes[theme]}>
      <BaseStyles />
      {children}
    </ThemeProvider>
  );
};

export const RootComponent = ({ children }: ElementProps) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
