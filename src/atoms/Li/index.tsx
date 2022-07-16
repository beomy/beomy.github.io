import { ReactNode } from 'react';
import { SpaceProps, LayoutProps } from 'styled-system';
import StyledLi from './Li.styled';

interface IProp extends SpaceProps, LayoutProps {
  children: ReactNode;
}

function Li({ children, ...props }: IProp) {
  return <StyledLi {...props}>{children}</StyledLi>;
}

export default Li;
