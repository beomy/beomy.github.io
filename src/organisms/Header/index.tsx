import { useState, useCallback } from 'react';
import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import cn from 'classnames';
import { useScroll } from '@/hooks/event';
import { Button, Link, Li } from '@/atoms';
import { DecoInput } from '@/molecules';
import { Menu } from '@/organisms';
import StyledHeader from './Header.styled';

function Header() {
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
    <StyledHeader className={cn({ hide: scrollY < 0 })}>
      <nav>
        <Button className="menu" onClick={handleClickMenuBtn}>
          <FiMenu size={30} />
        </Button>
        <Link to="/">
          <StaticImage
            src="../../assets/images/beomy-logo.png"
            alt="블로그 로고"
            width={90}
          />
        </Link>
        <ul>
          <Li m="0 20px">
            <Link
              to="/about/"
              activeClassName="active"
              partiallyActive
              p="5px 10px"
            >
              About
            </Link>
          </Li>
          <Li m="0 20px">
            <Link
              to="/tech/"
              activeClassName="active"
              partiallyActive
              p="5px 10px"
            >
              Tech
            </Link>
          </Li>
          <Li m="0 20px">
            <Link
              to="/games"
              activeClassName="active"
              partiallyActive
              p="5px 10px"
            >
              Games
            </Link>
          </Li>
        </ul>
        {isSearch ? (
          <Button ml="25px" onClick={handleClickSearchBtn}>
            <FiX size={20} />
          </Button>
        ) : (
          <Button ml="25px" onClick={handleClickSearchBtn}>
            <FiSearch size={20} />
          </Button>
        )}
      </nav>
      <div className={isSearch ? 'active' : ''}>
        <div className="bar">
          <DecoInput
            type="text"
            placeholder="검색어를 입력해 주세요."
            value=""
            fontSize="20px"
            onSearch={handleSearch}
          />
        </div>
      </div>
      <Menu
        className={isMenu ? 'active' : ''}
        onClose={() => setIsMenu(false)}
      />
    </StyledHeader>
  );
}

export default Header;
