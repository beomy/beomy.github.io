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
        width={['screen.0', 'screen.0', 'screen.1', 'screen.2', 'screen.3']}
      >
        {children}
      </Contents>
      <Footer />
    </ThemeProvider>
  );
}

export default List;
