import type { CssProps, StyledProps } from '../../models';
import { layout, space } from 'styled-system';
import {
  createShouldForwardProp,
  props,
} from '@styled-system/should-forward-prop';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IconButtonProps } from './IconButton.types';

const shouldForwardProp = createShouldForwardProp([
  ...props,
  'resetButtonStyle',
  'url',
]);

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

export const Wrapper = styled('button', { shouldForwardProp })<
  StyledProps<IconButtonProps>
>`
  ${commonStyles};
  ${hoverStyles};
  ${layout};
  ${space};
`;
