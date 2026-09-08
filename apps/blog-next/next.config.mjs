import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const gatsbyShimAbsolute = path.resolve(__dirname, 'src/lib/gatsby-shim.tsx');
// Turbopack 의 resolveAlias 는 프로젝트 루트 기준 상대경로를 사용한다.
const gatsbyShimRelative = './src/lib/gatsby-shim.tsx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages(정적 배포)를 위한 정적 export
  output: 'export',
  // export 시 next/image 최적화 서버가 없으므로 unoptimized 처리
  images: {
    unoptimized: true,
  },
  // 슬러그 URL이 항상 끝에 슬래시를 갖도록(기존 Gatsby 동작과 동일)
  trailingSlash: true,
  // 소스로 노출되는 워크스페이스 패키지를 트랜스파일
  transpilePackages: ['@beomy/design-system', '@beomy/utils'],
  compiler: {
    emotion: true,
  },
  // next dev 가 AGENTS.md/CLAUDE.md 를 자동 생성하지 않도록 비활성화
  agentRules: false,
  // 공유 패키지(@beomy/design-system)가 'gatsby'의 Link를 직접 import 하므로
  // Next 환경에서는 next/link 기반 shim으로 대체한다.
  // Next 16 기본 번들러(Turbopack)와 webpack 양쪽 모두에 alias를 등록한다.
  turbopack: {
    resolveAlias: {
      gatsby: gatsbyShimRelative,
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      gatsby$: gatsbyShimAbsolute,
    };
    return config;
  },
};

export default nextConfig;
