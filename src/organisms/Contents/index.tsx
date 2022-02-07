import React, { ReactNode } from 'react';
import { LayoutProps, SpaceProps, TypographyProps } from 'styled-system';
import StyledContents from './Contents.styled';

interface IProp extends LayoutProps, SpaceProps, TypographyProps {
  children: ReactNode;
}

function Contents({ children, ...props }: IProp) {
  return <StyledContents {...props}>{children}</StyledContents>;
}

export default Contents;
