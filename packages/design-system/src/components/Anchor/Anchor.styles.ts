import type { AnchorProps } from './Anchor.types';
import type { CssProps } from '../../models';
import { typography } from 'styled-system';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const borderStyles = ({ theme, border }: CssProps<AnchorProps>) =>
  border &&
  css`
    border: 1px solid ${theme.colors.grey[90]};
    border-radius: 10px;
    padding: 5px 15px;
    &:hover {
      border: 1px solid ${theme.colors.grey[70]};
    }
  `;

const commonStyles = ({ theme }: CssProps<AnchorProps>) => css`
  box-sizing: border-box;
  color: ${theme.colors.body};
  text-decoration: none;
  &.active,
  &:hover {
    color: ${theme.colors.title};
  }
`;

export const Wrapper = styled('a', {
  shouldForwardProp: (props) =>
    shouldForwardProp(props) && !['border'].includes(props),
})`
  ${commonStyles};
  ${borderStyles};
  ${typography};
`;
