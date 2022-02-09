import styled from '@emotion/styled';
import { Link } from 'gatsby';

const StyledPostCard = styled(Link)`
  width: 320px;
  border-radius: 4px;
  margin: 10px;
  background: ${({ theme }: any) => theme.colors.white};
  display: flex;
  flex-direction: column;
  color: ${({ theme }: any) => theme.colors.text1};
  text-decoration: none;
  line-height: 1.4;
  border: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
  box-shadow: rgb(0 0 0 / 6%) 0 4px 16px 0;
  box-sizing: border-box;
  ${({ theme }: any) => `${theme.mediaQueries.sm}`} {
    width: calc(50% - 20px);
  }
  ${({ theme }: any) => `${theme.mediaQueries.xs}`} {
    width: 100%;
  }
  .header {
    > div {
      position: relative;
      padding-top: 50%;
      .gatsby-image-wrapper-constrained {
        position: absolute;
        top: 0;
      }
    }
  }
  .body {
    padding: 15px;
    flex-grow: 1;
    flex-shrink: 1;
  }
  .footer {
    border-top: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 15px;
      color: ${({ theme }: any) => theme.colors.text2};
      font-weight: ${({ theme }: any) => theme.fontWeights.thin};
    }
  }
`;

export default StyledPostCard;
