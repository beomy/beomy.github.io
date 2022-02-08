import styled from '@emotion/styled';

const StyledFooter = styled.footer`
  text-align: center;
  padding: 25px 0;
  background-color: ${({ theme }: any) => theme.colors.white};
  border-top: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
  nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100px;
    margin: 0 auto 10px;
  }
`;

export default StyledFooter;
