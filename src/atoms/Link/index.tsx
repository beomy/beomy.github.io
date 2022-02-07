import React, { ReactNode } from 'react';
import { GatsbyLinkProps } from 'gatsby';
import { SpaceProps, LayoutProps } from 'styled-system';
import StyledLink from './Link.styled';

interface IProp {
  children: ReactNode;
}

function Link({
  children,
  to,
  ...props
}: IProp & GatsbyLinkProps<any> & SpaceProps & LayoutProps) {
  return (
    <StyledLink to={to} {...props}>
      {children}
    </StyledLink>
  );
}

export default Link;
