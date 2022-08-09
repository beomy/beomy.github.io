import styled from '@emotion/styled';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  margin: 0 auto 10px;
`;

export const Wrapper = styled.footer`
  text-align: center;
  padding: 25px 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: ${({ theme }) => `1px solid ${theme.colors.border1}`};
`;
