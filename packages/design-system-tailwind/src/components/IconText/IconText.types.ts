import type { HTMLAttributes, ReactNode } from 'react';
import type { IconProps } from '../Icon/Icon.types';

export type IconTextProps = {
  children: ReactNode;
  /** 아이콘 이름 */
  icon: IconProps['type'];
} & HTMLAttributes<HTMLSpanElement>;
