import type { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { useState, useCallback } from 'react';

type UseInputHook = (
  initValue: string,
) => [
  string,
  ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  () => void,
  Dispatch<SetStateAction<string>>,
];

const useInput: UseInputHook = (initValue = '') => {
  const [value, setValue] = useState<string>(initValue);
  const onChange = useCallback((e: any) => setValue(e.target.value), []);
  const onReset = useCallback(() => setValue(initValue), [initValue]);

  return [value, onChange, onReset, setValue];
};

export default useInput;
