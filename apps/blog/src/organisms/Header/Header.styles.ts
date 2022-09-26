import styled from '@emotion/styled';
import { css } from '@emotion/react';
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
  ${AnchorStyles.A} {
    padding: 5px 10px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 75px;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
  ${({ theme }) => `${theme.sizes.mediaQueries.sm}`} {
    padding: 10px 20px;
  }
`;

export const Search = styled.div<{ active: boolean }>`
  height: 0;
  background-color: rgba(250, 250, 250, 0.8);
  transition: all 0.35s ease-in-out 0s;
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
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: rgb(0 0 0 / 8%) 0 0 15px;
  transition: top 0.2s ease-in-out;
  ${({ hide }) =>
    hide &&
    css`
      top: -140px;
    `};
`;
