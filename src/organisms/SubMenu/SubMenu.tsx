import { Li, Link } from '@/atoms';
import type { SubMenuProps } from './SubMenu.types';
import * as S from './SubMenu.styles';

function SubMenu({ menu }: SubMenuProps) {
  return (
    <S.Wrapper>
      <Li m="0 20px">
        <Link to={`/${menu.key}/`} p="5px 10px">
          전체 <small>({menu.counter})</small>
        </Link>
      </Li>
      {menu.children.map((child) => (
        <Li key={child.key} m="0 20px">
          <Link to={`/${menu.key}/${child.key}/`} p="5px 10px">
            {child.key} <small>({child.counter})</small>
          </Link>
        </Li>
      ))}
    </S.Wrapper>
  );
}

export default SubMenu;
