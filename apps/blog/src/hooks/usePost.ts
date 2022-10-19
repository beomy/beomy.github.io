import { useMemo } from 'react';
import type { MarkdownRemark } from '@/models/graphQL';
import type { Post } from '@/models/post';

type UsePostType = (markdownRemark: MarkdownRemark) => Post;

const usePost: UsePostType = (markdownRemark) => {
  return useMemo(
    () =>
      markdownRemark && {
        title: markdownRemark.frontmatter?.title,
        thumbnail: markdownRemark.frontmatter?.thumbnail,
        createdDate: markdownRemark.fields?.createdDate,
        timeToRead: markdownRemark.timeToRead,
        url: markdownRemark.fields?.slug,
        summary: markdownRemark.frontmatter?.summary ?? markdownRemark.excerpt,
        category: markdownRemark.frontmatter?.category,
        html: markdownRemark.html,
        tableOfContents: markdownRemark.tableOfContents,
      },
    [markdownRemark],
  );
};

export default usePost;
