import type { SpaceProps } from 'styled-system';
import type { ReactNode } from 'react';

export type AProps = {
  children: ReactNode;
  href: string;
  target?: string;
} & SpaceProps;
