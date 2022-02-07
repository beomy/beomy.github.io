import React, { ReactNode } from 'react';
import { SpaceProps, TypographyProps } from 'styled-system';
import StyledH4 from './H4.styled';

interface IProp {
  children: ReactNode;
}

function H4({ children, ...props }: IProp & SpaceProps & TypographyProps) {
  return <StyledH4 {...props}>{children}</StyledH4>;
}

export default H4;
