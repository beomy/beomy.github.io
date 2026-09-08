import styled from '@emotion/styled';
import { space, typography } from 'styled-system';
import { H1Props } from './H1.types';

export const Wrapper = styled.h1<H1Props>`
  ${space};
  ${typography};
`;
