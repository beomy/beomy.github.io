import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@beomy/design-system-tailwind';

export type LiProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLLIElement>;

const Li = ({ children, className, ...props }: LiProps) => {
  return (
    <li className={cn('list-none', className)} {...props}>
      {children}
    </li>
  );
};

export default Li;
