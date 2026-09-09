import type { HTMLAttributes, ReactNode } from 'react';

export type H2Props = {
  children?: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

const H2 = ({ children, ...props }: H2Props) => {
  return <h2 {...props}>{children}</h2>;
};

export default H2;
