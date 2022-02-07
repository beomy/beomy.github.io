import styled from '@emotion/styled';
import { space, SpaceProps, layout, LayoutProps } from 'styled-system';

const StyledButton = styled.button<SpaceProps & LayoutProps>`
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  ${space};
  ${layout};
`;

export default StyledButton;
