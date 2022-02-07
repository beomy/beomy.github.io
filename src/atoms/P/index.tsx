import React, { ReactNode } from 'react';
import { SpaceProps, TypographyProps, ColorProps } from 'styled-system';
import StyledP from './P.styled';

interface IProp extends SpaceProps, TypographyProps, ColorProps {
  children: ReactNode;
}

function P({ children, ...props }: IProp) {
  return <StyledP {...props}>{children}</StyledP>;
}

export default P;
