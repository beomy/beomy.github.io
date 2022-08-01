import type {
  ChangeEventHandler,
  KeyboardEventHandler,
  FocusEventHandler,
} from 'react';

export type InputProps = {
  type: string;
  value: string;
  placeholder?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
};
