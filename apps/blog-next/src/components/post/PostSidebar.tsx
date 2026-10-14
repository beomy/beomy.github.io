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
        // 모바일: fixed 가 되면 self-stretch 가 효력을 잃고 자식(absolute Dim, fixed 패널)도 높이에 기여하지 않아
        // h-full 을 주지 않으면 nav 높이가 0 이 되어 Dim 이 보이지 않는다
        'max-sm:fixed max-sm:right-0 max-sm:top-0 max-sm:z-[10] max-sm:h-full max-sm:w-0',
        'max-sm:[&>*]:transition-all max-sm:[&>*]:duration-300 max-sm:[&>*]:ease-[cubic-bezier(0.78,0.14,0.15,0.86)]',
        isActive && 'max-sm:w-full',
      )}
    >
      <Dim active={isActive} onClick={close} />
      <div
        className={cn(
          // 데스크톱: fixed 대신 sticky. 스크롤을 따라오다 본문 끝(nav 바닥)에서 멈춰 푸터와 겹치지 않는다.
          // 본문 아래에는 전체 폭 댓글 영역이 있어(PostView) 본문 끝에서 패널은 댓글·푸터에 밀려 본문과 함께 화면 위로
          // 빠져나간다. 그래서 최대 높이에서 푸터 몫을 미리 뺄 필요가 없고 화면 높이를 그대로 쓴다.
          // 높이는 내용에 맞추고 최대만 제한한다(h 가 아니라 max-h).
          // top 은 --sticky-top(globals.css): 헤더가 보이면 70px, 스크롤로 숨으면 10px. 헤더 슬라이드(200ms)에 맞춰 전환.
          // max-h 는 --sticky-top 이 아니라 헤더가 보일 때 값(70px)으로 고정한다. 변수를 쓰면 헤더가 숨을 때마다 패널 높이가
          // 60px 늘었다 줄어 목차가 출렁인다. 헤더가 숨은 동안 아래 60px 가 비는 건 감수한다.
          // 데스크톱은 하단 패딩을 주지 않는다. 패널 바닥이 곧 nav 바닥(=본문 네비게이터 바닥)이라 본문 끝에서 목차와 본문의
          // 하단이 나란히 맞는다. 스크롤 중 화면 아래와의 숨 쉴 공간(30px)은 패딩 대신 max-h 에서 뺀다.
          // flex 가 아니라 grid 인 이유: fieldset 은 flex 자식으로 줄어들어도(min-h-0) Chromium 에서 내부 익명 콘텐츠 박스가
          // 내용 높이를 유지해 overflow 가 동작하지 않고 목차가 흘러넘친다. grid 의 minmax(0,1fr) 행은 fieldset 에 확정된
          // 높이를 내려 주므로 목차 fieldset 안에서 스크롤된다. 목차가 짧으면 max-h 안에서 내용 높이만큼만 차지한다.
          // 닫기 버튼은 데스크톱에선 hidden, 모바일에선 absolute 라 grid 행을 차지하지 않는다.
          'sticky top-(--sticky-top) ml-[40px] box-border grid max-h-[calc(100vh-100px)] w-[340px] grid-rows-[auto_minmax(0,1fr)] gap-[10px] px-[10px] pt-[10px]',
          'transition-[top] duration-200 ease-in-out',
          '[&>button]:hidden',
          // 모바일: 화면 밖에서 슬라이드되는 오버레이 패널이라 fixed. 데스크톱용 max-h 상한을 풀어 화면 높이를 꽉 채우고,
          // 목차가 화면 바닥에 붙지 않게 하단 패딩을 둔다
          'max-sm:fixed max-sm:right-0 max-sm:top-0 max-sm:m-0 max-sm:h-full max-sm:max-h-none max-sm:pb-[30px] max-sm:max-w-[calc(100%-60px)] max-sm:bg-background',
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
