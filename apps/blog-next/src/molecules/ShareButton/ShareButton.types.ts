import { IconTypes } from '@beomy/design-system-tailwind';

export type ShareButtonProps = {
  target: 'facebook' | 'twitter' | 'linkedin' | 'line';
  url: string;
  size?: IconTypes.IconProps['size'];
};
