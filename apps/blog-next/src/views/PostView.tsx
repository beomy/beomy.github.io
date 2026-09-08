'use client';

import { Fragment, useState, useCallback, useMemo } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconButton, IconButtonStyles } from '@beomy/design-system';
import { Dim } from '@/atoms';
import {
  Header,
  Contents,
  PostContents,
  PostHeader,
  TableOfContents,
  PostNavigator,
  Footer,
  PostShare,
} from '@/organisms';
import { useTheme } from '@/hooks';
import { siteMetadata } from '@/lib/metadata';
import type { Post } from '@/models/post';

const S = {
  PostMain: styled.article`
    width: calc(100% - 380px);
    ${({ theme }) => theme.sizes.mediaQueries.sm} {
      width: 100%;
    }
  `,
  PostSub: styled.nav<{ active: boolean }>`
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

type PostViewProps = {
  post: Post;
  previous: Post | null;
  next: Post | null;
  slug: string;
};

const PostView = ({ post, previous, next, slug }: PostViewProps) => {
  const [isActive, setActive] = useState<boolean>(false);
  const [theme] = useTheme();

  const handleClickCloseSub = useCallback(() => {
    setActive((value) => !value);
  }, []);

  // 기존 Gatsby 포스트와 동일한 Disqus identifier 유지 (댓글 스레드 보존)
  const url = useMemo(() => `${siteMetadata.siteUrl}${slug}`, [slug]);

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
          <DiscussionEmbed key={theme} shortname="beomy" config={disqusConfig} />
        </S.PostMain>
      </Contents>
      <Footer />
    </Fragment>
  );
};

export default PostView;
