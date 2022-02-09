import styled from '@emotion/styled';
import { space, SpaceProps } from 'styled-system';

const StyledA = styled.a<SpaceProps>`
  color: ${({ theme }: any) => theme.colors.text2};
  text-decoration: none;
  ${space};
  &.active,
  &:hover {
    color: ${({ theme }: any) => theme.colors.text1};
  }
`;

export default StyledA;
