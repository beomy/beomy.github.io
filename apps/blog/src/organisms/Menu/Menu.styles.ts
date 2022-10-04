import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AnchorStyles } from '@beomy/design-system';
import { UlStyles } from '@/atoms';
import type { MenuProps } from './Menu.types';

export const Container = styled.div<{ active: boolean }>`
  width: 285px;
  height: 100%;
  position: absolute;
  background: ${({ theme }) => theme.colors.grey[100]};
  transform: translateX(100%);
  right: 0;
  ${({ active }) =>
    active &&
    css`
      box-shadow: 2px 0 8px rgb(0 0 0 / 15%);
      transform: translateX(0);
    `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
  padding-left: 20px;
`;

export const Wrapper = styled.menu<Partial<MenuProps>>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 9;
  margin: 0;
  padding: 0;
  > * {
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      box-shadow 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  ${({ active }) =>
    active &&
    css`
      width: 100%;
    `}
  ${UlStyles.Wrapper} {
    padding-left: 30px;
  }
  ${AnchorStyles.Wrapper} {
    text-transform: capitalize;
  }
`;
