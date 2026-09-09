import { cva } from 'class-variance-authority';

export const anchorVariants = cva(
  'box-border text-body no-underline hover:text-title [&.active]:text-title',
  {
    variants: {
      border: {
        true: 'rounded-[10px] border border-grey-90 px-[15px] py-[5px] hover:border-grey-70',
        false: '',
      },
    },
    defaultVariants: {
      border: false,
    },
  },
);
