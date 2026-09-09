'use client';

import type { ReactNode } from 'react';
import { Header, Contents, Footer } from '@/organisms';

const ListLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Contents className="screen-xs sm:screen-sm m:screen-m lg:screen-lg">
        {children}
      </Contents>
      <Footer />
    </>
  );
};

export default ListLayout;
