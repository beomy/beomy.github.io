import React, { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { SpaceProps, ColorProps, TypographyProps } from 'styled-system';
import StyledIconText from './IconText.styled';

interface IProp extends SpaceProps, ColorProps, TypographyProps {
  Icon: IconType;
  children: ReactNode;
  color?: any;
}

function IconText({ Icon, children, ...props }: IProp) {
  return (
    <StyledIconText {...props}>
      <span className="icon">
        <Icon />
      </span>
      <span className="text">{children}</span>
    </StyledIconText>
  );
}

IconText.defaultProps = {
  color: undefined,
};

export default IconText;