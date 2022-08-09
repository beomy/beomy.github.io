import type { LiProps } from './Li.types';
import * as S from './Li.styles';

const Li = ({ children, ...props }: LiProps) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default Li;
