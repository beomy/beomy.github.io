import styled from '@emotion/styled';
import { AnchorStyles } from '@beomy/design-system';

export const Wrapper = styled.ul`
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  small {
    font-size: ${({ theme }) => theme.fontSizes[0]};
  }
  ${({ theme }) => `${theme.sizes.mediaQueries.sm}`} {
    display: none;
  }
  ${AnchorStyles.Wrapper} {
    text-transform: capitalize;
    padding: 5px 10px;
  }
`;
