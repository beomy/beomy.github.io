import styled from '@emotion/styled';
import { space, layout } from 'styled-system';
import type { ButtonProps } from './Button.types';

export const Wrapper = styled.button<ButtonProps>`
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  ${space};
  ${layout};
`;
