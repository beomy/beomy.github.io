import type { CssProps, StyledProps } from '../../models';
import { layout, space } from 'styled-system';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IconButtonProps } from './IconButton.types';

export const hoverStyles = ({ theme, border }: CssProps<IconButtonProps>) =>
  border
    ? css`
        border: 1px solid ${theme.colors.grey[90]};
        &:hover {
          border: 1px solid ${theme.colors.grey[70]};
          color: ${theme.colors.title};
        }
      `
    : css`
        &:hover {
          background-color: ${theme.colors.grey[90]};
          color: ${theme.colors.title};
        }
      `;

export const commonStyles = ({ theme }: CssProps<IconButtonProps>) => css`
  display: inline-flex;
  padding: 10px;
  border-radius: 100%;
  color: ${theme.colors.body};
`;

export const Wrapper = styled('button', {
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) || prop === 'resetButtonStyle' || prop === 'url',
})<StyledProps<IconButtonProps>>`
  ${commonStyles};
  ${hoverStyles};
  ${layout};
  ${space};
`;
