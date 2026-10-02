import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@beomy/design-system-tailwind';

export type DimProps = {
  active: boolean;
} & ComponentPropsWithoutRef<'div'>;

/**
 * 오버레이 딤. 상호작용을 갖지 않는 순수 표현 컴포넌트라 'use client' 가 필요 없다.
 * (닫기 클릭 등은 부모가 일반 div 처럼 onClick 을 넘긴다. 부모가 클라이언트 컴포넌트이면
 * 이 파일도 자동으로 클라이언트 번들에 포함되므로 함수 전달이 문제되지 않는다)
 *
 * 높이를 0 ↔ 100% 로 바꾸는 대신 visibility 로 켜고 끈다.
 * 높이를 쓰면 부모의 transition-all 에 걸려 위에서 내려오듯 보이고 매 프레임 reflow 가 난다.
 * opacity·visibility 는 레이아웃을 건드리지 않고, visibility 는 전환이 끝나는 시점에만
 * 바뀌어 페이드아웃이 끝난 뒤 클릭을 막지 않는다.
 */
const Dim = ({ active, className, ...props }: DimProps) => {
  return (
    <div
      className={cn(
        'absolute inset-0 bg-black',
        'transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.78,0.14,0.15,0.86)]',
        active ? 'visible opacity-70' : 'invisible opacity-0',
        className,
      )}
      {...props}
    />
  );
};

export default Dim;
