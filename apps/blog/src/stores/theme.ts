import { atom } from 'recoil';
import { Theme } from '@/models/theme';

export const themeState = atom<Theme | undefined>({
  key: 'themeState',
  default: undefined,
});
