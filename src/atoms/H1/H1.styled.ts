import styled from '@emotion/styled';
import { space, SpaceProps, typography, TypographyProps } from 'styled-system';

const StyledH1 = styled.h1<SpaceProps & TypographyProps>`
  ${space};
  ${typography};
`;

export default StyledH1;
