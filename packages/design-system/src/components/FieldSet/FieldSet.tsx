import type { FieldSetProps } from './FieldSet.types';
import * as S from './FieldSet.styles';

const FieldSet = ({ title, children, ...props }: FieldSetProps) => {
  return (
    <S.Wrapper title={title} {...props}>
      {title && <S.Legend>{title}</S.Legend>}
      {children}
    </S.Wrapper>
  );
};

export default FieldSet;
