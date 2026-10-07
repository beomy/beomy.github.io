/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler 활성화(자동 메모이제이션). React 19 + babel-plugin-react-compiler 필요.
  reactCompiler: true,
  // GitHub Pages(정적 배포)를 위한 정적 export
  output: 'export',
  // export 에는 이미지 최적화 서버가 없어 next/image 는 쓰지 않는다(unoptimized).
  // 대신 `yarn build` 가 next-image-export-optimizer CLI 를 이어서 실행해 public/assets/img 를
  // 아래 폭(deviceSizes)의 webp 로 변환하고, 코드는 src/lib/optimizedImage.ts 가 같은 규칙으로
  // <img srcset> 을 만든다. 폭 목록을 바꾸면 그 파일의 IMAGE_WIDTHS 도 함께 바꿀 것.
  images: {
    unoptimized: true,
    imageSizes: [],
    deviceSizes: [640, 1080, 1920],
  },
  // next-image-export-optimizer CLI 옵션 (CLI 가 이 파일을 읽어 간다)
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/assets/img',
    nextImageExportOptimizer_generateAndUseBlurImages: 'false',
  },
  // 슬러그 URL이 항상 끝에 슬래시를 갖도록(기존 Gatsby 동작과 동일)
  trailingSlash: true,
  // 소스로 노출되는 워크스페이스 패키지를 트랜스파일
  transpilePackages: ['@beomy/design-system-tailwind', '@beomy/utils'],
  // next dev 가 AGENTS.md/CLAUDE.md 를 자동 생성하지 않도록 비활성화
  agentRules: false,
};

export default nextConfig;
