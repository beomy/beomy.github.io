import type { Sizes } from '../index';
import { breakpoints } from './breakpoints';

export const mediaQueries: Sizes['mediaQueries'] = {
  xs: `@media screen and (max-width: ${breakpoints[0]})`,
  sm: `@media screen and (max-width: ${breakpoints[1]})`,
  m: `@media screen and (max-width: ${breakpoints[2]})`,
  lg: `@media screen and (max-width: ${breakpoints[3]})`,
};

export const screen: Sizes['screen'] = {
  xs: 'calc(100% - 20px)',
  sm: '1024px',
  m: '1376px',
  lg: '1728px',
};

export default {
  mediaQueries,
  screen,
};
