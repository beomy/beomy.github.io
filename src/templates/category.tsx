import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { ThemeProvider } from '@emotion/react';
import theme from '@/assets/themes/default';
import { IData } from '@/model/GraphQL';
import { Seo, Header, Contents, PostList, SubMenu, Footer } from '@/organisms';
import { useMenu, usePosts } from '@/hooks/post';

interface IContext {
  slug: string;
}

function Category({ data, pageContext, path }: PageProps<IData, IContext>) {
  const posts = usePosts(data.allMarkdownRemark);
  const menuTree = useMenu();
  const firstDepth = path
    .split('/')
    .filter((x) => !!x)
    .shift();
  const subMenu = menuTree.find((x) => x.key === firstDepth)?.children ?? [];

  return (
    <ThemeProvider theme={theme}>
      <Seo title={pageContext.slug} path={pageContext.slug} />
      <Header />
      <Contents
        width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m', 'screen.lg']}
      >
        <SubMenu firstDepth={firstDepth} subMenu={subMenu} />
        <PostList posts={posts} />
      </Contents>
      <Footer />
    </ThemeProvider>
  );
}

export const query = graphql`
  query ($slug: [String]) {
    allMarkdownRemark(
      filter: { fields: { category: { in: $slug } } }
      sort: { order: DESC, fields: fields___createdDate }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            thumbnail: featured_img
            summary
            title
            category
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
export default Category;
