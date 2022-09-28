import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Header, Contents, Footer } from '@/organisms';

type DefaultProps = {
  children: ReactNode;
};

const Default = ({ children }: DefaultProps) => {
  return (
    <Fragment>
      <Header />
      <Contents width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m']}>
        {children}
      </Contents>
      <Footer />
    </Fragment>
  );
};

export default Default;
