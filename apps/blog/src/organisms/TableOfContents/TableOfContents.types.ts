import type { LayoutProps, FlexboxProps, SpaceProps } from 'styled-system';

export type TableOfContentsProps = {
  toc?: string;
} & LayoutProps &
  FlexboxProps &
  SpaceProps;
