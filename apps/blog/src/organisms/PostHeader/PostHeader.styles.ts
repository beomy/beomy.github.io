import styled from '@emotion/styled';
import { IconTextStyles } from '@beomy/design-system';

export const Wrapper = styled.div`
  line-height: 1.5;
  > div {
    margin-bottom: 30px;
  }
  ${IconTextStyles.Wrapper} {
    color: ${({ theme }) => theme.colors.caption};
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
`;
