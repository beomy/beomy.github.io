'use client';

import { useSearchParams } from 'next/navigation';
import PostList from './PostList';
import type { Post } from '@/models/post';

export type SearchResultsProps = {
  posts: Post[];
};

/**
 * 검색어(?keyword=)로 포스트를 걸러 보여준다.
 * useSearchParams 때문에 클라이언트여야 하므로 SearchView 에서 이 부분만 분리했다.
 * (정적 export 에서는 상위에 Suspense 가 필요하다)
 */
const SearchResults = ({ posts }: SearchResultsProps) => {
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
    <>
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
    </>
  );
};

export default SearchResults;
