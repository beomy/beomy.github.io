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
  .post-banner-img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;
