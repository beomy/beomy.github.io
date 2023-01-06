import type { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useLocalStorage } from '@beomy/utils';
import { Theme } from '@/models/theme';
import { themeState } from '@/stores/theme';

type useThemeType = () => [Theme | undefined, Dispatch<SetStateAction<Theme>>];

const useTheme: useThemeType = () => {
  const [recoilTheme, setRecoilTheme] = useRecoilState<Theme | undefined>(
    themeState,
  );
  const [, setLocalStorageTheme] = useLocalStorage<Theme>('beomy.theme');

  const set: Dispatch<SetStateAction<Theme>> = useCallback(
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

  return [recoilTheme, set];
};

export default useTheme;
