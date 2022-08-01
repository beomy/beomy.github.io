import { useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useInput } from '@/hooks';
import { Input, Button } from '@/atoms';
import type { DecoInputProps } from './DecoInput.types';
import * as S from './DecoInput.styles';

const DecoInput = ({
  type,
  placeholder,
  value,
  clearable = true,
  searchable = true,
  onSearch,
  ...props
}: DecoInputProps) => {
  const [str, onChange, onReset] = useInput(value ?? '');
  const isClearable = useMemo(() => !!(str && clearable), [str, clearable]);

  return (
    <S.Wrapper {...props}>
      <Input
        type={type}
        value={str}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={(e) => e.key === 'Enter' && onSearch?.(str)}
      />
      <S.Clear active={isClearable} onClick={() => onReset()}>
        <FiX size={props.fontSize as number | string} />
      </S.Clear>
      {searchable && (
        <Button onClick={() => onSearch?.(str)}>
          <FiSearch size={props.fontSize as number | string} />
        </Button>
      )}
    </S.Wrapper>
  );
};

export default DecoInput;
