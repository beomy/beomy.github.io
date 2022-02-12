const breakpoints = ['767px', '1056px', '1440px', '1919px'];
const colors = {
  black: '#000',
  white: '#fff',
  primary: '#1b8181',
  border1: '#efefef',
  border2: '#bcbcbc',
  bg1: '#f5f5f5',
  text1: '#292929',
  text2: '#959595',
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
  xs: `@media screen and (max-width: ${breakpoints[0]})`,
  sm: `@media screen and (max-width: ${breakpoints[1]})`,
  m: `@media screen and (max-width: ${breakpoints[2]})`,
  lg: `@media screen and (max-width: ${breakpoints[3]})`,
};
const sizes = {
  screen: {
    xs: 'calc(100% - 20px)',
    sm: '1024px',
    m: '1376px',
    lg: '1728px',
  },
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
