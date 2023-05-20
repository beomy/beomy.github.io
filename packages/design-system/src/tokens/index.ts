import type { CSSProperties } from 'react';
import light from './light';
import dark from './dark';

export type ColorLevels = {
  98: CSSProperties['color'];
  90: CSSProperties['color'];
  80: CSSProperties['color'];
  50: CSSProperties['color'];
};

export type GreyColorLevel = ColorLevels & {
  100: CSSProperties['color'];
  70: CSSProperties['color'];
  60: CSSProperties['color'];
  40: CSSProperties['color'];
  30: CSSProperties['color'];
  20: CSSProperties['color'];
  10: CSSProperties['color'];
  0: CSSProperties['color'];
};

export type Palette = {
  grey: GreyColorLevel;
  primary: ColorLevels;
  blue: ColorLevels;
  green: ColorLevels;
  orange: ColorLevels;
  red: ColorLevels;
  purple: ColorLevels;
  yellow: ColorLevels;
  white: CSSProperties['color'];
  black: CSSProperties['color'];
  dimmed: CSSProperties['color'];
  background: CSSProperties['color'];
  title: CSSProperties['color'];
  body: CSSProperties['color'];
  caption: CSSProperties['color'];
};

export type FontWeights = {
  thin: string | number;
  normal: string | number;
  bold: string | number;
  bolder: string | number;
};

export type ZIndices = {
  toaster: number;
  bottomSheet: number;
  modal: number;
  overlay: number;
  snackbar: number;
};

export type StateOpacity = {
  pressed: number;
  disabled: number;
};

export type SizeLevels = 'xs' | 'sm' | 'm' | 'lg';

export type Sizes = {
  mediaQueries: Record<SizeLevels, string>;
  screen: Record<SizeLevels, string>;
};

export type Theme = {
  name: string;
  colors: Palette;
  fontSizes: string[];
  fontWeights: FontWeights;
  zIndices: ZIndices;
  stateOpacity: StateOpacity;
  breakpoints: string[];
  sizes: Sizes;
};

export { light, dark };
