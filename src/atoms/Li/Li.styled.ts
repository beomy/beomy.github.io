import styled from '@emotion/styled';
import { space, SpaceProps, layout, LayoutProps } from 'styled-system';

const StyledLi = styled.li<SpaceProps & LayoutProps>`
  list-style: none;
  ${space};
  ${layout};
`;

export default StyledLi;
