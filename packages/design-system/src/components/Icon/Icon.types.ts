import type { IconBaseProps } from '../../icons';
import * as ReactIcons from '../../icons';

export type IconProps = {
  /** React Icons의 Fi 아이콘 */
  type: keyof typeof ReactIcons;
} & IconBaseProps;
