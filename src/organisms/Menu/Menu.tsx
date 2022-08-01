import { StaticImage } from 'gatsby-plugin-image';
import { FiX } from 'react-icons/fi';
import { useMenu } from '@/hooks';
import { Button, Link, Li, A, Ul } from '@/atoms';
import type { MenuProps } from './Menu.types';
import * as S from './Menu.styles';

const Menu = ({ active, onClose }: MenuProps) => {
  const menuTree = useMenu();

  return (
    <S.Wrapper active={active}>
      <S.Dim active={active} onClick={onClose} />
      <S.Container active={active}>
        <S.Header>
          <Link to="/" pl="20px">
            <StaticImage
              src="../../assets/images/beomy-logo.png"
              alt="블로그 로고"
              width={60}
            />
          </Link>
          <Button onClick={onClose} width="45px">
            <FiX size={20} />
          </Button>
        </S.Header>
        <Ul>
          <Li mb="30px">
            <Link to="/about">About</Link>
          </Li>
          {menuTree.map((menu) => (
            <Li key={menu.key} mb="30px">
              <Link to={`/${menu.key}/`}>
                {menu.key} <small>({menu.counter})</small>
              </Link>
              {menu.children.length > 0 && (
                <Ul mt="10px">
                  {menu.children.map((sub) => (
                    <Li key={sub.key} mb="10px">
                      <Link to={`/${menu.key}/${sub.key}/`}>
                        {sub.key} <small>({sub.counter})</small>
                      </Link>
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
      </S.Container>
    </S.Wrapper>
  );
};

export default Menu;
