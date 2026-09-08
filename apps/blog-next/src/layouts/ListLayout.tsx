'use client';

import type { ReactNode } from 'react';
import { Header, Contents, Footer } from '@/organisms';

const ListLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Contents
        width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m', 'screen.lg']}
      >
        {children}
      </Contents>
      <Footer />
    </>
  );
};

export default ListLayout;
