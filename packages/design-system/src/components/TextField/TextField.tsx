import type { TextFieldProps } from './TextField.types';
import React, { useMemo, useCallback, useRef, useEffect } from 'react';
import { useInput } from '@beomy/utils/react';
import * as S from './TextField.styles';
import IconButton from '../IconButton';

const TextField = ({
  type,
  placeholder,
  value,
  clearable = true,
  searchable = true,
  onSearch,
  onChange: propOnChange,
  ...props
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [str, onChange, onReset] = useInput(value ?? '');
  const isClearable = useMemo(() => !!(str && clearable), [str, clearable]);

  const handleClear = useCallback(() => {
    onReset();
    inputRef.current?.focus();
  }, [onReset]);

  useEffect(() => {
    propOnChange?.(str);
  }, [propOnChange, str]);

  return (
    <S.Wrapper {...props}>
      <S.Input
        ref={inputRef}
        type={type}
        value={str}
        placeholder={placeholder}
        {...props}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(str)}
      />
      <S.Action>
        <IconButton
          icon="BsXCircle"
          display={isClearable ? undefined : 'none'}
          aria-label="clear"
          onClick={handleClear}
        />
        {searchable && (
          <IconButton
            icon="BsSearch"
            aria-label="search"
            onClick={() => onSearch?.(str)}
          />
        )}
      </S.Action>
    </S.Wrapper>
  );
};

export default TextField;
