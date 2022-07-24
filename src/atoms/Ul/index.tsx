import { ReactNode } from 'react';
import { SpaceProps, LayoutProps, FlexboxProps } from 'styled-system';
import StyledUl from './Ul.styled';

interface IProp extends SpaceProps, LayoutProps, FlexboxProps {
  children: ReactNode;
}

function Ul({ children, ...props }: IProp) {
  return <StyledUl {...props}>{children}</StyledUl>;
}

export default Ul;
