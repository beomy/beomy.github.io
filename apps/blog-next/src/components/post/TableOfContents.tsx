'use client';

import type { MouseEvent } from 'react';
import { useEffect, useRef, useCallback } from 'react';
import { throttle } from 'lodash-es';
import { FieldSet } from '@beomy/design-system-tailwind';
import './TableOfContents.css';

export type TableOfContentsProps = {
  toc?: string;
  onClick?: () => void;
};

const TableOfContents = ({ toc, onClick }: TableOfContentsProps) => {
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

  // min-h-0: flex 자식의 기본 min-height:auto 를 풀어, 패널(max-h)이 꽉 찼을 때 이 영역만 줄어들며 스크롤되게 한다
  return (
    <FieldSet title="목차" className="min-h-0 overflow-auto">
      <nav
        ref={tocRef}
        className="toc"
        dangerouslySetInnerHTML={{ __html: toc ?? '' }}
        onClick={handleClickToc}
      ></nav>
    </FieldSet>
  );
};

export default TableOfContents;
