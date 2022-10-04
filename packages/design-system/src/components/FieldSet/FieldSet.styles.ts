import type { FieldSetProps } from './FieldSet.types';
import styled from '@emotion/styled';
import { Theme } from '@emotion/react';

type StyleProps = FieldSetProps & { theme: Theme };

export const Wrapper = styled.fieldset`
  margin: 0;
  padding: ${({ title }: StyleProps) =>
    title ? '5px 15px 10px 15px' : '10px 15px'};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey[70]};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Legend = styled.legend`
  padding: 0 5px;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
