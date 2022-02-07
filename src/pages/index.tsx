import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { IData } from '@/model/GraphQL';
import { PostList, Seo } from '@/organisms';
import List from '@/templates/list';
import { usePosts } from '@/hooks/post';

function Home({ data }: PageProps<IData>) {
  const posts = usePosts(data.allMarkdownRemark);

  return (
    <List>
      <Seo title="Home" path="/" />
      <PostList posts={posts} />
    </List>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: fields___createdDate }) {
      edges {
        node {
          excerpt
          frontmatter {
            thumbnail: featured_img
            summary
            title
          }
          timeToRead
          fields {
            createdDate(formatString: "YYYY-MM-DD")
            slug
          }
        }
      }
    }
  }
`;
export default Home;
