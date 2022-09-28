import type { IconBaseProps } from '../../icons';
import * as ReactIcons from '../../icons';

export type IconProps = {
  /** React Icons의 Bs 아이콘 */
  type: keyof typeof ReactIcons;
} & IconBaseProps;
