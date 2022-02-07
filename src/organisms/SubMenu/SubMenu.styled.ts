import styled from '@emotion/styled';

const StyledSubMenu = styled.ul`
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  ${({ theme }: any) => `${theme.mediaQueries.small}`} {
    display: none;
  }
  a {
    text-transform: capitalize;
  }
`;

export default StyledSubMenu;
