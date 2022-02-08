import React, { ReactNode } from 'react';
import { ColorProps, TypographyProps, SpaceProps } from 'styled-system';
import StyledSpan from './Span.styled';

interface IProp extends ColorProps, TypographyProps, SpaceProps {
  children: ReactNode;
  color?: any;
}

function Span({ children, ...props }: IProp) {
  return <StyledSpan {...props}>{children}</StyledSpan>;
}

Span.defaultProps = {
  color: undefined,
};

export default Span;
