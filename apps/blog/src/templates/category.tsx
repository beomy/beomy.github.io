import { graphql, PageProps } from 'gatsby';
import { ThemeProvider } from '@emotion/react';
import type { Data } from '@/model/graphQL';
import theme from '@/assets/themes/default';
import { Seo, Header, Contents, PostList, SubMenu, Footer } from '@/organisms';
import { useMenu, usePosts } from '@/hooks';

type Context = {
  slug: string;
};

const Category = ({ data, pageContext, path }: PageProps<Data, Context>) => {
  const posts = usePosts(data.allMarkdownRemark);
  const menuTree = useMenu();
  const firstDepth = path
    .split('/')
    .filter((x) => !!x)
    .shift();
  const subMenu = menuTree.find((x) => x.key === firstDepth) ?? {
    key: '',
    counter: 0,
    children: [],
  };

  return (
    <ThemeProvider theme={theme}>
      <Seo title={pageContext.slug} path={pageContext.slug} />
      <Header />
      <Contents
        width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m', 'screen.lg']}
      >
        <SubMenu menu={subMenu} />
        <PostList posts={posts} />
      </Contents>
      <Footer />
    </ThemeProvider>
  );
};

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