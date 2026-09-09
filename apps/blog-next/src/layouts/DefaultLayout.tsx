'use client';

import type { ReactNode } from 'react';
import { Header, Contents, Footer } from '@/organisms';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Contents className="screen-xs sm:screen-sm m:screen-m">
        {children}
      </Contents>
      <Footer />
    </>
  );
};

export default DefaultLayout;
