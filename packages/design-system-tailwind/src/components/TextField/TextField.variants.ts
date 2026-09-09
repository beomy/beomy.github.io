import { cva } from 'class-variance-authority';

export const textFieldVariants = cva(
  'box-border flex w-full items-center justify-between [&>*]:text-body',
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
