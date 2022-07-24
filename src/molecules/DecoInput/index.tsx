import { useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import cn from 'classnames';
import { TypographyProps } from 'styled-system';
import { useInput } from '@/hooks/event';
import { Input, Button } from '@/atoms';
import StyledDecoInput from './DecoInput.styled';

interface IProp extends TypographyProps {
  type: string;
  value: string;
  placeholder?: string;
  clearable?: boolean;
  searchable?: boolean;
  onSearch?: (text: string) => void;
}

function DecoInput({
  type,
  placeholder,
  value,
  clearable,
  searchable,
  onSearch,
  ...props
}: IProp) {
  const [str, onChange, onReset] = useInput(value || '');
  const isClearable = useMemo(() => str && clearable, [str, clearable]);

  return (
    <StyledDecoInput {...props}>
      <Input
        type={type}
        value={str}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={(e) => e.key === 'Enter' && onSearch?.(str)}
      />
      <Button
        className={cn('clear', { active: isClearable })}
        onClick={() => onReset()}
      >
        <FiX size={props.fontSize as number | string} />
      </Button>
      {searchable && (
        <Button className="search" onClick={() => onSearch?.(str)}>
          <FiSearch size={props.fontSize as number | string} />
        </Button>
      )}
    </StyledDecoInput>
  );
}

DecoInput.defaultProps = {
  placeholder: '',
  clearable: true,
  searchable: true,
  onSearch: () => {
    // do nothing.
  },
};

export default DecoInput;
