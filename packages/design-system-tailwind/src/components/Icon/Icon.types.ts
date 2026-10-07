import * as ReactIcons from '../../icons';

export type IconProps = {
  /** React Icons(Bs) 또는 Bm 커스텀 아이콘 이름 */
  type: keyof typeof ReactIcons;
} & ReactIcons.IconBaseProps;
