import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, PageProps } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { Disqus } from 'gatsby-plugin-disqus';
import styled from '@emotion/styled';
import type { Data, MarkdownRemark } from '@/model/graphQL';
import {
  Seo,
  Header,
  Contents,
  PostContents,
  PostHeader,
  TableOfContents,
  PostNavigator,
  Footer,
  PostShare,
} from '@/organisms';
import { usePost, useBeomyTheme } from '@/hooks';

type Context = {
  previous: MarkdownRemark;
  next: MarkdownRemark;
  slug: string;
};

const StyledPostMainContents = styled.div`
  width: calc(100% - 360px);
  ${({ theme }) => theme.sizes.mediaQueries.sm} {
    width: 100%;
  }
`;

const StyledPostSubContents = styled.div`
  margin-top: 40px;
  margin-left: 60px;
  flex: 0 0 300px;
  width: 300px;
  ${({ theme }) => theme.sizes.mediaQueries.sm} {
    display: none;
  }
  > div {
    position: fixed;
    width: inherit;
    fieldset {
      + fieldset {
        margin-top: 10px;
      }
    }
  }
`;

const Post = ({ data, pageContext }: PageProps<Data, Context>) => {
  const [theme] = useBeomyTheme();
  const post = usePost(data.markdownRemark);
  const previous = usePost(pageContext.previous);
  const next = usePost(pageContext.next);
  const url = `${data.site.siteMetadata.siteUrl}${pageContext.slug}`;
  const disqusConfig = {
    url,
    identifier: url,
    title: post.title,
  };

  return (
    <Fragment>
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
      <Helmet>
        <link
          rel="stylesheet"
          href={
            theme === 'dark'
              ? 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css'
              : 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css'
          }
        />
      </Helmet>
      <Header />
      <Contents
        display="flex"
        lineHeight={2}
        width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m']}
      >
        <StyledPostMainContents>
          <PostHeader {...post} />
          <PostContents html={post.html} />
          <PostNavigator previous={previous} next={next} />
          <Disqus config={disqusConfig} />
        </StyledPostMainContents>
        <StyledPostSubContents>
          <div>
            <PostShare url={url} />
            <TableOfContents toc={post.tableOfContents} />
          </div>
        </StyledPostSubContents>
      </Contents>
      <Footer />
    </Fragment>
  );
};

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
