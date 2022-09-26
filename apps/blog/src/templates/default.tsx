import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { BaseStyles } from '@beomy/design-system';
import { light } from '@beomy/design-system/tokens';
import { Header, Contents, Footer } from '@/organisms';

type DefaultProps = {
  children: ReactNode;
};

const Default = ({ children }: DefaultProps) => {
  return (
    <ThemeProvider theme={light as Theme}>
      <BaseStyles />
      <Header />
      <Contents width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m']}>
        {children}
      </Contents>
      <Footer />
    </ThemeProvider>
  );
};

export default Default;
