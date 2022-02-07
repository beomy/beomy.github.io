import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { Disqus } from 'gatsby-plugin-disqus';
import { ThemeProvider } from '@emotion/react';
import theme from '@/assets/themes/default';
import { IData, IMarkdownRemark } from '@/model/GraphQL';
import {
  Seo,
  Header,
  Contents,
  PostContents,
  PostHeader,
  TableOfContents,
  PostWrapper,
  PostNavigator,
  Footer,
} from '@/organisms';
import { usePost } from '@/hooks/post';

interface IContext {
  previous: IMarkdownRemark;
  next: IMarkdownRemark;
  slug: string;
}

function Post({ data, pageContext }: PageProps<IData, IContext>) {
  const post = usePost(data.markdownRemark);
  const previous = usePost(pageContext.previous);
  const next = usePost(pageContext.next);
  const disqusConfig = {
    url: `${data.site.siteMetadata.siteUrl}${pageContext.slug}`,
    identifier: `${data.site.siteMetadata.siteUrl}${pageContext.slug}`,
    title: post.title,
  };

  return (
    <ThemeProvider theme={theme}>
      <Seo
        title={post.title}
        description={post.summary}
        path={pageContext.slug}
        type="article"
        image={getSrc(data.file.childImageSharp.gatsbyImageData)}
        meta={[
          {
            property: 'article:published_time',
            content: `${post.createdDate}T00:00:00+00:00`,
          },
        ]}
      />
      <Header />
      <Contents
        display="flex"
        lineHeight={2}
        width={['screen.0', 'screen.0', 'screen.1', 'screen.2']}
      >
        <PostWrapper width={['100%', '100%', 'calc(100% - 360px)']}>
          <PostHeader {...post} />
          <PostContents html={post.html} />
          <PostNavigator previous={previous} next={next} />
          <Disqus config={disqusConfig} />
        </PostWrapper>
        <TableOfContents
          toc={post.tableOfContents}
          ml="60px"
          mt="90px"
          flex="0 0 300px"
          width="300px"
        />
      </Contents>
      <Footer />
    </ThemeProvider>
  );
}

export const query = graphql`
  query ($slug: String!, $image: [String]) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    file(relativePath: { in: $image }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents(maxDepth: 2)
      timeToRead
      excerpt
      frontmatter {
        title
        thumbnail: featured_img
        summary
      }
      fields {
        createdDate(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
export default Post;
