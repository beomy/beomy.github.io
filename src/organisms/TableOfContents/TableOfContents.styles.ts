import styled from '@emotion/styled';
import { layout, flexbox, space } from 'styled-system';
import type { TableOfContentsProps } from './TableOfContents.types';

export const Wrapper = styled.div<TableOfContentsProps>`
  font-size: ${({ theme }: any) => theme.fontSizes[1]};
  ${layout};
  ${flexbox};
  ${space};
  ${({ theme }: any) => `${theme.mediaQueries.sm}`} {
    display: none;
  }
  > div {
    position: fixed;
    ${layout};
    a {
      color: ${({ theme }: any) => theme.colors.text2};
      text-decoration: none;
      &:hover {
        color: ${({ theme }: any) => theme.colors.text1};
      }
    }
    .active {
      transform: scale(1.05);
      a {
        color: ${({ theme }: any) => theme.colors.text1};
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
            `1px solid ${theme.colors.border1}`};
        }
      }
    }
  }
`;
