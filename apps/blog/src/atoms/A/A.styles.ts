import styled from '@emotion/styled';
import { space } from 'styled-system';
import type { AProps } from './A.types';

export const Wrapper = styled.a<AProps>`
  color: ${({ theme }: any) => theme.colors.text2};
  text-decoration: none;
  ${space};
  &:hover {
    color: ${({ theme }: any) => theme.colors.text1};
  }
`;
