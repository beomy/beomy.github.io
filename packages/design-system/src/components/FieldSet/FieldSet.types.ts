import type { ReactNode } from 'react';

export type FieldSetProps = {
  children: ReactNode;
  /** fieldset의 legend에 표시될 문자열 */
  title?: string;
};
