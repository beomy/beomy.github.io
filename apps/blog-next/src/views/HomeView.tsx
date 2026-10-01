import { PostList } from '@/components/post-list';
import ListLayout from '@/layouts/ListLayout';
import type { Post } from '@/models/post';

const HomeView = ({ posts }: { posts: Post[] }) => {
  return (
    <ListLayout>
      <PostList posts={posts} />
    </ListLayout>
  );
};

export default HomeView;
