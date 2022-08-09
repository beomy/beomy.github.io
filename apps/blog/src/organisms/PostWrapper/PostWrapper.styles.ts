import styled from '@emotion/styled';
import { layout } from 'styled-system';
import type { PostWrapperProps } from './PostWrapper.types';

export const Wrapper = styled.div<PostWrapperProps>`
  ${layout};
`;
