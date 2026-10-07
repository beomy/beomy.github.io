import PostCard from './PostCard';
import type { Post } from '@/models/post';

export type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="flex flex-wrap">
      {posts.map((post, index) => (
        // 첫 카드만 LCP 후보로 먼저 받는다. 모바일(1열)에서는 나머지가 화면 밖인데도 eager 로 받으면
        // 느린 회선에서 첫 썸네일과 대역폭을 나눠 써 LCP 가 늦어진다 (Lighthouse 측정으로 확인)
        <PostCard key={post.url} {...post} priority={index === 0} />
      ))}
    </div>
  );
};

export default PostList;
