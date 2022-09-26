import '@emotion/react';
import light from '../tokens/light';
import dark from '../tokens/dark';

type LightTheme = typeof light;
type DarkTheme = typeof dark;

declare module '@emotion/react' {
  export interface Theme extends LightTheme, DarkTheme {}
}
