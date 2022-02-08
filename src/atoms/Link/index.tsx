import React, { ReactNode } from 'react';
import { GatsbyLinkProps } from 'gatsby';
import { SpaceProps, LayoutProps } from 'styled-system';
import StyledLink from './Link.styled';

interface IProp extends SpaceProps, LayoutProps, GatsbyLinkProps<any> {
  children: ReactNode;
  ref?: any;
}

function Link({ children, to, ...props }: IProp) {
  return (
    <StyledLink to={to} {...props}>
      {children}
    </StyledLink>
  );
}

Link.defaultProps = {
  ref: undefined,
};

export default Link;
