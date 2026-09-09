import { Anchor } from '@beomy/design-system-tailwind';
import { Li } from '@/atoms';
import type { SubMenuProps } from './SubMenu.types';

function SubMenu({ menu }: SubMenuProps) {
  return (
    <ul className="flex items-center justify-center p-0 max-sm:hidden [&_a]:px-[10px] [&_a]:py-[5px] [&_a]:capitalize [&_small]:text-0">
      <Li className="mx-[20px]">
        <Anchor to={`/${menu.key}/`}>
          전체 <small>({menu.counter})</small>
        </Anchor>
      </Li>
      {menu.children.map((child) => (
        <Li key={child.key} className="mx-[20px]">
          <Anchor to={`/${menu.key}/${child.key}/`}>
            {child.key} <small>({child.counter})</small>
          </Anchor>
        </Li>
      ))}
    </ul>
  );
}

export default SubMenu;
