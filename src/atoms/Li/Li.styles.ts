import styled from '@emotion/styled';
import { LiProps } from './Li.types';
import { space, layout } from 'styled-system';

export const Wrapper = styled.li<LiProps>`
  list-style: none;
  ${space};
  ${layout};
`;
