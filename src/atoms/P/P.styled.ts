import styled from '@emotion/styled';
import {
  space,
  SpaceProps,
  typography,
  TypographyProps,
  color,
  ColorProps,
} from 'styled-system';

const StyledP = styled.p<SpaceProps & TypographyProps & ColorProps>`
  ${space};
  ${typography};
  ${color};
`;

export default StyledP;
