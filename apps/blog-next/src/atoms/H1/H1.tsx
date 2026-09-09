import type { HTMLAttributes, ReactNode } from 'react';

export type H1Props = {
  children?: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

const H1 = ({ children, ...props }: H1Props) => {
  return <h1 {...props}>{children}</h1>;
};

export default H1;
