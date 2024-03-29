import styled from '@emotion/styled';
import { layout, space, typography, flexbox } from 'styled-system';
import type { ContentsProps } from './Contents.types';

export const Wrapper = styled.main<ContentsProps>`
  padding: 70px 0 10px 0;
  margin: auto;
  ${layout};
  ${space};
  ${typography};
  ${flexbox};
`;
