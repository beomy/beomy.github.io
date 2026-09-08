import type { ContentsProps } from './Contents.types';
import * as S from './Contents.styles';

const Contents = ({ children, ...props }: ContentsProps) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default Contents;
