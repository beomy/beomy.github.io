import React, { ReactNode } from 'react';
import { ColorProps } from 'styled-system';
import StyledSpan from './Span.styled';

interface IProp extends ColorProps {
  children: ReactNode;
}

function Ul({ children, ...props }: IProp) {
  return <StyledSpan {...props}>{children}</StyledSpan>;
}

export default Ul;
