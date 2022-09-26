import type { ReactNode } from 'react';
import type { SpaceProps } from 'styled-system';
import type { IconProps } from '../Icon/Icon.types';

export type IconTextProps = {
  /** React Icons의 Fi 아이콘 */
  icon: IconProps['type'];

  children?: ReactNode;
} & SpaceProps;
