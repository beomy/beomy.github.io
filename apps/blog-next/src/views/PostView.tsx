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
      <Contents className="leading-[2] screen-xs sm:screen-sm m:screen-m">
        {/* 상단은 본문(좌)·sticky 사이드바(우) 두 열, 댓글은 그 아래 전체 폭.
            댓글을 두 열 밖으로 빼야 사이드바의 sticky 범위가 본문까지로 끝나, 댓글이 화면에 들어오면
            패널이 본문과 함께 위로 빠져나간다. 댓글이 열 안에 있으면 패널이 푸터(125px)에만 밀려 상단이 어중간하게 잘린다.
            댓글과의 간격은 네비게이터 margin 이 아니라 이 블록의 padding 으로 준다. 사이드바는 이 블록 높이만큼 늘어나므로
            margin 으로 주면 사이드바 끝(목차 바닥)이 네비게이터보다 그만큼 아래에 놓여 하단이 어긋난다. */}
        <div className="flex flex-row-reverse pb-[10px]">
          <PostSidebar url={url} toc={post.tableOfContents} />
          <article className="w-[calc(100%-380px)] max-sm:w-full">
            <PostHeader {...post} />
            <PostContents html={post.html} />
            <PostNavigator previous={previous} next={next} />
          </article>
        </div>
        <PostComments url={url} title={post.title} />
      </Contents>
      <Footer />
    </>
  );
};

export default PostView;
