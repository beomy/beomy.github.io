'use client';

import { useEffect, useRef, useState } from 'react';
import type { PostBannerImgProps } from './PostBannerImg.types';

const FALLBACK_IMG = 'https://dummyimage.com/2000x1000/000/fff.png';

const PostBannerImg = ({ img }: PostBannerImgProps) => {
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
  const src = !img || failed ? FALLBACK_IMG : `/assets/images/${img}`;

  // 레이아웃은 소비처(PostCard/PostHeader)에서 `.post-banner-img` 로 제어한다.
  return (
    <img
      ref={ref}
      className="post-banner-img"
      src={src}
      alt="포스트 배너"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

export default PostBannerImg;
