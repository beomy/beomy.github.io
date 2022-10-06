import { useState, useCallback } from 'react';
import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { TextField, Anchor, Icon, IconButton } from '@beomy/design-system';
import { useScroll } from '@beomy/utils';
import { useBeomyTheme } from '@/hooks';
import { Li } from '@/atoms';
import { Menu } from '@/organisms';
import * as S from './Header.styles';

const Header = () => {
  const [theme, setTheme] = useBeomyTheme();
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
  const handleClickTheme = useCallback(() => {
    setTheme((value) => {
      if (value) {
        return value === 'light' ? 'dark' : 'light';
      } else {
        return 'light';
      }
    });
  }, [setTheme]);

  return (
    <S.Wrapper hide={scrollY < 0}>
      <S.Nav>
        <Anchor to="/">
          {theme === 'dark' ? (
            <StaticImage
              src="../../assets/images/beomy-logo-negative.png"
              alt="블로그 로고"
              width={90}
            />
          ) : (
            <StaticImage
              src="../../assets/images/beomy-logo.png"
              alt="블로그 로고"
              width={90}
            />
          )}
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
            <Anchor href="/games" target="_blank">
              Games
            </Anchor>
          </Li>
        </S.GNB>
        <S.Action>
          <IconButton
            icon={theme === 'dark' ? 'BsMoonFill' : 'BsSunFill'}
            size={20}
            aria-label="theme"
            onClick={handleClickTheme}
          />
          <IconButton
            icon={isSearch ? 'BsXCircle' : 'BsSearch'}
            size={20}
            aria-label="search"
            onClick={handleClickSearchBtn}
          />
          <S.MenuBtn onClick={handleClickMenuBtn} aria-label="menu">
            <Icon type="BsList" size={30} />
          </S.MenuBtn>
        </S.Action>
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
