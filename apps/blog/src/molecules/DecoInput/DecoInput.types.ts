import { TypographyProps } from 'styled-system';

export type DecoInputProps = {
  type: string;
  value: string;
  placeholder?: string;
  clearable?: boolean;
  searchable?: boolean;
  onSearch?: (text: string) => void;
} & TypographyProps;

export type ClearButtonProps = {
  active: boolean;
};
