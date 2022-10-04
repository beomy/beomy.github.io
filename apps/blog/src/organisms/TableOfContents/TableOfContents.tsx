import type { MouseEvent } from 'react';
import { useEffect, useRef, useCallback } from 'react';
import { throttle } from 'lodash-es';
import type { TableOfContentsProps } from './TableOfContents.types';
import * as S from './TableOfContents.styles';

const TableOfContents = ({ toc, onClick, ...props }: TableOfContentsProps) => {
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tocRef.current) return;
    const anchorList = tocRef.current.querySelectorAll('a');
    const anchorHrefList = Array.from(anchorList).map(
      (anchor) => (anchor.attributes as any).href.value,
    );
    const handleScroll = throttle(() => {
      const scrollY = (window.scrollY ?? window.pageYOffset) + 1;
      const postOffsets = anchorHrefList.map(
        (href) =>
          document.getElementById(decodeURIComponent(href.substring(1)))
            ?.offsetTop,
      );
      for (let i = 0; i < postOffsets.length; i += 1) {
        anchorList.forEach((anchor) =>
          anchor.parentElement?.classList.remove('active'),
        );
        const min = postOffsets[i];
        const max = postOffsets[i + 1] ?? Infinity;
        if (min && scrollY >= min && scrollY < max) {
          anchorList[i].parentElement?.classList.add('active');
          return;
        }
      }
    }, 50);
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickToc = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if ((e.target as any).nodeName === 'A') {
        onClick?.();
      }
    },
    [onClick],
  );

  return (
    <S.Wrapper title="목차" {...props}>
      <S.Toc
        ref={tocRef}
        dangerouslySetInnerHTML={{ __html: toc ?? '' }}
        onClick={handleClickToc as any}
      ></S.Toc>
    </S.Wrapper>
  );
};

export default TableOfContents;
