import styled from '@emotion/styled';
import { typography } from 'styled-system';
import type { InputProps, ClearButtonProps } from './TextField.types';

export const ClearButton = styled.button<ClearButtonProps>`
  visibility: ${({ active }) => (active ? 'inherit' : 'hidden')};
`;

export const Input = styled.input`
  height: 100%;
  width: calc(100% - 70px);
`;

export const Wrapper = styled.div<Partial<InputProps>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > * {
    color: ${({ theme }) => theme.colors.body};
    ${typography};
  }
  button {
    + button {
      margin-left: 5px;
    }
  }
`;
