'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { useTheme } from '@/hooks';

export type PostCommentsProps = {
  /** Disqus identifier. 기존 Gatsby 포스트와 동일해야 댓글 스레드가 보존된다. */
  url: string;
  title: string;
};

/**
 * Disqus 댓글. 테마가 바뀌면 key 를 바꿔 Disqus 가 색상을 다시 그리게 한다.
 *
 * 댓글 영역이 화면 근처에 올 때까지 Disqus 를 로드하지 않는다. Disqus 는 광고·추적 스크립트까지
 * 포스트 페이지 요청의 60% 이상(수 MB)을 차지해 초기 로딩을 무겁게 하는데, 본문을 다 읽기 전에는
 * 필요 없다. (Lighthouse 의 서드파티 요청·HTTP 리소스 지적도 모두 Disqus 에서 나온다)
 */
const PostComments = ({ url, title }: PostCommentsProps) => {
  const { theme } = useTheme();
  const config = useMemo(() => ({ url, identifier: url, title }), [url, title]);

  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldLoad) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      // 댓글 영역이 뷰포트 아래 600px 안에 들어오면 미리 로드
      { rootMargin: '600px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={ref} className="min-h-[200px]">
      {shouldLoad && (
        <DiscussionEmbed key={theme} shortname="beomy" config={config} />
      )}
    </div>
  );
};

export default PostComments;
