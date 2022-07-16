import { ChangeEventHandler, KeyboardEventHandler } from 'react';
import StyledInput from './Input.styled';

interface IProp {
  type: string;
  placeholder?: string;
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
}

function Input({
  type,
  placeholder,
  value,
  onFocus,
  onBlur,
  onChange,
  onKeyPress,
}: IProp) {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyPress}
    />
  );
}

Input.defaultProps = {
  placeholder: '',
  onFocus: () => {
    // do nothing.
  },
  onBlur: () => {
    // do nothing.
  },
  onChange: () => {
    // do nothing.
  },
  onKeyPress: () => {
    // do nothing.
  },
};

export default Input;
