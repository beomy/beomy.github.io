import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * 프로젝트 커스텀 유틸리티를 tailwind-merge 에 알려준다.
 * `screen-*`(theme.css 의 @utility, width 를 설정)는 기본 Tailwind 유틸리티가 아니라서
 * 알려주지 않으면 `w-full` 과 충돌해도 둘 다 남고, 결국 CSS 순서에 따라 `w-full` 이 이긴다.
 * (TextField 기본 클래스 w-full 이 Header 가 넘긴 screen-m 을 덮어 검색 필드가 전체 폭으로 퍼지던 문제)
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      w: ['screen-xs', 'screen-sm', 'screen-m', 'screen-lg'],
    },
  },
});

/**
 * Tailwind 클래스 병합 유틸리티.
 * clsx 로 조건부 클래스를 합치고 twMerge 로 충돌하는 유틸리티를 정리합니다.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
