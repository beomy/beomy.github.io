import { StaticImage } from 'gatsby-plugin-image';
import { Anchor, IconButton } from '@beomy/design-system';
import { useMenu, useTheme } from '@/hooks';
import { Li, Ul, Dim } from '@/atoms';
import type { MenuProps } from './Menu.types';
import * as S from './Menu.styles';

const Menu = ({ active, onClose, ...props }: MenuProps) => {
  const [theme] = useTheme();
  const menuTree = useMenu();

  return (
    <S.Wrapper active={active} {...props}>
      <Dim active={active} onClick={onClose} />
      <S.Container active={active}>
        <S.Header>
          <Anchor to="/">
            {theme === 'dark' ? (
              <StaticImage
                src="../../assets/images/beomy-logo-negative.png"
                alt="블로그 로고"
                width={60}
              />
            ) : (
              <StaticImage
                src="../../assets/images/beomy-logo.png"
                alt="블로그 로고"
                width={60}
              />
            )}
          </Anchor>
          <IconButton
            icon="BsXCircle"
            size={20}
            mr="5px"
            aria-label="close"
            onClick={onClose}
          />
        </S.Header>
        <Ul>
          <Li mb="30px">
            <Anchor to="/about">About</Anchor>
          </Li>
          {menuTree.map((menu) => (
            <Li key={menu.key} mb="30px">
              <Anchor to={`/${menu.key}/`}>
                {menu.key} <small>({menu.counter})</small>
              </Anchor>
              {menu.children.length > 0 && (
                <Ul mt="10px">
                  {menu.children.map((sub) => (
                    <Li key={sub.key} mb="10px">
                      <Anchor to={`/${menu.key}/${sub.key}/`}>
                        {sub.key} <small>({sub.counter})</small>
                      </Anchor>
                    </Li>
                  ))}
                </Ul>
              )}
            </Li>
          ))}
          <Li>
            <Anchor href="/games" target="_blank">
              Games
            </Anchor>
          </Li>
        </Ul>
      </S.Container>
    </S.Wrapper>
  );
};

export default Menu;
