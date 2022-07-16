import { ReactNode } from 'react';
import { SpaceProps } from 'styled-system';
import StyledA from './A.styled';

interface IProp {
  children: ReactNode;
  href: string;
  target?: string;
}

function A({ children, href, target, ...props }: IProp & SpaceProps) {
  return (
    <StyledA href={href} target={target} {...props}>
      {children}
    </StyledA>
  );
}

A.defaultProps = {
  target: '',
};

export default A;
