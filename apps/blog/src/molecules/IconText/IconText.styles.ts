import styled from '@emotion/styled';
import { space, color, typography } from 'styled-system';
import type { IconTextProps } from './IconText.types';

export const Icon = styled.span`
  margin-right: 5px;
  vertical-align: middle;
`;

export const Wrapper = styled.span<Partial<IconTextProps>>`
  ${space};
  ${color};
  ${typography};
`;
