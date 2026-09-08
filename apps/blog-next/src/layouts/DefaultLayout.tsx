'use client';

import type { ReactNode } from 'react';
import { Header, Contents, Footer } from '@/organisms';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Contents width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m']}>
        {children}
      </Contents>
      <Footer />
    </>
  );
};

export default DefaultLayout;
