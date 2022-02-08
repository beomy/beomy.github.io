import styled from '@emotion/styled';
import {
  color,
  ColorProps,
  typography,
  TypographyProps,
  space,
  SpaceProps,
} from 'styled-system';

const StyledSpan = styled.span<ColorProps & TypographyProps & SpaceProps>`
  ${color};
  ${typography};
  ${space};
`;

export default StyledSpan;
