import type { InputProps } from './Input.types';
import * as S from './Input.styles';

const Input = ({
  type,
  placeholder,
  value,
  onFocus,
  onBlur,
  onChange,
  onKeyPress,
}: InputProps) => {
  return (
    <S.Wrapper
      type={type}
      placeholder={placeholder}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyPress}
    />
  );
};

export default Input;
