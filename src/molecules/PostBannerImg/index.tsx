import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

interface IProp {
  img: string;
}

function PostBannerImg({ img }: IProp) {
  const imgComponents = {
    'etc/xss_xsrf_banner.png': (
      <StaticImage
        src="../../assets/images/etc/xss_xsrf_banner.png"
        alt="포스트 배너"
      />
    ),
    'etc/HTTP_logo.png': (
      <StaticImage
        src="../../assets/images/etc/HTTP_logo.png"
        alt="포스트 배너"
      />
    ),
    'browser/cookie.png': (
      <StaticImage
        src="../../assets/images/browser/cookie.png"
        alt="포스트 배너"
      />
    ),
    'browser/cors.png': (
      <StaticImage
        src="../../assets/images/browser/cors.png"
        alt="포스트 배너"
      />
    ),
    'browser/browser.png': (
      <StaticImage
        src="../../assets/images/browser/browser.png"
        alt="포스트 배너"
      />
    ),
    'javascript/js.png': (
      <StaticImage
        src="../../assets/images/javascript/js.png"
        alt="포스트 배너"
      />
    ),
    'svelte/svelte.png': (
      <StaticImage
        src="../../assets/images/svelte/svelte.png"
        alt="포스트 배너"
      />
    ),
    'vuejs/vuejs.png': (
      <StaticImage
        src="../../assets/images/vuejs/vuejs.png"
        alt="포스트 배너"
      />
    ),
  };
  return (
    imgComponents[img] ?? (
      <StaticImage
        src="https://dummyimage.com/2000x1000/000/fff.png"
        alt="포스트 배너"
      />
    )
  );
}

export default PostBannerImg;
