import type { ReactNode } from 'react';
import type { ColorProps, TypographyProps, SpaceProps } from 'styled-system';

export type SpanProps = {
  children: ReactNode;
  color?: any;
} & ColorProps &
  TypographyProps &
  SpaceProps;
