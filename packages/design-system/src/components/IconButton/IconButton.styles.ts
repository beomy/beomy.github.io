import type { Theme } from '@emotion/react';
import { layout } from 'styled-system';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IconButtonProps } from './IconButton.types';

type StyleProps = Pick<IconButtonProps, 'border'> & { theme: Theme };

export const hoverStyles = ({ theme, border }: StyleProps) =>
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

export const commonStyles = ({ theme }: StyleProps) => css`
  display: inline-flex;
  padding: 10px;
  border-radius: 100%;
  color: ${theme.colors.body};
`;

export const Wrapper = styled('button', {
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) || prop === 'resetButtonStyle' || prop === 'url',
})<any>`
  ${commonStyles};
  ${hoverStyles};
  ${layout};
`;
