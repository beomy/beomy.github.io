'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { TreeItem } from '@/models/tree';

export type NavData = {
  categoryList: string[];
  menuTree: TreeItem[];
};

const NavContext = createContext<NavData>({
  categoryList: [],
  menuTree: [],
});

export const NavProvider = ({
  value,
  children,
}: {
  value: NavData;
  children: ReactNode;
}) => <NavContext.Provider value={value}>{children}</NavContext.Provider>;

export const useNav = () => useContext(NavContext);
