import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@beomy/design-system-tailwind';

export type ContentsProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

const Contents = ({ children, className, ...props }: ContentsProps) => {
  return (
    <main className={cn('mx-auto pb-[10px] pt-[70px]', className)} {...props}>
      {children}
    </main>
  );
};

export default Contents;
