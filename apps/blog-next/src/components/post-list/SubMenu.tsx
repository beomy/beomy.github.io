import { Anchor } from '@beomy/design-system-tailwind';
import type { TreeItem } from '@/models/tree';

export type SubMenuProps = {
  menu: TreeItem;
};

function SubMenu({ menu }: SubMenuProps) {
  // my-[1em]: 기존 Gatsby 블로그에서 <ul> 브라우저 기본 마진이 주던 간격 (preflight 가 0 으로 리셋하므로 복원)
  return (
    <ul className="my-[1em] flex items-center justify-center p-0 max-sm:hidden [&_a]:px-[10px] [&_a]:py-[5px] [&_a]:capitalize [&_small]:text-0">
      <li className="mx-[20px]">
        <Anchor to={`/${menu.key}/`}>
          전체 <small>({menu.counter})</small>
        </Anchor>
      </li>
      {menu.children.map((child) => (
        <li key={child.key} className="mx-[20px]">
          <Anchor to={`/${menu.key}/${child.key}/`}>
            {child.key} <small>({child.counter})</small>
          </Anchor>
        </li>
      ))}
    </ul>
  );
}

export default SubMenu;
