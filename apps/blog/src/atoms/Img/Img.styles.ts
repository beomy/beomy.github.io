import styled from '@emotion/styled';
import { layout, space } from 'styled-system';
import type { ImgProps } from './Img.types';

export const Wrapper = styled.img<ImgProps>`
  ${layout};
  ${space};
`;
