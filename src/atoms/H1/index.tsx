import { ReactNode } from 'react';
import { SpaceProps, TypographyProps } from 'styled-system';
import StyledH1 from './H1.styled';

interface IProp {
  children: ReactNode;
}

function H1({ children, ...props }: IProp & SpaceProps & TypographyProps) {
  return <StyledH1 {...props}>{children}</StyledH1>;
}

export default H1;
