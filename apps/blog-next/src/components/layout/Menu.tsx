'use client';

import { Anchor, IconButton, cn } from '@beomy/design-system-tailwind';
import { useMenu, useTheme } from '@/hooks';
import Dim from '@/components/common/Dim';

export type MenuProps = {
  active: boolean;
  onClose?: () => void;
  className?: string;
};

const Menu = ({ active, onClose, className }: MenuProps) => {
  const { theme } = useTheme();
  const menuTree = useMenu();

  return (
    <menu
      className={cn(
        'fixed right-0 top-0 z-[9] m-0 h-full p-0',
        '[&>*]:transition-all [&>*]:duration-300 [&>*]:ease-[cubic-bezier(0.78,0.14,0.15,0.86)]',
        '[&_ul]:pl-[30px] [&_a]:capitalize',
        active && 'w-full',
        className,
      )}
    >
      <Dim active={active} onClick={onClose} />
      <div
        className={cn(
          'absolute right-0 h-full w-[285px] translate-x-full bg-grey-100',
          active && 'translate-x-0 shadow-[2px_0_8px_rgb(0_0_0_/_15%)]',
        )}
      >
        <div className="flex h-[45px] items-center justify-between border-b border-grey-90 pl-[20px]">
          <Anchor to="/">
            {theme === 'dark' ? (
              <img
                src="/assets/img/brand/beomy-logo-negative.png"
                alt="블로그 로고"
                width={60}
                height={20}
              />
            ) : (
              <img
                src="/assets/img/brand/beomy-logo.png"
                alt="블로그 로고"
                width={60}
                height={20}
              />
            )}
          </Anchor>
          <IconButton
            icon="BsXCircle"
            size={20}
            className="mr-[5px]"
            aria-label="close"
            onClick={onClose}
          />
        </div>
        {/* my-[1em]: 기존 Gatsby 블로그에서 <ul> 브라우저 기본 마진이 주던 간격 (preflight 가 0 으로 리셋하므로 복원) */}
        <ul className="my-[1em]">
          <li className="mb-[30px]">
            <Anchor to="/about">About</Anchor>
          </li>
          {menuTree.map((menu) => (
            <li key={menu.key} className="mb-[30px]">
              <Anchor to={`/${menu.key}/`}>
                {menu.key} <small>({menu.counter})</small>
              </Anchor>
              {menu.children.length > 0 && (
                <ul className="mt-[10px]">
                  {menu.children.map((sub) => (
                    <li key={sub.key} className="mb-[10px]">
                      <Anchor to={`/${menu.key}/${sub.key}/`}>
                        {sub.key} <small>({sub.counter})</small>
                      </Anchor>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li>
            <Anchor href="/games" target="_blank">
              Games
            </Anchor>
          </li>
        </ul>
      </div>
    </menu>
  );
};

export default Menu;
