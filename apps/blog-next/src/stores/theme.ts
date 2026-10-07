import { create } from 'zustand';
import type { Theme } from '@/models/theme';

type ThemeStore = {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
};

/**
 * 현재 테마. "진실의 원천"은 <html data-theme> 이다.
 * - 첫 페인트 전에는 layout.tsx 의 인라인 스크립트가 localStorage → OS 설정 순으로 정해 속성을 넣고,
 * - 이후에는 setTheme 이 스토어와 속성을 함께 갱신해 CSS 변수(theme.css)가 색을 바꾼다.
 * localStorage 저장(사용자 선택 기억)은 useTheme 훅의 몫이다.
 */
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: undefined,
  setTheme: (theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }
    set({ theme });
  },
}));
