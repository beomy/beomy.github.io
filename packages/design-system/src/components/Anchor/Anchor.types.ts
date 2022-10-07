import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';

export type AnchorProps = {
  children: ReactNode;
  /** border을 가지는 Anchor */
  border?: boolean;
  /** Gatsby Link 옵션: 이동할 URL */
  to?: string;
  /** Gatsby Link 옵션: 하위 URL에 Active 적용 */
  partiallyActive?: boolean;
  /** A 태그 옵션: 이동할 URL */
  href?: string;
  /** A 태그 옵션: 새창 옵션 */
  target?: HTMLAttributeAnchorTarget;
};
