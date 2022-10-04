import type { LayoutProps, FlexboxProps, SpaceProps } from 'styled-system';

export type TableOfContentsProps = {
  toc?: string;
  onClick?: () => void;
} & LayoutProps &
  FlexboxProps &
  SpaceProps;
