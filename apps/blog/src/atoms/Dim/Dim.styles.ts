import type { DimProps } from './Dim.types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Warpper = styled.div<DimProps>`
  background: ${({ theme }) => theme.colors.black};
  opacity: 0;
  width: 100%;
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
    height 0s ease 0.3s;
  ${({ active }) =>
    active &&
    css`
      opacity: 0.7;
      height: 100%;
      transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    `}
`;
