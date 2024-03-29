import type { Palette, StateOpacity } from './index';
import {
  black,
  blue,
  dimmed,
  green,
  reverseGrey,
  orange,
  primary,
  purple,
  red,
  white,
  yellow,
} from './base/colors';
import { fontSizes } from './base/fontSizes';
import { zIndices } from './base/zIndices';
import { breakpoints } from './base/breakpoints';
import { fontWeights } from './base/fontWeights';
import sizes from './base/sizes';

const colors: Palette = {
  grey: reverseGrey,
  primary,
  blue,
  green,
  orange,
  red,
  purple,
  yellow,
  white,
  black,
  dimmed,
  background: black,
  title: white,
  body: reverseGrey[40],
  caption: reverseGrey[50],
};

const stateOpacity: StateOpacity = {
  pressed: 0.4,
  disabled: 0.2,
};

const theme = {
  name: 'dark',
  colors,
  fontSizes,
  fontWeights,
  zIndices,
  stateOpacity,
  breakpoints,
  sizes,
};

export default theme;
