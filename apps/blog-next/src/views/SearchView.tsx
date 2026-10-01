'use client';

import { useSearchParams } from 'next/navigation';
import { PostList } from '@/components/post-list';
import ListLayout from '@/layouts/ListLayout';
import type { Post } from '@/models/post';

const SearchView = ({ posts }: { posts: Post[] }) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') ?? '';
  const upper = keyword.toLocaleUpperCase();

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLocaleUpperCase().includes(upper) ||
      post.summary?.toLocaleUpperCase().includes(upper) ||
      !!post.category?.find((x) => x.toLocaleUpperCase() === upper),
  );

  return (
    <ListLayout>
      {filteredPosts.length ? (
        <h2 className="my-[50px] text-center">
          &quot;<span>{keyword}</span>&quot;에 대해 총{' '}
          <span>{filteredPosts.length}</span>건이 검색되었습니다.
        </h2>
      ) : (
        <h2 className="my-[50px] text-center">
          &quot;<span>{keyword}</span>&quot;에 대한 검색 결과가 없습니다.
        </h2>
      )}
      <PostList posts={filteredPosts} />
    </ListLayout>
  );
};

export default SearchView;
