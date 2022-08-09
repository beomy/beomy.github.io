import { H4Props } from './H4.types';
import * as S from './H4.styles';

const H4 = ({ children, ...props }: H4Props) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default H4;
