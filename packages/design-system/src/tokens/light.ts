import type { Palette, StateOpacity } from './index';
import {
  black,
  blue,
  dimmed,
  green,
  grey,
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
  grey,
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
  background: white,
  title: black,
  body: grey[40],
  caption: grey[50],
};

const stateOpacity: StateOpacity = {
  pressed: 0.4,
  disabled: 0.2,
};

const theme = {
  name: 'light',
  colors,
  fontSizes,
  fontWeights,
  zIndices,
  stateOpacity,
  breakpoints,
  sizes,
};

export default theme;
