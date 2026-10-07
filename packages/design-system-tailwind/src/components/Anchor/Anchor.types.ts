import type {
  AnchorHTMLAttributes,
  HTMLAttributeAnchorTarget,
  ReactNode,
} from 'react';

export type AnchorProps = {
  children: ReactNode;
  /** border 를 가지는 Anchor */
  border?: boolean;
  /** 내부 이동 URL (next/link 로 렌더링) */
  to?: string;
  /** (호환용) 하위 URL Active 여부. Next 환경에서는 사용되지 않습니다. */
  partiallyActive?: boolean;
  /** a 태그 옵션: 이동할 URL */
  href?: string;
  /** a 태그 옵션: 새창 옵션 */
  target?: HTMLAttributeAnchorTarget;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;
