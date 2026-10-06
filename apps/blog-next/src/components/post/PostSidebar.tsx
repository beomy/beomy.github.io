'use client';

import { useCallback, useState } from 'react';
import { IconButton, cn } from '@beomy/design-system-tailwind';
import { Dim } from '@/components/common';
import PostShare from './PostShare';
import TableOfContents from './TableOfContents';

export type PostSidebarProps = {
  url: string;
  toc?: string;
};

/**
 * 포스트 우측 사이드바(공유 + 목차). 모바일에서는 슬라이드 패널로 열고 닫는다.
 * PostView 에서 유일하게 상태를 가지는 부분이라 여기만 클라이언트 경계로 둔다.
 */
const PostSidebar = ({ url, toc }: PostSidebarProps) => {
  const [isActive, setActive] = useState<boolean>(false);

  const close = useCallback(() => setActive(false), []);
  const toggle = useCallback(() => setActive((value) => !value), []);

  return (
    <nav
      className={cn(
        // 데스크톱: 본문(article)과 같은 높이로 늘어나 sticky 패널의 이동 범위가 된다
        'w-[380px] self-stretch',
        'max-sm:fixed max-sm:right-0 max-sm:top-0 max-sm:z-[10] max-sm:w-0',
        'max-sm:[&>*]:transition-all max-sm:[&>*]:duration-300 max-sm:[&>*]:ease-[cubic-bezier(0.78,0.14,0.15,0.86)]',
        isActive && 'max-sm:w-full',
      )}
    >
      <Dim active={isActive} onClick={close} />
      <div
        className={cn(
          // 데스크톱: fixed 대신 sticky. 스크롤을 따라오다 본문 끝(nav 바닥)에서 멈춰 푸터와 겹치지 않는다.
          // 높이는 내용에 맞추고 최대만 제한한다(h 가 아니라 max-h). 본문 끝에서 패널은 푸터(115px)+본문 하단
          // 패딩(10px)만큼 위로 밀리므로, 최대 높이에서 그 125px 를 미리 빼 두어야 긴 목차에서도 상단(공유하기)이 잘리지 않는다.
          // top 은 --sticky-top(globals.css): 헤더가 보이면 70px, 스크롤로 숨으면 10px. 헤더 슬라이드(200ms)에 맞춰 전환.
          // 하단 패딩을 더 주는 이유: 목차가 길면 패널 바닥까지 꽉 차므로 숨 쉴 공간을 패널 쪽에서 확보한다
          'sticky top-(--sticky-top) ml-[40px] box-border flex max-h-[calc(100vh-var(--sticky-top)-125px)] w-[340px] flex-col px-[10px] pt-[10px] pb-[30px]',
          'transition-[top,height] duration-200 ease-in-out',
          '[&_fieldset+fieldset]:mt-[10px] [&>button]:hidden',
          // 모바일: 화면 밖에서 슬라이드되는 오버레이 패널이라 fixed 유지
          'max-sm:fixed max-sm:right-0 max-sm:top-0 max-sm:m-0 max-sm:h-full max-sm:max-w-[calc(100%-60px)] max-sm:bg-background',
          'max-sm:[&>button]:absolute max-sm:[&>button]:bottom-[20px] max-sm:[&>button]:left-[-50px] max-sm:[&>button]:inline-flex max-sm:[&>button]:bg-background max-sm:[&>button]:transition-transform max-sm:[&>button]:duration-300',
          isActive
            ? 'max-sm:translate-x-0 max-sm:[&>button]:rotate-0'
            : 'max-sm:translate-x-full max-sm:[&>button]:rotate-45',
        )}
      >
        <PostShare url={url} />
        <TableOfContents toc={toc} onClick={close} />
        <IconButton icon="BsXLg" aria-label="toc" border onClick={toggle} />
      </div>
    </nav>
  );
};

export default PostSidebar;
