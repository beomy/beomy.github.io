import { atom } from 'recoil';
import { Theme } from '@/model/theme';

export const themeState = atom<Theme | undefined>({
  key: 'themeState',
  default: undefined,
});
