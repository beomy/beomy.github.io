import React, { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/assets/themes/default';
import { Header, Contents, Footer } from '@/organisms';

interface IProp {
  children: ReactNode;
}

function List({ children }: IProp) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Contents
        width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m', 'screen.lg']}
      >
        {children}
      </Contents>
      <Footer />
    </ThemeProvider>
  );
}

export default List;
