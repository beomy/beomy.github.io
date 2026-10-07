import { cva } from 'class-variance-authority';

/** IconText(내부 아이콘/텍스트) 의 타입별 아이콘 색상 */
export const messageIconTextVariants = cva('grow gap-[10px] [&>span]:w-full', {
  variants: {
    type: {
      success: '[&_svg]:text-green-50',
      info: '[&_svg]:text-blue-50',
      warning: '[&_svg]:text-orange-50',
      error: '[&_svg]:text-red-50',
    },
  },
  defaultVariants: {
    type: 'info',
  },
});
