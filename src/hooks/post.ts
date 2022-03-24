import { useMemo } from 'react';
import { IMarkdownRemark, IAllMarkdownRemark, IData } from '@/model/graphQL';
import { IPost } from '@/model/post';
import { graphql, useStaticQuery } from 'gatsby';
import { arrayToTree } from '@/utils/tree';

export function usePost(markdownRemark: IMarkdownRemark): IPost {
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
}

export function usePosts(allMarkdownRemark: IAllMarkdownRemark): IPost[] {
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
}

export function useMenu() {
  const { allMarkdownRemark } = useStaticQuery<IData>(
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
    () => posts.map((x) => x.category).filter((x) => !!x),
    [posts],
  );
  return useMemo(() => arrayToTree(menuArray), [menuArray]);
}
