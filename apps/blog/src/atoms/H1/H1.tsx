import type { H1Props } from './H1.types';
import * as S from './H1.styles';

const H1 = ({ children, ...props }: H1Props) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default H1;
