import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import type { SpaceProps, ColorProps, TypographyProps } from 'styled-system';

export type IconTextProps = {
  Icon: IconType;
  iconSize?: number;
  children: ReactNode;
  color?: any;
} & SpaceProps &
  ColorProps &
  TypographyProps;
