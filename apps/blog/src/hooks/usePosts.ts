import { useMemo } from 'react';
import type { AllMarkdownRemark } from '@/model/graphQL';
import type { Post } from '@/model/post';

type UsePostsHook = (allMarkdownRemark: AllMarkdownRemark) => Post[];

const usePosts: UsePostsHook = (allMarkdownRemark) => {
  return useMemo(
    () =>
      allMarkdownRemark &&
      allMarkdownRemark.edges.map((post) => ({
        title: post.node.frontmatter?.title,
        thumbnail: post.node.frontmatter?.thumbnail,
        createdDate: post.node.fields?.createdDate,
        timeToRead: post.node.timeToRead,
        url: post.node.fields?.slug,
        summary: post.node.frontmatter?.summary ?? post.node.excerpt,
        category: post.node.frontmatter?.category,
        html: post.node.html,
      })),
    [allMarkdownRemark],
  );
};

export default usePosts;
