import type { PTypes } from './P.types';
import * as S from './P.styles';

const P = ({ children, ...props }: PTypes) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default P;
