const breakpoints: any = ['767px', '1056px', '1440px', '1919px'];
const colors = {
  black: '#292929',
  gray: '#959595',
  white: '#fff',
  border: '#efefef',
  bgGray: '#f5f5f5',
  primary: '#20c997',
};
const fontSizes = [
  '12px',
  '14px',
  '16px',
  '20px',
  '24px',
  '32px',
  '48px',
  '64px',
  '72px',
];
const mediaQueries = {
  xSmall: `@media screen and (max-width: ${breakpoints[0]})`,
  small: `@media screen and (max-width: ${breakpoints[1]})`,
  medium: `@media screen and (max-width: ${breakpoints[2]})`,
  large: `@media screen and (max-width: ${breakpoints[3]})`,
};
const sizes = {
  screen: ['calc(100% - 20px)', '1024px', '1376px', '1728px'],
};
const fontWeights = {
  thin: 300,
  normal: 400,
  bold: 'bold',
  bolder: 'bolder',
};

export default {
  breakpoints,
  colors,
  fontSizes,
  mediaQueries,
  sizes,
  fontWeights,
};
