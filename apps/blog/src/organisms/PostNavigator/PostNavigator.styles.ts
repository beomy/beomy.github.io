import type { SpaceProps, TypographyProps } from 'styled-system';
import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { space, typography } from 'styled-system';
import { Anchor as BeomyAnchor } from '@beomy/design-system';

export const BtnWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  height: 70px;
  margin-bottom: 10px;
  &:first-of-type {
    margin-right: 5px;
  }
  &:last-of-type {
    margin-left: 5px;
  }
  &:empty {
    height: 0;
  }
  ${({ theme }) => `${theme.sizes.mediaQueries.xs}`} {
    flex-grow: initial;
    flex-shrink: initial;
    flex-basis: initial;
    :first-of-type {
      margin-right: 0;
    }
    :last-child {
      margin-left: 0;
    }
  }
`;

export const Contents = styled('div', { shouldForwardProp })<SpaceProps>`
  ${space};
  small {
    font-size: ${({ theme }) => theme.fontSizes[0]};
  }
`;

export const Icon = styled.div`
  width: 35px;
  height: 35px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.4;
  margin-top: 20px;
  ${({ theme }) => `${theme.sizes.mediaQueries.xs}`} {
    display: block;
  }
`;

export const Anchor = styled(BeomyAnchor)<TypographyProps>`
  display: flex;
  align-items: center;
  height: 70px;
  line-height: 1.4;
  ${typography};
`;
