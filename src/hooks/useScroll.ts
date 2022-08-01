import { useState, useLayoutEffect } from 'react';
import { throttle } from 'lodash-es';

type UseScrollHook = (delta: number) => number;

const useScroll: UseScrollHook = (delta = 0) => {
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
};

export default useScroll;
