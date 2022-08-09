import styled from '@emotion/styled';
import { Link } from 'gatsby';

export const Header = styled.div`
  position: relative;
  padding-top: 50%;
  .gatsby-image-wrapper-constrained {
    position: absolute;
    top: 0;
  }
`;

export const Body = styled.div`
  padding: 15px;
  flex-grow: 1;
  flex-shrink: 1;
`;

export const Footer = styled.div`
  border-top: ${({ theme }: any) => `1px solid ${theme.colors.border1}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  color: ${({ theme }: any) => theme.colors.text2};
  font-weight: ${({ theme }: any) => theme.fontWeights.thin};
`;

export const Wrapper = styled(Link)`
  width: 320px;
  border-radius: 4px;
  margin: 10px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.text1};
  text-decoration: none;
  line-height: 1.4;
  border: ${({ theme }) => `1px solid ${theme.colors.border1}`};
  box-shadow: rgb(0 0 0 / 6%) 0 4px 16px 0;
  box-sizing: border-box;
  ${({ theme }) => `${theme.mediaQueries.sm}`} {
    width: calc(50% - 20px);
  }
  ${({ theme }) => `${theme.mediaQueries.xs}`} {
    width: 100%;
  }
`;
