import { IPost } from '@/model/post';
import { PostCard } from '@/organisms';
import StyledPostList from './PostList.styled';

interface IProp {
  posts: IPost[];
}

function PostList({ posts }: IProp) {
  return (
    <StyledPostList>
      {posts.map((post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </StyledPostList>
  );
}

export default PostList;
