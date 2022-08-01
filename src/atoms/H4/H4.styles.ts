import styled from '@emotion/styled';
import { space, typography } from 'styled-system';
import type { H4Props } from './H4.types';

export const Wrapper = styled.h4<H4Props>`
  ${space};
  ${typography};
`;
