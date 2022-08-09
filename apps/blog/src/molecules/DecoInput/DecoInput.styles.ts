import styled from '@emotion/styled';
import { typography } from 'styled-system';
import { Button, ButtonStyles, InputStyles } from '@/atoms';
import type { DecoInputProps, ClearButtonProps } from './DecoInput.types';

export const Clear = styled(Button)<ClearButtonProps>`
  visibility: hidden;
  margin-right: 5px;
  visibility: ${({ active }) => active && 'visible'};
`;

export const Wrapper = styled.div<Partial<DecoInputProps>>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${InputStyles.Wrapper} {
    ${typography};
    height: 100%;
    width: calc(100% - 70px);
  }
  ${ButtonStyles.Wrapper} {
    width: ${({ fontSize }) => fontSize?.toString()};
    height: ${({ fontSize }) => fontSize?.toString()};
  }
`;
