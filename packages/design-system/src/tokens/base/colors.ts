import Color from 'color';

export type ColorToken = string;

export type ColorLevels = {
  98: ColorToken;
  90: ColorToken;
  80: ColorToken;
  50: ColorToken;
};

export type GreyColorLevel = ColorLevels & {
  100: ColorToken;
  70: ColorToken;
  60: ColorToken;
  40: ColorToken;
  30: ColorToken;
  20: ColorToken;
  10: ColorToken;
  0: ColorToken;
};

export type Palette = {
  CTA: ColorToken;
  grey: GreyColorLevel;
  primary: ColorLevels;
  blue: ColorLevels;
  green: ColorLevels;
  orange: ColorLevels;
  red: ColorLevels;
  purple: ColorLevels;
  yellow: ColorLevels;
  white: ColorToken;
  black: ColorToken;
  dimmed: ColorToken;
  background: ColorToken;
  title: ColorToken;
  body: ColorToken;
  caption: ColorToken;
};

export const ctaStartBase = Color.hsl(277, 80, 50);
export const ctaEndBase = Color.hsl(234, 75, 50);

export const CTA: ColorToken = `linear-gradient(45deg, ${ctaStartBase.toString()} 0%, ${ctaEndBase.toString()} 100%)`;

export const greyBase = Color.hsl(0, 0, 50);
export const grey: GreyColorLevel = {
  100: greyBase.lightness(100).toString(),
  98: greyBase.lightness(98).toString(),
  90: greyBase.lightness(90).toString(),
  80: greyBase.lightness(80).toString(),
  70: greyBase.lightness(70).toString(),
  60: greyBase.lightness(60).toString(),
  50: greyBase.lightness(50).toString(),
  40: greyBase.lightness(40).toString(),
  30: greyBase.lightness(30).toString(),
  20: greyBase.lightness(20).toString(),
  10: greyBase.lightness(10).toString(),
  0: greyBase.lightness(0).toString(),
};
export const reverseGrey: GreyColorLevel = {
  100: greyBase.lightness(0).toString(),
  98: greyBase.lightness(10).toString(),
  90: greyBase.lightness(20).toString(),
  80: greyBase.lightness(30).toString(),
  70: greyBase.lightness(40).toString(),
  60: greyBase.lightness(50).toString(),
  50: greyBase.lightness(60).toString(),
  40: greyBase.lightness(70).toString(),
  30: greyBase.lightness(80).toString(),
  20: greyBase.lightness(90).toString(),
  10: greyBase.lightness(98).toString(),
  0: greyBase.lightness(100).toString(),
};

export const primaryBase = Color.hsl(234, 75, 50);
export const primary: ColorLevels = {
  98: primaryBase.lightness(98).toString(),
  90: primaryBase.lightness(90).toString(),
  80: primaryBase.lightness(80).toString(),
  50: primaryBase.lightness(50).toString(),
};

export const blueBase = Color.hsl(212, 100, 50);
export const blue: ColorLevels = {
  98: blueBase.lightness(98).toString(),
  90: blueBase.lightness(90).toString(),
  80: blueBase.lightness(80).toString(),
  50: blueBase.lightness(50).toString(),
};

export const greenBase = Color.hsl(138, 76, 50);
export const green: ColorLevels = {
  98: greenBase.lightness(98).toString(),
  90: greenBase.lightness(90).toString(),
  80: greenBase.lightness(80).toString(),
  50: greenBase.lightness(50).toString(),
};

export const orangeBase = Color.hsl(29, 100, 50);
export const orange: ColorLevels = {
  98: orangeBase.lightness(98).toString(),
  90: orangeBase.lightness(90).toString(),
  80: orangeBase.lightness(80).toString(),
  50: orangeBase.lightness(50).toString(),
};

export const redBase = Color.hsl(3, 92, 50);
export const red: ColorLevels = {
  98: redBase.lightness(98).toString(),
  90: redBase.lightness(90).toString(),
  80: redBase.lightness(80).toString(),
  50: redBase.lightness(50).toString(),
};

export const purpleBase = Color.hsl(277, 80, 80);
export const purple: ColorLevels = {
  98: purpleBase.lightness(98).toString(),
  90: purpleBase.lightness(90).toString(),
  80: purpleBase.lightness(80).toString(),
  50: purpleBase.lightness(50).toString(),
};

export const yellowBase = Color.hsl(50, 100, 50);
export const yellow: ColorLevels = {
  98: yellowBase.lightness(98).toString(),
  90: yellowBase.lightness(90).toString(),
  80: yellowBase.lightness(80).toString(),
  50: yellowBase.lightness(50).toString(),
};

export const black = Color.hsl(0, 0, 0).toString();
export const white = Color.hsl(0, 0, 100).toString();
export const dimmed = Color(black).alpha(0.7).toString();
