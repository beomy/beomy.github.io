import type { H2Props } from './H2.types';
import * as S from './H2.styles';

const H2 = ({ children, ...props }: H2Props) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default H2;
