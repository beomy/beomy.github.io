import type { Theme } from '@emotion/react';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import { BaseStyles } from '@beomy/design-system';
import { light } from '@beomy/design-system/tokens';
import { Header, Contents, Footer } from '@/organisms';

type ListProps = {
  children: ReactNode;
};

const List = ({ children }: ListProps) => {
  return (
    <ThemeProvider theme={light as Theme}>
      <BaseStyles />
      <Header />
      <Contents
        width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m', 'screen.lg']}
      >
        {children}
      </Contents>
      <Footer />
    </ThemeProvider>
  );
};

export default List;
