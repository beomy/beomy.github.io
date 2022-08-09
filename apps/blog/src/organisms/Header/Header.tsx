import { useState, useCallback } from 'react';
import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useScroll } from '@/hooks';
import { Button, Link, Li } from '@/atoms';
import { DecoInput } from '@/molecules';
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
          <FiMenu size={30} />
        </S.MenuBtn>
        <Link to="/">
          <StaticImage
            src="../../assets/images/beomy-logo.png"
            alt="블로그 로고"
            width={90}
          />
        </Link>
        <S.GNB>
          <Li m="0 20px">
            <Link to="/about/" partiallyActive p="5px 10px">
              About
            </Link>
          </Li>
          <Li m="0 20px">
            <Link to="/tech/" partiallyActive p="5px 10px">
              Tech
            </Link>
          </Li>
          <Li m="0 20px">
            <Link to="/games" partiallyActive p="5px 10px">
              Games
            </Link>
          </Li>
        </S.GNB>
        <Button ml="25px" onClick={handleClickSearchBtn}>
          {isSearch ? <FiX size={20} /> : <FiSearch size={20} />}
        </Button>
      </S.Nav>
      <S.Search active={isSearch}>
        <DecoInput
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
