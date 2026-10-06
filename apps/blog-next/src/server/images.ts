import fs from 'node:fs';
import path from 'node:path';
import { imageSize } from 'image-size';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export type ImageDimensions = { width: number; height: number };

const cache = new Map<string, ImageDimensions | undefined>();

/**
 * public/ 기준 절대 URL(`/assets/img/...`)의 원본 크기를 빌드 시 읽는다.
 * <img width height> 를 채워 이미지가 로드되기 전에 영역을 확보하기 위한 것(CLS 방지).
 * 파일이 없거나 읽을 수 없으면 undefined. 서버 전용(fs) — 클라이언트 컴포넌트에서 import 하지 말 것.
 */
export const getImageDimensions = (
  src: string,
): ImageDimensions | undefined => {
  if (cache.has(src)) return cache.get(src);
  let result: ImageDimensions | undefined;
  try {
    const { width, height } = imageSize(
      fs.readFileSync(path.join(PUBLIC_DIR, decodeURI(src))),
    );
    if (width && height) result = { width, height };
  } catch {
    result = undefined;
  }
  cache.set(src, result);
  return result;
};
