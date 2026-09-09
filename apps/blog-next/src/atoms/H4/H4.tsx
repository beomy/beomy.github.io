import type { HTMLAttributes, ReactNode } from 'react';

export type H4Props = {
  children?: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

const H4 = ({ children, ...props }: H4Props) => {
  return <h4 {...props}>{children}</h4>;
};

export default H4;
