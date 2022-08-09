import type { ReactNode } from 'react';
import type { GatsbyLinkProps } from 'gatsby';
import type { SpaceProps, LayoutProps } from 'styled-system';

export type LinkProps = {
  children: ReactNode;
  ref?: any;
} & SpaceProps &
  LayoutProps &
  GatsbyLinkProps<any>;
