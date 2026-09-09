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
  transpilePackages: ['@beomy/design-system-tailwind', '@beomy/utils'],
  // next dev 가 AGENTS.md/CLAUDE.md 를 자동 생성하지 않도록 비활성화
  agentRules: false,
};

export default nextConfig;
