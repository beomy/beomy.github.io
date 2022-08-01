import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { PostNavigatorProps } from './PostNavigator.types';
import * as S from './PostNavigator.styles';

const PostNavigator = ({ previous, next }: PostNavigatorProps) => {
  return (
    <S.Wrapper>
      <S.BtnWrapper>
        {previous && (
          <S.BtnLink to={previous.url} textAlign="left">
            <S.Icon>
              <FiChevronLeft size="100%" />
            </S.Icon>
            <S.Contents ml="15px" mr="auto">
              <div>이전 포스트</div>
              <div>{previous.title}</div>
            </S.Contents>
          </S.BtnLink>
        )}
      </S.BtnWrapper>
      <S.BtnWrapper>
        {next && (
          <S.BtnLink to={next.url} textAlign="right">
            <S.Contents ml="auto" mr="15px">
              <div>다음 포스트</div>
              <div>{next.title}</div>
            </S.Contents>
            <S.Icon>
              <FiChevronRight size="100%" />
            </S.Icon>
          </S.BtnLink>
        )}
      </S.BtnWrapper>
    </S.Wrapper>
  );
};

export default PostNavigator;
