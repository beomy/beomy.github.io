import type { ReactNode } from 'react';
import type { SpaceProps, TypographyProps } from 'styled-system';

export type H1Props = {
  children: ReactNode;
} & SpaceProps &
  TypographyProps;
