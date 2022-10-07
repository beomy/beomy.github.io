import type { ReactNode } from 'react';
import type { SpaceProps } from 'styled-system';
import type { IconProps } from '../Icon/Icon.types';

export type IconTextProps = {
  children: ReactNode;
  /** React Icons의 Bs 아이콘 */
  icon: IconProps['type'];
} & SpaceProps;
