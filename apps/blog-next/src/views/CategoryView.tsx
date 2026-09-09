'use client';

import { Contents, Header, Footer, PostList, SubMenu } from '@/organisms';
import { useMenu } from '@/hooks';
import type { Post } from '@/models/post';
import type { TreeItem } from '@/models/tree';

const EMPTY_MENU: TreeItem = { key: '', counter: 0, children: [] };

const CategoryView = ({ posts, slug }: { posts: Post[]; slug: string }) => {
  const menuTree = useMenu();
  const firstDepth = slug.split('/').filter((x) => !!x)[0];
  const subMenu = menuTree.find((x) => x.key === firstDepth) ?? EMPTY_MENU;

  return (
    <>
      <Header />
      <Contents className="screen-xs sm:screen-sm m:screen-m lg:screen-lg">
        <SubMenu menu={subMenu} />
        <PostList posts={posts} />
      </Contents>
      <Footer />
    </>
  );
};

export default CategoryView;
