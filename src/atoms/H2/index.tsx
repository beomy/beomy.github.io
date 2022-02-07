import React, { ReactNode } from 'react';
import { SpaceProps, TypographyProps } from 'styled-system';
import StyledH2 from './H2.styled';

interface IProp {
  children: ReactNode;
}

function H2({ children, ...props }: IProp & SpaceProps & TypographyProps) {
  return <StyledH2 {...props}>{children}</StyledH2>;
}

export default H2;
