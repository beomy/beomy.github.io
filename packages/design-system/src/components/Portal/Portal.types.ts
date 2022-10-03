import { ReactElement } from 'react';

export type PortalProps = {
  /**
   * portal 이 적용되는 컨테이너
   */
  children: ReactElement;
  /**
   * 컨테이너가 append 되는 부모 요소
   * @default document.querySelector('#root') || document.body
   */
  container?: Element;
  /**
   * portal 사용 여부
   * @default false
   */
  disablePortal?: boolean;
};
