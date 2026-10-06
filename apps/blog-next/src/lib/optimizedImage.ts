/*
 * next-image-export-optimizer 가 `yarn build` 뒤에 만들어 두는 webp 변환본의 URL 규칙.
 *
 * CLI 는 public/assets/img 아래 모든 이미지를 next.config 의 deviceSizes 폭으로 변환해
 *   <원본 디렉터리>/nextImageExportOptimizer/<파일명>-opt-<폭>.WEBP
 * 에 저장한다. 이 모듈은 그 규칙대로 <img srcset> 문자열을 만들 뿐 파일을 읽지 않으므로
 * 서버(markdown.ts)와 클라이언트(PostBannerImg) 어디서든 쓸 수 있다.
 * 개발 모드(next dev)에서는 변환본이 없으므로 srcset 을 만들지 않는다(원본 표시).
 */

/** next.config.mjs 의 images.deviceSizes 와 같아야 한다 */
export const IMAGE_WIDTHS = [640, 1080, 1920] as const;

const IMAGE_FOLDER = '/assets/img';
const EXPORT_FOLDER = 'nextImageExportOptimizer';
const OPTIMIZABLE = /\.(png|jpe?g|gif|webp|avif)$/i;

const optimizedUrl = (src: string, width: number): string => {
  const slash = src.lastIndexOf('/');
  const dir = src.slice(0, slash);
  const name = src.slice(slash + 1).replace(/\.[^.]+$/, '');
  return `${dir}/${EXPORT_FOLDER}/${name}-opt-${width}.WEBP`;
};

/**
 * `src` 원본(폭 originalWidth)에 대한 srcset. 변환 대상이 아니거나 개발 모드면 undefined.
 * CLI 는 원본보다 작은 폭들과, 원본 이상인 폭 중 가장 작은 것 하나까지만 생성하므로 같은 규칙으로 고른다.
 */
export const getOptimizedSrcSet = (
  src: string,
  originalWidth: number,
): string | undefined => {
  if (process.env.NODE_ENV !== 'production') return undefined;
  if (!src.startsWith(`${IMAGE_FOLDER}/`) || !OPTIMIZABLE.test(src)) {
    return undefined;
  }
  const smaller = IMAGE_WIDTHS.filter((w) => w < originalWidth);
  const nextLargest = IMAGE_WIDTHS.find((w) => w >= originalWidth);
  const widths = nextLargest ? [...smaller, nextLargest] : [...smaller];
  if (widths.length === 0) return undefined;
  return widths.map((w) => `${optimizedUrl(src, w)} ${w}w`).join(', ');
};
