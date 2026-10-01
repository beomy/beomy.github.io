import { create } from 'zustand';
import type { Theme } from '@/models/theme';

type ThemeStore = {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: undefined,
  setTheme: (theme) => set({ theme }),
}));
