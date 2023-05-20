import { Fragment, useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, PageProps } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import { Disqus } from 'gatsby-plugin-disqus';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconButton, IconButtonStyles } from '@beomy/design-system';
import type { Data, MarkdownRemark } from '@/models/graphQL';
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
import { usePost, useTheme } from '@/hooks';

type Context = {
  previous: MarkdownRemark;
  next: MarkdownRemark;
  slug: string;
};

const S = {
  PostMain: styled.div`
    width: calc(100% - 380px);
    ${({ theme }) => theme.sizes.mediaQueries.sm} {
      width: 100%;
    }
  `,
  PostSub: styled.aside<{ active: boolean }>`
    width: 380px;
    height: 100%;
    ${({ theme }) => theme.sizes.mediaQueries.sm} {
      position: fixed;
      top: 0;
      right: 0;
      width: 0;
      z-index: ${({ theme }) => theme.zIndices.overlay};
      > * {
        transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
          opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
          box-shadow 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      }
      ${({ active }) =>
        active &&
        css`
          width: 100%;
        `}
    }
  `,
  PostSubContents: styled.div<{ active: boolean }>`
    position: fixed;
    width: 340px;
    padding: 10px;
    margin-left: 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    top: 70px;
    height: calc(100% - 70px);
    fieldset {
      + fieldset {
        margin-top: 10px;
      }
    }
    > ${IconButtonStyles.Wrapper} {
      display: none;
    }
    ${({ theme }) => theme.sizes.mediaQueries.sm} {
      top: 0;
      right: 0;
      height: 100%;
      max-width: calc(100% - 60px);
      margin: 0;
      background-color: ${({ theme }) => theme.colors.background};
      transform: ${({ active }) =>
        active ? 'translateX(0%)' : 'translateX(100%)'};
      > ${IconButtonStyles.Wrapper} {
        display: inline-flex;
        background-color: ${({ theme }) => theme.colors.background};
        position: absolute;
        left: -50px;
        bottom: 20px;
        transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        transform: ${({ active }) =>
          active ? 'rotate(0deg)' : 'rotate(45deg)'};
      }
    }
  `,
};

const Post = ({ data, pageContext }: PageProps<Data, Context>) => {
  const [isActive, setActive] = useState<boolean>(false);
  const [theme] = useTheme();
  const post = usePost(data.markdownRemark);
  const previous = usePost(pageContext.previous);
  const next = usePost(pageContext.next);

  const handleClickCloseSub = useCallback(() => {
    setActive((value) => !value);
  }, []);

  const prismUrl = useMemo(() => {
    return theme === 'dark'
      ? 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css'
      : 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css';
  }, [theme]);

  const url = useMemo(
    () => `${data.site.siteMetadata.siteUrl}${pageContext.slug}`,
    [data.site.siteMetadata.siteUrl, pageContext.slug],
  );

  const disqusConfig = useMemo(
    () => ({
      url,
      identifier: url,
      title: post.title,
    }),
    [post.title, url],
  );

  return (
    <Fragment>
      <Seo
        title={post.title}
        description={post.summary}
        path={pageContext.slug}
        type="article"
        image={getSrc(data.file?.childImageSharp.gatsbyImageData)}
        meta={[
          {
            property: 'article:published_time',
            content: `${post.createdDate}T00:00:00+00:00`,
          },
        ]}
      />
      <Helmet>
        <link rel="stylesheet" href={prismUrl} />
      </Helmet>
      <Header />
      <Contents
        display="flex"
        flexDirection="row-reverse"
        lineHeight={2}
        width={['screen.xs', 'screen.xs', 'screen.sm', 'screen.m']}
      >
        <S.PostSub active={isActive}>
          <Dim active={isActive} onClick={() => setActive(false)} />
          <S.PostSubContents active={isActive}>
            <PostShare url={url} />
            <TableOfContents
              toc={post.tableOfContents}
              onClick={() => setActive(false)}
            />
            <IconButton
              icon="BsXLg"
              aria-label="toc"
              border
              onClick={handleClickCloseSub}
            />
          </S.PostSubContents>
        </S.PostSub>
        <S.PostMain>
          <PostHeader {...post} />
          <PostContents html={post.html} />
          <PostNavigator previous={previous} next={next} />
          <Disqus key={theme} config={disqusConfig} />
        </S.PostMain>
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
      tableOfContents(maxDepth: 3)
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
