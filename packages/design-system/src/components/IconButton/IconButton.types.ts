import type { LayoutProps, SpaceProps } from 'styled-system';
import type { IconProps } from '../Icon/Icon.types';
import type { MouseEventHandler, FocusEventHandler } from 'react';

export type IconButtonProps = {
  /** React Icons의 Bs 아이콘 */
  icon: IconProps['type'];
  /** border을 가지는 버튼 */
  border?: boolean;
  /** 아이콘 크기 */
  size?: string | number;
  /** 버튼 클릭 이벤트 핸들러 */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** 버튼 마우스 진입 이벤트 핸들러 */
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  /** 버튼 마우스 이탈 이벤트 핸들러 */
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
  /** 버튼 포커스 이벤트 핸들러 */
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  /** 버튼 블러 이벤트 핸들러 */
  onBlur?: FocusEventHandler<HTMLButtonElement>;
} & LayoutProps &
  SpaceProps;
