import type { SpanProps } from './Span.types';
import * as S from './Span.styles';

function Span({ children, ...props }: SpanProps) {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
}

export default Span;
