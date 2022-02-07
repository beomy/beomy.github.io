import React, { ReactNode } from 'react';
import { LayoutProps } from 'styled-system';
import StyledPost from './PostWrapper.styled';

interface IProp extends LayoutProps {
  children: ReactNode;
}

function Post({ children, ...props }: IProp) {
  return <StyledPost {...props}>{children}</StyledPost>;
}

export default Post;
