import type { AProps } from './A.types';
import * as S from './A.styles';

const A = ({ children, href, target = '', ...props }: AProps) => {
  return (
    <S.Wrapper href={href} target={target} {...props}>
      {children}
    </S.Wrapper>
  );
};

export default A;
