import type { Post } from '@/models/post';

export type PostNavigatorProps = {
  previous: Post;
  next: Post;
};
