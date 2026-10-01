'use client';

import { cn } from '@beomy/design-system-tailwind';

export type DimProps = {
  active: boolean;
  onClick?: () => void;
};

const Dim = ({ active, onClick }: DimProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'absolute left-0 top-0 h-0 w-full bg-black opacity-0',
        '[transition:opacity_0.3s_cubic-bezier(0.78,0.14,0.15,0.86),height_0s_ease_0.3s]',
        active &&
          'h-full opacity-70 [transition:opacity_0.3s_cubic-bezier(0.78,0.14,0.15,0.86)]',
      )}
    />
  );
};

export default Dim;
