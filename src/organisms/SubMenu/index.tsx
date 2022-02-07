import React from 'react';
import { ITreeItem } from '@/model/Tree';
import { Li, Link } from '@/atoms';
import StyledSubMenu from './SubMenu.styled';

interface IProp {
  firstDepth: string;
  subMenu: ITreeItem[];
}

function SubMenu({ firstDepth, subMenu }: IProp) {
  return (
    <StyledSubMenu>
      <Li m="0 20px">
        <Link to={`/${firstDepth}/`} p="5px 10px" activeClassName="active">
          전체
        </Link>
      </Li>
      {subMenu.map((menu) => (
        <Li key={menu.key} m="0 20px">
          <Link
            to={`/${firstDepth}/${menu.key}/`}
            p="5px 10px"
            activeClassName="active"
          >
            {menu.key}
          </Link>
        </Li>
      ))}
    </StyledSubMenu>
  );
}

export default SubMenu;
