import styled from '@emotion/styled';
import { space, layout, flexbox } from 'styled-system';
import type { UlProps } from './Ul.types';

export const Wrapper = styled.ul<UlProps>`
  ${space};
  ${layout};
  ${flexbox};
`;
