import { ITreeItem } from '@/model/tree';
import { Li, Link } from '@/atoms';
import StyledSubMenu from './SubMenu.styled';

interface IProp {
  menu: ITreeItem;
}

function SubMenu({ menu }: IProp) {
  return (
    <StyledSubMenu>
      <Li m="0 20px">
        <Link to={`/${menu.key}/`} p="5px 10px" activeClassName="active">
          전체 <small>({menu.counter})</small>
        </Link>
      </Li>
      {menu.children.map((child) => (
        <Li key={child.key} m="0 20px">
          <Link
            to={`/${menu.key}/${child.key}/`}
            p="5px 10px"
            activeClassName="active"
          >
            {child.key} <small>({child.counter})</small>
          </Link>
        </Li>
      ))}
    </StyledSubMenu>
  );
}

export default SubMenu;
