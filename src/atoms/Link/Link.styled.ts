import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { space, SpaceProps, layout, LayoutProps } from 'styled-system';

const StyledLink = styled(Link)<SpaceProps & LayoutProps>`
  color: ${({ theme }: any) => theme.colors.text2};
  text-decoration: none;
  ${space};
  ${layout};
  &.active,
  &:hover {
    color: ${({ theme }: any) => theme.colors.text1};
  }
`;

export default StyledLink;