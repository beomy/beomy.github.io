import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { IconTextStyles } from '@beomy/design-system';
import { H4Styles } from '@/atoms';

export const Header = styled.div`
  position: relative;
  padding-top: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  .gatsby-image-wrapper-constrained {
    position: absolute;
    top: 0;
  }
`;

export const Body = styled.div`
  padding: 15px;
  flex-grow: 1;
  flex-shrink: 1;
  ${H4Styles.Wrapper} {
    color: ${({ theme }) => theme.colors.title};
  }
  p {
    color: ${({ theme }) => theme.colors.body};
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
`;

export const Footer = styled.div`
  border-top: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  color: ${({ theme }) => theme.colors.caption};
  ${IconTextStyles.Wrapper} {
    font-size: ${({ theme }) => theme.fontSizes[0]};
  }
`;

export const Wrapper = styled<any>(Link)`
  width: 320px;
  border-radius: 4px;
  margin: 10px;
  background: ${({ theme }) => theme.colors.grey[100]};
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.title};
  text-decoration: none;
  line-height: 1.4;
  border: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
  box-shadow: rgb(0 0 0 / 6%) 0 4px 16px 0;
  box-sizing: border-box;
  ${({ theme }) => `${theme.sizes.mediaQueries.sm}`} {
    width: calc(50% - 20px);
  }
  ${({ theme }) => `${theme.sizes.mediaQueries.xs}`} {
    width: 100%;
  }
`;
