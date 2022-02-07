import styled from '@emotion/styled';
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
} from 'styled-system';

const StyledUl = styled.ul<SpaceProps & LayoutProps & FlexboxProps>`
  ${space};
  ${layout};
  ${flexbox};
`;

export default StyledUl;
