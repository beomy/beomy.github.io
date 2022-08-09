import type { ReactNode } from 'react';
import type { SpaceProps, LayoutProps } from 'styled-system';

export type LiProps = {
  children: ReactNode;
} & SpaceProps &
  LayoutProps;
