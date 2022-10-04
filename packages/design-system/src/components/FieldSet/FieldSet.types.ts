import type { ReactNode } from 'react';

export type FieldSetProps = {
  /** fieldset의 legend에 표시될 문자열 */
  title?: string;
  children: ReactNode;
};
