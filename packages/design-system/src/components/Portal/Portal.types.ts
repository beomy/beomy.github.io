import { ReactElement } from 'react';

export type PortalProps = {
  /** portal 이 적용되는 컨테이너 */
  children: ReactElement;
  /** 컨테이너가 append 되는 부모 요소 */
  container?: Element;
  /** portal 사용 여부 */
  disablePortal?: boolean;
};
