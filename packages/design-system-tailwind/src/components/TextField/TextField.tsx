import type { TextFieldProps } from './TextField.types';
import { useMemo, useCallback, useRef, useEffect } from 'react';
import { useInput } from '@beomy/utils/react';
import IconButton from '../IconButton';
import { cn } from '../../lib/cn';
import { textFieldVariants } from './TextField.variants';

const TextField = ({
  type,
  placeholder,
  value,
  border,
  clearable = true,
  searchable = true,
  onSearch,
  onChange: propOnChange,
  className,
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
    <div className={cn(textFieldVariants({ border }), className)} {...props}>
      <input
        ref={inputRef}
        type={type}
        value={str}
        placeholder={placeholder}
        className="h-full min-h-[36px] grow"
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(str)}
      />
      <div className="[&_button+button]:ml-[5px]">
        <IconButton
          icon="BsXCircle"
          className={isClearable ? undefined : 'hidden'}
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
      </div>
    </div>
  );
};

export default TextField;
