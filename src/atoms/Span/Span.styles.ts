import styled from '@emotion/styled';
import { color, typography, space } from 'styled-system';
import type { SpanProps } from './Span.types';

export const Wrapper = styled.span<SpanProps>`
  ${color};
  ${typography};
  ${space};
`;
