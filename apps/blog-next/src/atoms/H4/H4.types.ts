import type { ReactNode } from 'react';
import type { SpaceProps, TypographyProps } from 'styled-system';

export type H4Props = {
  children: ReactNode;
} & SpaceProps &
  TypographyProps;
