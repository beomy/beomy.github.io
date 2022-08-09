import styled from '@emotion/styled';
import type { InputProps } from './Input.types';

export const Wrapper = styled.input<InputProps>`
  padding: 0;
  margin: 0;
  border: 0;
  background: 0;
  &:focus-visible {
    outline: none;
  }
`;
