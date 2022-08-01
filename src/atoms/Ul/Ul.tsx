import type { UlProps } from './Ul.types';
import * as S from './Ul.styles';

const Ul = ({ children, ...props }: UlProps) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default Ul;
