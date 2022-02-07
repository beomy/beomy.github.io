import styled from '@emotion/styled';
import { Link } from 'gatsby';

const StyledPostCard = styled(Link)`
  width: 320px;
  border-radius: 4px;
  margin: 10px;
  background: ${({ theme }: any) => theme.colors.white};
  display: flex;
  flex-direction: column;
  color: ${({ theme }: any) => theme.colors.black};
  text-decoration: none;
  line-height: 1.4;
  border: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
  box-shadow: rgb(0 0 0 / 6%) 0 4px 16px 0;
  box-sizing: border-box;
  ${({ theme }: any) => `${theme.mediaQueries.small}`} {
    width: calc(50% - 20px);
  }
  ${({ theme }: any) => `${theme.mediaQueries.xSmall}`} {
    width: 100%;
  }
  .body {
    padding: 15px;
    flex: 1 1 0;
  }
  .footer {
    border-top: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
  }
`;

export default StyledPostCard;
