import { Icon } from '@beomy/design-system';
import type { PostNavigatorProps } from './PostNavigator.types';
import * as S from './PostNavigator.styles';

const PostNavigator = ({ previous, next }: PostNavigatorProps) => {
  return (
    <S.Wrapper>
      <S.BtnWrapper>
        {previous && (
          <S.Anchor type="border" to={previous.url}>
            <S.Icon>
              <Icon type="BsChevronLeft" size="100%" />
            </S.Icon>
            <S.Contents ml="20px" mr="auto">
              <small>이전 포스트</small>
              <div>{previous.title}</div>
            </S.Contents>
          </S.Anchor>
        )}
      </S.BtnWrapper>
      <S.BtnWrapper>
        {next && (
          <S.Anchor type="border" to={next.url} textAlign="right">
            <S.Contents ml="auto" mr="20px">
              <small>다음 포스트</small>
              <div>{next.title}</div>
            </S.Contents>
            <S.Icon>
              <Icon type="BsChevronRight" size="100%" />
            </S.Icon>
          </S.Anchor>
        )}
      </S.BtnWrapper>
    </S.Wrapper>
  );
};

export default PostNavigator;
