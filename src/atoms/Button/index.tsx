import { ReactNode } from 'react';
import { SpaceProps, LayoutProps } from 'styled-system';
import StyledButton from './Button.styled';

interface IProp extends SpaceProps, LayoutProps {
  children: ReactNode;
  className?: any;
  onClick?: (el: any) => void;
}

function Button({ children, onClick, ...props }: IProp) {
  return (
    <StyledButton {...props} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  className: undefined,
  onClick: () => {
    // do nothing.
  },
};

export default Button;
