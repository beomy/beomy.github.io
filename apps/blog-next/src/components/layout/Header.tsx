'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField,
  Anchor,
  Icon,
  IconButton,
  cn,
} from '@beomy/design-system-tailwind';
import { useScroll } from '@beomy/utils';
import { useTheme } from '@/hooks';
import { useNav } from '@/contexts/nav-context';
import Menu from './Menu';

const Header = () => {
  const router = useRouter();
  const { categoryList } = useNav();
  const [theme, setTheme] = useTheme();
  const [isSearch, setIsSearch] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const scrollY = useScroll(20);

  // 헤더 숨김 여부를 <html> 에 표시한다. 포스트 사이드바(sticky)가 --sticky-top 으로 참조해
  // 헤더가 보이면 그 아래(70px), 숨으면 화면 위(10px)에 붙는다 (globals.css).
  useEffect(() => {
    if (scrollY < 0) document.documentElement.dataset.headerHidden = '';
    else delete document.documentElement.dataset.headerHidden;
  }, [scrollY]);

  const handleClickSearchBtn = useCallback(
    () => setIsSearch(!isSearch),
    [isSearch],
  );
  const handleSearch = useCallback(
    (str: string) => {
      setIsSearch(false);
      router.push(`/search?keyword=${str}`);
    },
    [router],
  );
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
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[9] flex flex-col shadow-[rgb(0_0_0_/_8%)_0_0_15px] transition-[top] duration-200 ease-in-out',
        '[&_button]:text-body [&_button:hover]:text-title',
        scrollY < 0 && 'top-[-140px]',
      )}
    >
      <nav className="flex items-center justify-between border-b border-grey-90 bg-[color-mix(in_srgb,var(--background)_80%,transparent)] px-[75px] py-[10px] max-sm:px-[20px]">
        <Anchor to="/">
          {theme === 'dark' ? (
            <img
              src="/assets/img/brand/beomy-logo-negative.png"
              alt="블로그 로고"
              width={90}
            />
          ) : (
            <img
              src="/assets/img/brand/beomy-logo.png"
              alt="블로그 로고"
              width={90}
            />
          )}
        </Anchor>
        <ul className="m-0 ml-auto flex p-0 max-sm:hidden [&_a]:px-[10px] [&_a]:py-[5px] [&_a]:capitalize">
          <li className="mx-[10px]">
            <Anchor to="/about/" partiallyActive>
              about
            </Anchor>
          </li>
          {categoryList.map((category) => (
            <li className="mx-[10px]" key={category}>
              <Anchor to={`/${category}`} partiallyActive>
                {category}
              </Anchor>
            </li>
          ))}
          <li className="mx-[10px]">
            <Anchor href="/games" target="_blank">
              games
            </Anchor>
          </li>
        </ul>
        <div className="ml-[10px] flex [&_button+button]:ml-[10px]">
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
          <button
            className="hidden max-sm:block"
            onClick={handleClickMenuBtn}
            aria-label="menu"
          >
            <Icon type="BsList" size={30} />
          </button>
        </div>
      </nav>
      <div
        className={cn(
          'flex h-0 items-center overflow-hidden bg-[color-mix(in_srgb,var(--grey-98)_80%,transparent)] transition-[height] duration-[350ms] ease-in-out',
          isSearch ? 'visible h-[80px]' : 'invisible',
        )}
      >
        <TextField
          type="text"
          placeholder="검색어를 입력해 주세요."
          value=""
          className="mx-auto h-full text-[20px] screen-m max-m:screen-sm max-sm:screen-xs"
          onSearch={handleSearch}
        />
      </div>
      <Menu
        className="hidden max-sm:block"
        active={isMenu}
        onClose={() => setIsMenu(false)}
      />
    </header>
  );
};

export default Header;
