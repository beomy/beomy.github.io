import '@emotion/react';
import type { Theme as BeomyTheme } from '@beomy/design-system/tokens';

declare module '@emotion/react' {
  export interface Theme extends BeomyTheme {}
}
