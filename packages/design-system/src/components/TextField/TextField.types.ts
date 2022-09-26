import { TypographyProps } from 'styled-system';

export type InputProps = {
  /** input 태그의 type 속성 */
  type: string;

  /** input 태그의 value 속성 */
  value: string;

  /** input 태그의 placeholder 속성 */
  placeholder?: string;

  /** 입력 값 초기화 flag */
  clearable?: boolean;

  /** 입력 값 초기화 flag */
  searchable?: boolean;
  onSearch?: (text: string) => void;
} & Pick<TypographyProps, 'fontSize'>;

export type ClearButtonProps = {
  active: boolean;
} & Pick<TypographyProps, 'fontSize'>;
