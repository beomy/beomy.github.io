import React from 'react';
import { LayoutProps, SpaceProps } from 'styled-system';
import StyledImg from './Img.styled';

interface IProp {
  src: string;
  alt?: string;
  height?: any;
  width?: any;
}

function Img({ src, alt, ...props }: IProp & LayoutProps & SpaceProps) {
  return <StyledImg src={src} alt={alt} {...props} />;
}

Img.defaultProps = {
  alt: '',
  height: undefined,
  width: undefined,
};

export default Img;