import { cva } from 'class-variance-authority';

export const fieldSetVariants = cva(
  'm-0 rounded-[10px] border border-grey-70 bg-background',
  {
    variants: {
      hasTitle: {
        true: 'px-[15px] pb-[10px] pt-[5px]',
        false: 'px-[15px] py-[10px]',
      },
    },
    defaultVariants: {
      hasTitle: false,
    },
  },
);
