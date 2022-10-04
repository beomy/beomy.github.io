import { Fragment, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, PageProps } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { Disqus } from 'gatsby-plugin-disqus';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconButton, IconButtonStyles } from '@beomy/design-system';
import type { Data, MarkdownRemark } from '@/model/graphQL';
import { Dim } from '@/atoms';
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

const StyledPostMain = styled.div`
  width: calc(100% - 360px);
  ${({ theme }) => theme.sizes.mediaQueries.sm} {
    width: 100%;
  }
`;

const StyledPostSub = styled.div<{ active: boolean }>`
  margin-top: 40px;
  margin-left: 60px;
  ${({ theme }) => theme.sizes.mediaQueries.sm} {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    margin: 0;
    padding: 0;
    > * {
      transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
        box-shadow 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
    ${({ active }) =>
      active &&
      css`
        z-index: 9;
        width: 100%;
      `}
  }
`;

export const StyledPostSubContents = styled.div<{ active: boolean }>`
  position: fixed;
  width: 320px;
  box-sizing: border-box;
  fieldset {
    + fieldset {
      margin-top: 10px;
    }
  }
  > ${IconButtonStyles.Wrapper} {
    display: none;
  }
  ${({ theme }) => theme.sizes.mediaQueries.sm} {
    right: 0;
    height: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    transform: ${({ active }) =>
      active ? 'translateX(0%)' : 'translateX(100%)'};
    > ${IconButtonStyles.Wrapper} {
      display: inline-flex;
      background-color: ${({ theme }) => theme.colors.background};
      position: absolute;
      left: -50px;
      bottom: 20px;
      transform: ${({ active }) => (active ? 'rotate(0deg)' : 'rotate(45deg)')};
    }
  }
`;

const Post = ({ data, pageContext }: PageProps<Data, Context>) => {
  const [isActive, setActive] = useState<boolean>(false);
  const [theme] = useBeomyTheme();
  const post = usePost(data.markdownRemark);
  const previous = usePost(pageContext.previous);
  const next = usePost(pageContext.next);

  const handleClickCloseSub = useCallback(() => {
    setActive((value) => !value);
  }, []);

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
        <StyledPostMain>
          <PostHeader {...post} />
          <PostContents html={post.html} />
          <PostNavigator previous={previous} next={next} />
          <Disqus config={disqusConfig} />
        </StyledPostMain>
        <StyledPostSub active={isActive}>
          <Dim active={isActive} onClick={handleClickCloseSub} />
          <StyledPostSubContents active={isActive}>
            <PostShare url={url} />
            <TableOfContents
              toc={post.tableOfContents}
              onClick={handleClickCloseSub}
            />
            <IconButton icon="BsXLg" border onClick={handleClickCloseSub} />
          </StyledPostSubContents>
        </StyledPostSub>
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
