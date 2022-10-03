import type { Theme } from '@emotion/react';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { AnchorProps } from './Anchor.types';

type StyleProps = AnchorProps & { theme: Theme };

const borderStyles = ({ theme, border }: StyleProps) =>
  border &&
  css`
    border: 1px solid ${theme.colors.grey[90]};
    border-radius: 10px;
    padding: 5px 15px;
    &:hover {
      border: 1px solid ${theme.colors.grey[70]};
    }
  `;

const commonStyles = ({ theme }: StyleProps) => css`
  box-sizing: border-box;
  color: ${theme.colors.body};
  text-decoration: none;
  &.active,
  &:hover {
    color: ${theme.colors.title};
  }
`;

export const Wrapper = styled('a', { shouldForwardProp })`
  ${commonStyles};
  ${borderStyles};
`;
