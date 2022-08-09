import type { LayoutProps, SpaceProps } from 'styled-system';

export type ImgProps = {
  src: string;
  alt?: string;
  height?: any;
  width?: any;
} & LayoutProps &
  SpaceProps;
