import type { ReactNode } from 'react';
import type {
  LayoutProps,
  SpaceProps,
  TypographyProps,
  FlexboxProps,
} from 'styled-system';

export type ContentsProps = {
  children: ReactNode;
} & LayoutProps &
  SpaceProps &
  TypographyProps &
  FlexboxProps;
