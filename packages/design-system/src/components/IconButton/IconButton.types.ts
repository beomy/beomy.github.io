import type { LayoutProps } from 'styled-system';
import type { IconProps } from '../Icon/Icon.types';
import { MouseEvent } from 'react';

export type IconButtonProps = {
  /** React Icons의 Bs 아이콘 */
  icon: IconProps['type'];

  /** border을 가지는 IconButton */
  border?: boolean;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & Omit<IconProps, 'type'> &
  Pick<LayoutProps, 'display'>;
