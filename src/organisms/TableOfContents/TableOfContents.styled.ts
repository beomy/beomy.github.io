import styled from '@emotion/styled';
import {
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  space,
  SpaceProps,
} from 'styled-system';

const StyledTableOfContents = styled.div<
  LayoutProps & FlexboxProps & SpaceProps
>`
  font-size: ${({ theme }: any) => theme.fontSizes[1]};
  ${layout};
  ${flexbox};
  ${space};
  ${({ theme }: any) => `${theme.mediaQueries.small}`} {
    display: none;
  }
  > div {
    position: fixed;
    ${layout};
    a {
      color: ${({ theme }: any) => theme.colors.gray};
      text-decoration: none;
      &:hover {
        color: ${({ theme }: any) => theme.colors.black};
      }
    }
    .active {
      transform: scale(1.05);
      a {
        color: ${({ theme }: any) => theme.colors.black};
      }
    }
    li {
      list-style: none;
    }
    p {
      margin: 0;
    }
    > ul {
      padding: 0;
      > li {
        > ul {
          padding-left: 15px;
          border-left: ${({ theme }: any) =>
            `1px solid ${theme.colors.border}`};
        }
      }
    }
  }
`;

export default StyledTableOfContents;
