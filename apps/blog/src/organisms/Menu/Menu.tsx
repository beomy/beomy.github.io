import { StaticImage } from 'gatsby-plugin-image';
import { Anchor, Icon } from '@beomy/design-system';
import { useMenu } from '@/hooks';
import { Button, Li, Ul } from '@/atoms';
import type { MenuProps } from './Menu.types';
import * as S from './Menu.styles';

const Menu = ({ active, onClose }: MenuProps) => {
  const menuTree = useMenu();

  return (
    <S.Wrapper active={active}>
      <S.Dim active={active} onClick={onClose} />
      <S.Container active={active}>
        <S.Header>
          <Anchor to="/">
            <StaticImage
              src="../../assets/images/beomy-logo.png"
              alt="블로그 로고"
              width={60}
            />
          </Anchor>
          <Button onClick={onClose} width="45px">
            <Icon type="FiX" size={20} />
          </Button>
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
