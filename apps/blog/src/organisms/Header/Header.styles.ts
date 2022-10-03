import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Color from 'color';
import { TextFieldStyles, AnchorStyles } from '@beomy/design-system';
import { Ul } from '@/atoms';

export const MenuBtn = styled.button`
  display: none;
  ${({ theme }) => `${theme.sizes.mediaQueries.sm}`} {
    display: block;
  }
`;

export const GNB = styled(Ul)`
  margin: 0 0 0 auto;
  padding: 0;
  display: flex;
  ${({ theme }) => `${theme.sizes.mediaQueries.sm}`} {
    display: none;
  }
  ${AnchorStyles.Wrapper} {
    padding: 5px 10px;
  }
`;

export const Action = styled.div`
  margin-left: 10px;
  display: flex;
  button {
    + button {
      margin-left: 10px;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 75px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
  background-color: ${({ theme }) =>
    Color(theme.colors.background).alpha(0.8).toString()};
  ${({ theme }) => `${theme.sizes.mediaQueries.sm}`} {
    padding: 10px 20px;
  }
`;

export const Search = styled.div<{ active: boolean }>`
  height: 0;
  background-color: ${({ theme }) =>
    Color(theme.colors.grey[98]).alpha(0.8).toString()};
  transition: height 0.35s ease-in-out 0s;
  visibility: hidden;
  display: flex;
  align-items: center;
  ${({ active }) =>
    active &&
    css`
      height: 80px;
      visibility: visible;
    `}
  ${TextFieldStyles.Wrapper} {
    margin: auto;
    height: 100%;
    width: ${({ theme }) => theme.sizes.screen.m};
    ${({ theme }) => `${theme.sizes.mediaQueries.m}`} {
      width: ${({ theme }) => theme.sizes.screen.sm};
    }
    ${({ theme }) => `${theme.sizes.mediaQueries.sm}`} {
      width: ${({ theme }) => theme.sizes.screen.xs};
    }
  }
`;

export const Wrapper = styled.header<{ hide: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: rgb(0 0 0 / 8%) 0 0 15px;
  transition: top 0.2s ease-in-out;
  button {
    color: ${({ theme }) => theme.colors.body};
    &:hover {
      color: ${({ theme }) => theme.colors.title};
    }
  }
  ${({ hide }) =>
    hide &&
    css`
      top: -140px;
    `};
`;
