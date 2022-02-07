import { IMarkdownRemark, IAllMarkdownRemark, IData } from '@/model/GraphQL';
import { IPost } from '@/model/Post';
import { graphql, useStaticQuery } from 'gatsby';
import { arrayToTree } from '@/utils/tree';

export function usePost(markdownRemark: IMarkdownRemark): IPost {
  return (
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
    }
  );
}

export function usePosts(allMarkdownRemark: IAllMarkdownRemark): IPost[] {
  return (
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
    }))
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
  const menuArray = posts.map((x) => x.category).filter((x) => !!x);
  return arrayToTree(menuArray);
}
