'use client';

import { useMemo } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from '@/hooks';

export type PostCommentsProps = {
  /** Disqus identifier. 기존 Gatsby 포스트와 동일해야 댓글 스레드가 보존된다. */
  url: string;
  title: string;
};

/** Disqus 댓글. 테마가 바뀌면 key 를 바꿔 Disqus 가 색상을 다시 그리게 한다. */
const PostComments = ({ url, title }: PostCommentsProps) => {
  const [theme] = useTheme();
  const config = useMemo(() => ({ url, identifier: url, title }), [url, title]);

  return <DiscussionEmbed key={theme} shortname="beomy" config={config} />;
};

export default PostComments;
