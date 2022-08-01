import type { ReactNode, MouseEvent } from 'react';
import type { SpaceProps, LayoutProps } from 'styled-system';

export type ButtonProps = {
  children: ReactNode;
  className?: any;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & SpaceProps &
  LayoutProps;
