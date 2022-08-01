import type { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/assets/themes/default';
import { Header, Contents, Footer } from '@/organisms';

type DefaultProps = {
  children: ReactNode;
};

const Default = ({ children }: DefaultProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Contents width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m']}>
        {children}
      </Contents>
      <Footer />
    </ThemeProvider>
  );
};

export default Default;
