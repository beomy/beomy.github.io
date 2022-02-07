import styled from '@emotion/styled';
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

const StyledContents = styled.div<LayoutProps & SpaceProps & TypographyProps>`
  padding: 70px 0 10px 0;
  margin: auto;
  ${layout};
  ${space};
  ${typography};
`;

export default StyledContents;
