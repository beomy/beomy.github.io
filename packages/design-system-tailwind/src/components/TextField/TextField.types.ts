import type { HTMLAttributes } from 'react';

export type TextFieldProps = {
  /** input 태그의 type 속성 */
  type?: string;
  /** border 를 가지는 TextField */
  border?: boolean;
  /** input 태그의 value 속성 */
  value?: string;
  /** input 태그의 placeholder 속성 */
  placeholder?: string;
  /** 입력 값 초기화 flag */
  clearable?: boolean;
  /** 검색 아이콘 표시 flag */
  searchable?: boolean;
  /** 돋보기 아이콘 클릭 시 호출되는 이벤트 핸들러 */
  onSearch?: (text: string) => void;
  /** 사용자 입력값 변경 시 호출되는 이벤트 핸들러 */
  onChange?: (text: string) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;
