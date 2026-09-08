import type { Post } from '@/models/post';

export type PostNavigatorProps = {
  previous: Post | null;
  next: Post | null;
};
