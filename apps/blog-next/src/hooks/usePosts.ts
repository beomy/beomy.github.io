import { useMemo } from 'react';
import type { AllMarkdownRemark } from '@/models/graphQL';
import type { Post } from '@/models/post';

type UsePostsType = (allMarkdownRemark: AllMarkdownRemark) => Post[];

const usePosts: UsePostsType = (allMarkdownRemark) => {
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
