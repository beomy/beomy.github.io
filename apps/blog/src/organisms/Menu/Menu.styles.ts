import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { UlStyles, LinkStyles } from '@/atoms';
import type { MenuProps } from './Menu.types';

export const Dim = styled.div<{ active: boolean }>`
  background: ${({ theme }: any) => theme.colors.black};
  opacity: 0;
  width: 100%;
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
    height 0s ease 0.3s;
  ${({ active }) =>
    active &&
    css`
      opacity: 0.3;
      height: 100%;
      transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    `}
`;

export const Container = styled.div<{ active: boolean }>`
  width: 285px;
  height: 100%;
  position: absolute;
  background: ${({ theme }: any) => theme.colors.white};
  transform: translateX(-100%);
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
  border-bottom: ${({ theme }: any) => `1px solid ${theme.colors.border1}`};
`;

export const Wrapper = styled.menu<Partial<MenuProps>>`
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  z-index: 9999;
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
  ${LinkStyles.Wrapper} {
    text-transform: capitalize;
  }
`;