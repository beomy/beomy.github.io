'use client';

import { Fragment, useState, useCallback, useMemo } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { IconButton, cn } from '@beomy/design-system-tailwind';
import { Dim } from '@/components/common';
import { Header, Contents, Footer } from '@/components/layout';
import {
  PostContents,
  PostHeader,
  TableOfContents,
  PostNavigator,
  PostShare,
} from '@/components/post';
import { useTheme } from '@/hooks';
import { siteMetadata } from '@/lib/metadata';
import type { Post } from '@/models/post';

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
      <Contents className="flex flex-row-reverse leading-[2] screen-xs sm:screen-sm m:screen-m">
        <nav
          className={cn(
            'h-full w-[380px]',
            'max-sm:fixed max-sm:right-0 max-sm:top-0 max-sm:z-[10] max-sm:w-0',
            'max-sm:[&>*]:transition-all max-sm:[&>*]:duration-300 max-sm:[&>*]:ease-[cubic-bezier(0.78,0.14,0.15,0.86)]',
            isActive && 'max-sm:w-full',
          )}
        >
          <Dim active={isActive} onClick={() => setActive(false)} />
          <div
            className={cn(
              'fixed top-[70px] ml-[40px] box-border flex h-[calc(100%-70px)] w-[340px] flex-col p-[10px]',
              '[&_fieldset+fieldset]:mt-[10px] [&>button]:hidden',
              'max-sm:right-0 max-sm:top-0 max-sm:m-0 max-sm:h-full max-sm:max-w-[calc(100%-60px)] max-sm:bg-background',
              'max-sm:[&>button]:absolute max-sm:[&>button]:bottom-[20px] max-sm:[&>button]:left-[-50px] max-sm:[&>button]:inline-flex max-sm:[&>button]:bg-background max-sm:[&>button]:transition-transform max-sm:[&>button]:duration-300',
              isActive
                ? 'max-sm:translate-x-0 max-sm:[&>button]:rotate-0'
                : 'max-sm:translate-x-full max-sm:[&>button]:rotate-45',
            )}
          >
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
          </div>
        </nav>
        <article className="w-[calc(100%-380px)] max-sm:w-full">
          <PostHeader {...post} />
          <PostContents html={post.html} />
          <PostNavigator previous={previous} next={next} />
          <DiscussionEmbed
            key={theme}
            shortname="beomy"
            config={disqusConfig}
          />
        </article>
      </Contents>
      <Footer />
    </Fragment>
  );
};

export default PostView;
