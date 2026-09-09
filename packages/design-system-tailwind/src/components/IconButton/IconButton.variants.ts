import { cva } from 'class-variance-authority';

export const iconButtonVariants = cva(
  'inline-flex rounded-full p-[10px] text-body',
  {
    variants: {
      border: {
        true: 'border border-grey-90 hover:border-grey-70 hover:text-title',
        false: 'hover:bg-grey-90 hover:text-title',
      },
    },
    defaultVariants: {
      border: false,
    },
  },
);
