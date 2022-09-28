import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useLocalStorage, useMount } from '@beomy/utils';
import { Theme } from '@/model/theme';
import { themeState } from '@/stores/themeStore';

type UseBeomyThemeHook = () => [
  Theme | undefined,
  Dispatch<SetStateAction<Theme | undefined>>,
];

const useBeomyTheme: UseBeomyThemeHook = () => {
  const [recoilTheme, setRecoilTheme] = useRecoilState<Theme | undefined>(
    themeState,
  );
  const [localStorageTheme, setLocalStorageTheme] =
    useLocalStorage<Theme>('beomy.theme');
  const systemTheme: Theme | undefined = global?.matchMedia
    ? global.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : undefined;

  useMount(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const isSystemDarkMode = matchMedia.matches;
    if (localStorageTheme) {
      setRecoilTheme(localStorageTheme);
    } else {
      setRecoilTheme(isSystemDarkMode ? 'dark' : 'light');
    }
  });

  const set: Dispatch<SetStateAction<Theme | undefined>> = useCallback(
    (valOrFunc) => {
      const newState =
        typeof valOrFunc === 'function'
          ? (valOrFunc as Function)(recoilTheme)
          : valOrFunc;
      setRecoilTheme(newState);
      setLocalStorageTheme(newState);
    },
    [setLocalStorageTheme, setRecoilTheme, recoilTheme],
  );

  return [recoilTheme ?? localStorageTheme ?? systemTheme, set];
};

export default useBeomyTheme;
