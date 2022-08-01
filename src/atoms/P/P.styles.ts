import styled from '@emotion/styled';
import { space, typography, color } from 'styled-system';
import type { PTypes } from './P.types';

export const Wrapper = styled.p<PTypes>`
  ${space};
  ${typography};
  ${color};
`;
