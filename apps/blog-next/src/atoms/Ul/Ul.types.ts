import type { ReactNode } from 'react';
import type { SpaceProps, LayoutProps, FlexboxProps } from 'styled-system';

export type UlProps = {
  children: ReactNode;
} & SpaceProps &
  LayoutProps &
  FlexboxProps;
