import styled from '@emotion/styled';
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  typography,
  TypographyProps,
} from 'styled-system';

const StyledIconText = styled.span<SpaceProps & ColorProps & TypographyProps>`
  ${space};
  ${color};
  ${typography};
  .icon {
    margin-right: 5px;
    vertical-align: middle;
  }
  .text {
    ${typography};
    vertical-align: middle;
  }
`;

export default StyledIconText;
