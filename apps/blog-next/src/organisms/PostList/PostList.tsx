import { PostCard } from '@/organisms';
import type { PostListProps } from './PostList.types';
import * as S from './PostList.styles';

const PostList = ({ posts }: PostListProps) => {
  return (
    <S.Wrapper>
      {posts.map((post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </S.Wrapper>
  );
};

export default PostList;
