'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useLocalStorage } from '@beomy/utils';
import { Theme } from '@/models/theme';
import { useThemeStore } from '@/stores/theme';

type useThemeType = () => [Theme | undefined, Dispatch<SetStateAction<Theme>>];

const useTheme: useThemeType = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [, setLocalStorageTheme] = useLocalStorage<Theme>('beomy.theme');

  const set: Dispatch<SetStateAction<Theme>> = useCallback(
    (valOrFunc) => {
      const newState =
        typeof valOrFunc === 'function'
          ? (valOrFunc as (prev: Theme | undefined) => Theme)(theme)
          : valOrFunc;
      setTheme(newState);
      setLocalStorageTheme(newState);
    },
    [setLocalStorageTheme, setTheme, theme],
  );

  return [theme, set];
};

export default useTheme;
