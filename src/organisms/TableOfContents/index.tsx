import React, { useEffect, useRef } from 'react';
import { throttle } from 'lodash-es';
import { LayoutProps, FlexboxProps, SpaceProps } from 'styled-system';
import StyledTableOfContents from './TableOfContents.styled';

interface IProp extends LayoutProps, FlexboxProps, SpaceProps {
  toc: string;
}

function TableOfContents({ toc, ...props }: IProp) {
  const tocRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const anchorList = tocRef.current.querySelectorAll('a');
    const anchorHrefList = Array.from(anchorList).map(
      (anchor) => (anchor.attributes as any).href.value,
    );
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY + 1;
      const postOffsets = anchorHrefList.map(
        (href) =>
          document.getElementById(decodeURIComponent(href.substring(1)))
            .offsetTop,
      );
      for (let i = 0; i < postOffsets.length; i += 1) {
        anchorList.forEach((anchor) =>
          anchor.parentElement.classList.remove('active'),
        );
        const min = postOffsets[i];
        const max = postOffsets[i + 1] ?? Infinity;
        if (scrollY >= min && scrollY < max) {
          anchorList[i].parentElement.classList.add('active');
          return;
        }
      }
    }, 20);
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <StyledTableOfContents {...props}>
      <div ref={tocRef} dangerouslySetInnerHTML={{ __html: toc }} />
    </StyledTableOfContents>
  );
}

export default TableOfContents;