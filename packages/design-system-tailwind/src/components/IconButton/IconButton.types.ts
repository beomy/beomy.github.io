import type { ButtonHTMLAttributes } from 'react';
import type { IconProps } from '../Icon/Icon.types';

export type IconButtonProps = {
  /** 아이콘 이름 */
  icon: IconProps['type'];
  /** border 를 가지는 버튼 */
  border?: boolean;
  /** 아이콘 크기 */
  size?: string | number;
} & ButtonHTMLAttributes<HTMLButtonElement>;
