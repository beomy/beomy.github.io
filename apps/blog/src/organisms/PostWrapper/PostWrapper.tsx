import type { PostWrapperProps } from './PostWrapper.types';
import * as S from './PostWrapper.styles';

const PostWrapper = ({ children, ...props }: PostWrapperProps) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>;
};

export default PostWrapper;
