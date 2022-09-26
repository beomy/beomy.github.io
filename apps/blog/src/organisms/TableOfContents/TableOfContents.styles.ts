import styled from '@emotion/styled';
import { layout, flexbox, space } from 'styled-system';
import type { TableOfContentsProps } from './TableOfContents.types';

export const Wrapper = styled.div<TableOfContentsProps>`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  ${layout};
  ${flexbox};
  ${space};
  ${({ theme }) => `${theme.sizes.mediaQueries.sm}`} {
    display: none;
  }
  > div {
    position: fixed;
    ${layout};
    a {
      color: ${({ theme }) => theme.colors.caption};
      text-decoration: none;
      &:hover {
        color: ${({ theme }) => theme.colors.title};
      }
    }
    .active {
      transform: scale(1.05);
      a {
        color: ${({ theme }) => theme.colors.title};
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
          border-left: ${({ theme }) => `1px solid ${theme.colors.grey[90]}`};
        }
      }
    }
  }
`;
