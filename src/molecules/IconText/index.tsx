import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { SpaceProps, ColorProps, TypographyProps } from 'styled-system';
import StyledIconText from './IconText.styled';

interface IProp extends SpaceProps, ColorProps, TypographyProps {
  Icon: IconType;
  iconSize?: number;
  children: ReactNode;
  color?: any;
}

function IconText({ Icon, children, iconSize, ...props }: IProp) {
  return (
    <StyledIconText {...props}>
      <span className="icon">
        <Icon size={iconSize} />
      </span>
      <span className="text">{children}</span>
    </StyledIconText>
  );
}

IconText.defaultProps = {
  color: undefined,
  iconSize: undefined,
};

export default IconText;
