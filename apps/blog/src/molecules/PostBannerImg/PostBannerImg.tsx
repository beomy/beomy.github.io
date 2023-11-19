import { StaticImage } from 'gatsby-plugin-image';
import type { PostBannerImgProps } from './PostBannerImg.types';

const PostBannerImg = ({ img }: PostBannerImgProps) => {
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
    'etc/monorepo.png': (
      <StaticImage
        src="../../assets/images/etc/monorepo.png"
        alt="포스트 배너"
      />
    ),
    'etc/package_json.png': (
      <StaticImage
        src="../../assets/images/etc/package_json.png"
        alt="포스트 배너"
      />
    ),
    'etc/yarn_berry.png': (
      <StaticImage
        src="../../assets/images/etc/yarn_berry.png"
        alt="포스트 배너"
      />
    ),
    'react/react.png': (
      <StaticImage
        src="../../assets/images/react/react.png"
        alt="포스트 배너"
      />
    ),
    'react/tanstack-query.png': (
      <StaticImage
        src="../../assets/images/react/tanstack-query.png"
        alt="포스트 배너"
      />
    ),
    'react/tanstack-query-v5.png': (
      <StaticImage
        src="../../assets/images/react/tanstack-query-v5.png"
        alt="포스트 배너"
      />
    ),
    'react/react-hook-form.png': (
      <StaticImage
        src="../../assets/images/react/react-hook-form.png"
        alt="포스트 배너"
      />
    ),
    'review/start-up-blog-writing.png': (
      <StaticImage
        src="../../assets/images/review/start-up-blog-writing.png"
        alt="포스트 배너"
      />
    ),
  };
  return (
    imgComponents[img as keyof typeof imgComponents] ?? (
      <StaticImage
        src="https://dummyimage.com/2000x1000/000/fff.png"
        alt="포스트 배너"
      />
    )
  );
};

export default PostBannerImg;
