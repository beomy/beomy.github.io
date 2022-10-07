import type { CssProps } from '../../models';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { spinIn } from '../../styles/keyframes';
import { IconProps } from './Icon.types';

type LocalProps = { active: 'true' | 'false' } & IconProps;

export const spinInStyles = ({ active }: CssProps<LocalProps>) =>
  active === 'true' &&
  css`
    animation: ${spinIn} 0.2s;
  `;

export const Wrapper = styled.svg`
  ${spinInStyles};
`;
