import type { HTMLAttributes, ReactNode } from 'react';

export type UlProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLUListElement>;

const Ul = ({ children, ...props }: UlProps) => {
  return <ul {...props}>{children}</ul>;
};

export default Ul;
