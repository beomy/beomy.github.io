import {
  FormEventHandler,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import { throttle } from 'lodash-es';

export function useInput(
  initValue = '',
): [
  string,
  FormEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  () => void,
  (text: string) => void,
] {
  const [value, setValue] = useState<string>(initValue);
  const onChange = useCallback((e) => setValue(e.target.value), []);
  const onReset = useCallback(() => setValue(initValue), [initValue]);

  return [value, onChange, onReset, setValue];
}

export function useScroll(delta = 0) {
  const [move, setMove] = useState(0);
  useLayoutEffect(() => {
    let scrollY = window.scrollY ?? window.pageYOffset;
    const onScroll = throttle(() => {
      const curScrollY = window.scrollY ?? window.pageYOffset;
      const diff = scrollY - curScrollY;
      if (Math.abs(diff) > delta) {
        setMove(diff);
        scrollY = curScrollY;
      }
    }, 50);
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [delta]);
  return move;
}
