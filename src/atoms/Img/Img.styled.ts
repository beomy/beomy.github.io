import styled from '@emotion/styled';
import { layout, LayoutProps, space, SpaceProps } from 'styled-system';

const StyledImage = styled.img<LayoutProps & SpaceProps>`
  ${layout};
  ${space};
`;

export default StyledImage;
