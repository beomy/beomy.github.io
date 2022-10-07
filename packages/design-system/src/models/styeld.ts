import type { Theme } from '@emotion/react';

export type StyledProps<T = {}> = Partial<T>;
export type CssProps<T = {}> = StyledProps<T> & { theme: Theme };
