import { Anchor } from '@beomy/design-system';
import { Li } from '@/atoms';
import type { SubMenuProps } from './SubMenu.types';
import * as S from './SubMenu.styles';

function SubMenu({ menu }: SubMenuProps) {
  return (
    <S.Wrapper>
      <Li m="0 20px">
        <Anchor to={`/${menu.key}/`}>
          전체 <small>({menu.counter})</small>
        </Anchor>
      </Li>
      {menu.children.map((child) => (
        <Li key={child.key} m="0 20px">
          <Anchor to={`/${menu.key}/${child.key}/`}>
            {child.key} <small>({child.counter})</small>
          </Anchor>
        </Li>
      ))}
    </S.Wrapper>
  );
}

export default SubMenu;
