import { atom } from 'jotai';
import { Theme } from '@/models/theme';

export const themeState = atom<Theme | undefined>(undefined);
