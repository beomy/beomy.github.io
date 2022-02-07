import styled from '@emotion/styled';
import { space, SpaceProps, typography, TypographyProps } from 'styled-system';

const StyledH2 = styled.h2<SpaceProps & TypographyProps>`
  ${space};
  ${typography};
`;

export default StyledH2;
