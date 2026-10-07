'use client';

import type { ReactNode } from 'react';
import { useMount } from '@beomy/utils';
import type { Theme } from '@/models/theme';
import { useTheme } from '@/hooks';
import { Notification } from '@/components/layout';
import { NavProvider } from '@/contexts/nav-context';
import type { NavData } from '@/contexts/nav-context';

const ThemedApp = ({ children }: { children: ReactNode }) => {
  const { syncTheme } = useTheme();

  useMount(() => {
    // 초기 테마는 layout.tsx 의 인라인 스크립트가 이미 결정해 <html data-theme> 에 넣어 두었다.
    // 같은 규칙을 다시 계산하지 않고 그 값을 스토어로 복사만 한다.
    const initial = document.documentElement.dataset.theme as Theme | undefined;
    syncTheme(initial ?? 'light');

    // 사용자가 직접 고른 적이 없으면(localStorage 비어 있음) OS 테마 변경을 따라간다.
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const handleModeChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem('beomy.theme')) return;
      syncTheme(event.matches ? 'dark' : 'light');
    };
    matchMedia.addEventListener('change', handleModeChange);
    return () => matchMedia.removeEventListener('change', handleModeChange);
  });

  return (
    <>
      {children}
      <Notification />
    </>
  );
};

const Providers = ({
  navData,
  children,
}: {
  navData: NavData;
  children: ReactNode;
}) => {
  return (
    <NavProvider value={navData}>
      <ThemedApp>{children}</ThemedApp>
    </NavProvider>
  );
};

export default Providers;
