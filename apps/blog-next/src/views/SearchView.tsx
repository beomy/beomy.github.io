import { Suspense } from 'react';
import { SearchResults } from '@/components/post-list';
import ListLayout from '@/layouts/ListLayout';
import type { Post } from '@/models/post';

const SearchView = ({ posts }: { posts: Post[] }) => {
  return (
    <ListLayout>
      {/* useSearchParams 를 쓰는 클라이언트 부분만 Suspense 로 감싼다 (정적 export 요구사항) */}
      <Suspense>
        <SearchResults posts={posts} />
      </Suspense>
    </ListLayout>
  );
};

export default SearchView;
