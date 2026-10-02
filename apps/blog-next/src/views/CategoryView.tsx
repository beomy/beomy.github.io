import { Contents, Header, Footer } from '@/components/layout';
import { PostList, SubMenu } from '@/components/post-list';
import type { Post } from '@/models/post';
import type { TreeItem } from '@/models/tree';

type CategoryViewProps = {
  posts: Post[];
  /** 이 카테고리의 1depth 메뉴(하위 카테고리 포함). 서버에서 계산해 넘긴다. */
  menu: TreeItem;
};

const CategoryView = ({ posts, menu }: CategoryViewProps) => {
  return (
    <>
      <Header />
      <Contents className="screen-xs sm:screen-sm m:screen-m lg:screen-lg">
        <SubMenu menu={menu} />
        <PostList posts={posts} />
      </Contents>
      <Footer />
    </>
  );
};

export default CategoryView;
