import * as S from './Button.styles';
import type { ButtonProps } from './Button.types';

const Button = ({ children, ...props }: ButtonProps) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default Button;
