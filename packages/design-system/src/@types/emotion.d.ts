import '@emotion/react';
import type { Theme as BeomyTheme } from '../tokens';

declare module '@emotion/react' {
  export interface Theme extends BeomyTheme {}
}
