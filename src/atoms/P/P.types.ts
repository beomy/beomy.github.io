import type { ReactNode } from 'react';
import type { SpaceProps, TypographyProps, ColorProps } from 'styled-system';

export type PTypes = {
  children: ReactNode;
  color?: any;
} & SpaceProps &
  TypographyProps &
  ColorProps;
