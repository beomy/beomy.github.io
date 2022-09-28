import React, { useMemo, useCallback, useRef } from 'react';
import { useInput } from '@beomy/utils/hooks';
import type { InputProps } from './TextField.types';
import * as S from './TextField.styles';
import Icon from '../Icon';

const TextField = ({
  type,
  placeholder,
  value,
  clearable = true,
  searchable = true,
  onSearch,
  ...props
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [str, onChange, onReset] = useInput(value ?? '');
  const isClearable = useMemo(() => !!(str && clearable), [str, clearable]);

  const handleClear = useCallback(() => {
    onReset();
    inputRef.current?.focus();
  }, [onReset]);

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
      <S.ClearButton active={isClearable} onClick={handleClear}>
        <Icon type="BsXCircle" />
      </S.ClearButton>
      {searchable && (
        <button onClick={() => onSearch?.(str)}>
          <Icon type="BsSearch" />
        </button>
      )}
    </S.Wrapper>
  );
};

export default TextField;
