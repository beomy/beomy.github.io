import { Header, Contents, Footer } from '@/components/layout';
import {
  PostComments,
  PostContents,
  PostHeader,
  PostNavigator,
  PostSidebar,
} from '@/components/post';
import { siteMetadata } from '@/lib/metadata';
import type { Post } from '@/models/post';

type PostViewProps = {
  post: Post;
  previous: Post | null;
  next: Post | null;
  slug: string;
};

/**
 * 포스트 상세. 서버 컴포넌트로 두고 상호작용이 있는 사이드바(PostSidebar)와
 * 댓글(PostComments)만 클라이언트 경계로 분리해 본문 HTML 이 클라이언트 번들에 실리지 않게 한다.
 */
const PostView = ({ post, previous, next, slug }: PostViewProps) => {
  // 기존 Gatsby 포스트와 동일한 Disqus identifier 유지 (댓글 스레드 보존)
  const url = `${siteMetadata.siteUrl}${slug}`;

  return (
    <>
      <Header />
      <Contents className="flex flex-row-reverse leading-[2] screen-xs sm:screen-sm m:screen-m">
        <PostSidebar url={url} toc={post.tableOfContents} />
        <article className="w-[calc(100%-380px)] max-sm:w-full">
          <PostHeader {...post} />
          <PostContents html={post.html} />
          <PostNavigator previous={previous} next={next} />
          <PostComments url={url} title={post.title} />
        </article>
      </Contents>
      <Footer />
    </>
  );
};

export default PostView;
