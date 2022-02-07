import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { MdClose } from 'react-icons/md';
import { useMenu } from '@/hooks/post';
import { Button, Link, Li, A, Ul } from '@/atoms';
import StyledMenu from './Menu.styeld';

interface IProp {
  className: any;
  onClose: () => void;
}

function Menu({ className, onClose }: IProp) {
  const menuTree = useMenu();

  return (
    <StyledMenu className={className}>
      <div className="dim" role="none" onClick={onClose} />
      <div className="contents">
        <div className="header">
          <Link to="/" pl="20px">
            <StaticImage
              src="../../assets/images/beomy-logo.png"
              alt="블로그 로고"
              width={60}
            />
          </Link>
          <Button onClick={onClose} width="45px">
            <MdClose size={20} />
          </Button>
        </div>
        <Ul>
          <Li mb="30px">
            <Link to="/about">About</Link>
          </Li>
          {menuTree.map((menu) => (
            <Li key={menu.key} mb="30px">
              <Link to={`/${menu.key}/`}>{menu.key}</Link>
              {menu.children.length > 0 && (
                <Ul mt="10px">
                  {menu.children.map((sub) => (
                    <Li key={sub.key} mb="10px">
                      <Link to={`/${menu.key}/${sub.key}/`}>{sub.key}</Link>
                    </Li>
                  ))}
                </Ul>
              )}
            </Li>
          ))}
          <Li>
            <A href="/games" target="_blank">
              Games
            </A>
          </Li>
        </Ul>
      </div>
    </StyledMenu>
  );
}

export default Menu;
