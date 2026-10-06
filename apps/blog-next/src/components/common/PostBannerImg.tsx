'use client';

import { useEffect, useRef, useState } from 'react';
import { getOptimizedSrcSet } from '@/lib/optimizedImage';

export type PostBannerImgProps = {
  img?: string;
  /**
   * 첫 화면(LCP)에 보이는 썸네일이면 true. lazy 를 끄고 fetchpriority=high 로 먼저 받는다.
   * (lazy 이미지는 브라우저가 후순위로 미뤄 LCP 가 수 초 늦어진다 — Lighthouse 측정 기준 Render Delay 5s+)
   */
  priority?: boolean;
  /** 원본 크기. 알고 있으면 넘겨서 로드 전 영역을 확보한다(CLS 방지) */
  width?: number;
  height?: number;
};

const FALLBACK_IMG = 'https://dummyimage.com/2000x1000/000/fff.png';
/** 썸네일 규격(고정). srcset 폭 선택과 영역 확보에 쓴다 */
const THUMBNAIL_WIDTH = 2000;

const PostBannerImg = ({
  img,
  priority = false,
  width,
  height,
}: PostBannerImgProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // img 가 바뀌면 실패 상태를 새로 계산한다. 하이드레이션 이전에 이미 로드에
    // 실패한 이미지(onError 를 놓친 경우)를 <img> DOM 상태에서 감지해 동기화한다.
    // 이는 외부 시스템(img 로드 상태) → React state 동기화라 effect 내 setState 가 필요하다.
    const el = ref.current;
    setFailed(!!(el && el.complete && el.naturalWidth === 0));
  }, [img]);

  // 이미지가 없거나 로드에 실패하면 fallback 이미지를 표시한다.
  const isFallback = !img || failed;
  const src = isFallback ? FALLBACK_IMG : `/assets/img/thumbnails/${img}`;
  // 프로덕션 빌드에서만 webp 변환본이 존재한다 (개발 모드는 undefined → 원본 표시)
  const srcSet = isFallback
    ? undefined
    : getOptimizedSrcSet(src, THUMBNAIL_WIDTH);

  // 레이아웃은 소비처(PostCard/PostHeader)에서 `.post-banner-img` 로 제어한다.
  return (
    <img
      ref={ref}
      className="post-banner-img"
      src={src}
      // srcset 이 있을 때만 sizes 도 붙인다 (카드는 모바일 화면 폭 / 그 외 최대 약 1000px)
      srcSet={srcSet}
      sizes={srcSet ? '(max-width: 640px) 100vw, 1000px' : undefined}
      alt="포스트 배너"
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
};

export default PostBannerImg;
