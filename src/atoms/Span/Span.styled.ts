import styled from '@emotion/styled';
import { color, ColorProps } from 'styled-system';

const StyledSpan = styled.span<ColorProps>`
  ${color};
`;

export default StyledSpan;
