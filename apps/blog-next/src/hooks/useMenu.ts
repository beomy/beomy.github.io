'use client';

import { useNav } from '@/lib/nav-context';
import type { TreeItem } from '@/models/tree';

type UseMenuType = () => TreeItem[];

const useMenu: UseMenuType = () => {
  const { menuTree } = useNav();
  return menuTree;
};

export default useMenu;