import { PostCard } from '@/organisms';
import type { PostListProps } from './PostList.types';

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-wrap">
      {posts.map((post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </div>
  );
};

export default PostList;
