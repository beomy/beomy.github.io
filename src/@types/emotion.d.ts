import '@emotion/react';
import light from '@/assets/themes/default';

type Light = typeof light;

declare module '@emotion/react' {
  export interface Theme extends Light {}
}
