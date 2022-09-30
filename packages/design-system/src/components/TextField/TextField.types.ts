import type { TypographyProps } from 'styled-system';

export type TextFieldProps = {
  /** input 태그의 type 속성 */
  type?: string;

  /** border을 가지는 TextField */
  border?: boolean;

  /** input 태그의 value 속성 */
  value?: string;

  /** input 태그의 placeholder 속성 */
  placeholder?: string;

  /** 입력 값 초기화 flag */
  clearable?: boolean;

  /** 입력 값 초기화 flag */
  searchable?: boolean;

  /** 돋보기 아이콘 클릭시 호출되는 이벤트 핸들러 */
  onSearch?: (text: string) => void;

  /** 사용자 입력값 변경시 호출되는 이벤트 핸들러 */
  onChange?: (text: string) => void;
} & Pick<TypographyProps, 'fontSize'>;

export type ClearButtonProps = {
  active: boolean;
} & Pick<TypographyProps, 'fontSize'>;
