import type { FieldsetHTMLAttributes, ReactNode } from 'react';

export type FieldSetProps = {
  children: ReactNode;
  /** fieldset 의 legend 에 표시될 문자열 */
  title?: string;
} & Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'title'>;
