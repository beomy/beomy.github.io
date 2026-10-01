import PostCard from './PostCard';
import type { Post } from '@/models/post';

export type PostListProps = {
  posts: Post[];
};

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
