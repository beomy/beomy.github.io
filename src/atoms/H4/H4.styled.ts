import styled from '@emotion/styled';
import { space, SpaceProps, typography, TypographyProps } from 'styled-system';

const StyledH4 = styled.h4<SpaceProps & TypographyProps>`
  ${space};
  ${typography};
`;

export default StyledH4;
