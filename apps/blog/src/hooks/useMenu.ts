import { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import type { Data } from '@/model/graphQL';
import type { TreeItem } from '@/model/tree';
import { arrayToTree } from '@/utils/tree';
import usePosts from './usePosts';

type UseMenuType = () => TreeItem[];

const useMenu: UseMenuType = () => {
  const { allMarkdownRemark } = useStaticQuery<Data>(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                category
              }
            }
          }
        }
      }
    `,
  );
  const posts = usePosts(allMarkdownRemark);
  const menuArray = useMemo(
    () => posts.map((x) => x.category ?? []).filter((x) => !!x),
    [posts],
  );
  return useMemo(() => arrayToTree(menuArray), [menuArray]);
};

export default useMenu;
