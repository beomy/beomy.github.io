import styled from '@emotion/styled';
import { Link } from 'gatsby';
import type { LinkProps } from './Link.types';
import { space, layout } from 'styled-system';

export const Wrapper = styled(Link)<LinkProps>`
  color: ${({ theme }: any) => theme.colors.text2};
  text-decoration: none;
  ${space};
  ${layout};
  &.active,
  &:hover {
    color: ${({ theme }: any) => theme.colors.text1};
  }
`;
