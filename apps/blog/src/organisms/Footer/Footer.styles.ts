import styled from '@emotion/styled';
import { AnchorStyles } from '@beomy/design-system';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  margin: 0 auto 10px;
  ${AnchorStyles.Wrapper} {
    padding: 5px 10px;
  }
`;

export const Description = styled.span`
  color: ${({ theme }) => theme.colors.caption};
  font-size: ${({ theme }) => theme.fontSizes[1]};
`;

export const Wrapper = styled.footer`
  text-align: center;
  padding: 25px 0;
  background-color: ${({ theme }) => theme.colors.grey[100]};
  border-top: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
`;
