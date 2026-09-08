import styled from '@emotion/styled';
import { FieldSet } from '@beomy/design-system';

export const Wrapper = styled(FieldSet)`
  max-height: 100%;
  overflow: auto;
`;

export const Toc = styled.nav`
  font-size: ${({ theme }) => theme.fontSizes[1]};
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
    margin: 0;
    padding: 0;
    > li {
      > ul {
        padding-left: 15px;
      }
    }
  }
`;
