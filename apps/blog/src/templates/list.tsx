import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Header, Contents, Footer } from '@/organisms';

type ListProps = {
  children: ReactNode;
};

const List = ({ children }: ListProps) => {
  return (
    <Fragment>
      <Header />
      <Contents
        width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m', 'screen.lg']}
      >
        {children}
      </Contents>
      <Footer />
    </Fragment>
  );
};

export default List;
