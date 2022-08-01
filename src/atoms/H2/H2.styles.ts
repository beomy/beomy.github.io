import styled from '@emotion/styled';
import { space, typography } from 'styled-system';
import type { H2Props } from './H2.types';

export const Wrapper = styled.h2<H2Props>`
  ${space};
  ${typography};
`;
