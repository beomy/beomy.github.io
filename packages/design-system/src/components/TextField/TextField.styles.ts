import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import { typography } from 'styled-system';
import type { TextFieldProps } from './TextField.types';

type StyleProps = TextFieldProps & { theme: Theme };

const borderStyles = ({ border, theme }: StyleProps) =>
  border &&
  css`
    border: 1px solid ${theme.colors.grey[90]};
    border-radius: 10px;
    padding: 5px 15px;
    &:hover {
      border: 1px solid ${theme.colors.grey[70]};
    }
  `;

export const Input = styled.input`
  min-height: 36px;
  height: 100%;
  flex-grow: 1;
`;

export const Action = styled.div`
  button {
    + button {
      margin-left: 5px;
    }
  }
`;

export const Wrapper = styled.div<Partial<TextFieldProps>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > * {
    color: ${({ theme }) => theme.colors.body};
    ${typography};
  }
  ${borderStyles};
`;