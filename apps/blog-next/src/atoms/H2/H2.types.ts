import type { ReactNode } from 'react';
import type { SpaceProps, TypographyProps } from 'styled-system';

export type H2Props = {
  children: ReactNode;
} & SpaceProps &
  TypographyProps;
