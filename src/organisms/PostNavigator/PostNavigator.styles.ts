import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { Link } from '@/atoms';
import type { SpaceProps, TypographyProps } from 'styled-system';
import { space, typography } from 'styled-system';

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
  ${({ theme }) => `${theme.mediaQueries.xs}`} {
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

export const BtnLink = styled(Link, { shouldForwardProp })<TypographyProps>`
  display: flex;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.colors.border1}`};
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  height: 100%;
  ${typography};
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colors.border2}`};
  }
`;

export const Contents = styled('div', { shouldForwardProp })<SpaceProps>`
  ${space};
  > div {
    &:first-of-type {
      font-size: ${({ theme }) => theme.fontSizes[0]};
    }
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
  ${({ theme }) => `${theme.mediaQueries.xs}`} {
    display: block;
  }
`;
