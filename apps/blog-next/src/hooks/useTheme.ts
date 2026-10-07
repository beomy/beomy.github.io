'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useLocalStorage } from '@beomy/utils';
import { Theme } from '@/models/theme';
import { useThemeStore } from '@/stores/theme';

type UseTheme = () => {
  /** 현재 테마. 첫 렌더(하이드레이션 전)에는 undefined */
  theme: Theme | undefined;
  /** 사용자가 고른 테마. 스토어와 <html data-theme> 를 바꾸고 localStorage 에 기억한다 */
  setTheme: Dispatch<SetStateAction<Theme>>;
  /**
   * 시스템 동기화용. 스토어와 <html data-theme> 만 바꾸고 localStorage 에는 쓰지 않는다.
   * (초기화, OS 테마 변경 추종처럼 "사용자 선택"이 아닌 경우)
   */
  syncTheme: (theme: Theme) => void;
};

/**
 * 테마 접근의 단일 진입점. 사용처는 스토어(useThemeStore)를 직접 보지 않는다.
 */
const useTheme: UseTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const syncTheme = useThemeStore((state) => state.setTheme);
  const [, setLocalStorageTheme] = useLocalStorage<Theme>('beomy.theme');

  const setTheme: Dispatch<SetStateAction<Theme>> = useCallback(
    (valOrFunc) => {
      const next =
        typeof valOrFunc === 'function'
          ? (valOrFunc as (prev: Theme | undefined) => Theme)(theme)
          : valOrFunc;
      syncTheme(next);
      setLocalStorageTheme(next);
    },
    [setLocalStorageTheme, syncTheme, theme],
  );

  return { theme, setTheme, syncTheme };
};

export default useTheme;
