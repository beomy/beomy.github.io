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
  const onChange = useCallback((e) => setValue(e.target.value), [value]);
  const onReset = useCallback(() => setValue(initValue), []);

  return [value, onChange, onReset, setValue];
}

export function useScroll(delta = 0) {
  const [move, setMove] = useState(0);
  useLayoutEffect(() => {
    let { scrollY } = window;
    const onScroll = throttle(() => {
      const diff = scrollY - window.scrollY;
      if (Math.abs(diff) > delta) {
        setMove(diff);
        scrollY = window.scrollY;
      }
    }, 50);
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);
  return move;
}
