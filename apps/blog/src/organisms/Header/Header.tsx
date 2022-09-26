import { useState, useCallback } from 'react';
import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { TextField, Anchor, Icon } from '@beomy/design-system';
import { useScroll } from '@/hooks';
import { Button, Li } from '@/atoms';
import { Menu } from '@/organisms';
import * as S from './Header.styles';

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const scrollY = useScroll(20);

  const handleClickSearchBtn = useCallback(
    () => setIsSearch(!isSearch),
    [isSearch],
  );
  const handleSearch = useCallback((str: string) => {
    setIsSearch(false);
    navigate(`/search?keyword=${str}`);
  }, []);

  const handleClickMenuBtn = useCallback(() => setIsMenu(!isMenu), [isMenu]);

  return (
    <S.Wrapper hide={scrollY < 0}>
      <S.Nav>
        <S.MenuBtn onClick={handleClickMenuBtn}>
          <Icon type="FiMenu" size={30} />
        </S.MenuBtn>
        <Anchor to="/">
          <StaticImage
            src="../../assets/images/beomy-logo.png"
            alt="블로그 로고"
            width={90}
          />
        </Anchor>
        <S.GNB>
          <Li m="0 20px">
            <Anchor to="/about/" partiallyActive>
              About
            </Anchor>
          </Li>
          <Li m="0 20px">
            <Anchor to="/tech/" partiallyActive>
              Tech
            </Anchor>
          </Li>
          <Li m="0 20px">
            <Anchor to="/games" partiallyActive>
              Games
            </Anchor>
          </Li>
        </S.GNB>
        <Button ml="25px" onClick={handleClickSearchBtn}>
          <Icon type={isSearch ? 'FiX' : 'FiSearch'} size={20} />
        </Button>
      </S.Nav>
      <S.Search active={isSearch}>
        <TextField
          type="text"
          placeholder="검색어를 입력해 주세요."
          value=""
          fontSize="20px"
          onSearch={handleSearch}
        />
      </S.Search>
      <Menu active={isMenu} onClose={() => setIsMenu(false)} />
    </S.Wrapper>
  );
};

export default Header;
