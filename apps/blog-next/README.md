# @beomy/blog-next

기존 Gatsby 기반 블로그(`apps/blog`)를 **Next.js 16 (App Router)** 로 마이그레이션한 프로젝트입니다.
기존과 동일하게 **정적(Static Export)** 으로 빌드되어 GitHub Pages(`blog` 브랜치)로 배포됩니다.

## 실행

```bash
# 개발 서버 (.md 저장 시 HMR 자동 반영)
yarn blog-next dev            # 루트에서
# 또는
yarn workspace @beomy/blog-next dev

# 정적 빌드 (out/ 생성)
yarn blog-next build

# 빌드 결과 미리보기
yarn blog-next serve

# 배포 (out/ 을 blog 브랜치로 push)
yarn blog-next deploy
```

## 기술 스택 변경 요약

| 구분 | Gatsby (기존) | Next (신규) |
| --- | --- | --- |
| 프레임워크 | Gatsby 4 | Next.js 16 (App Router, Turbopack) |
| 렌더링/배포 | `gatsby build` → 정적 | `output: 'export'` → 정적 (`out/`) |
| 데이터 레이어 | GraphQL + gatsby-node | `src/server/posts.ts` (fs + gray-matter) |
| 마크다운 | gatsby-transformer-remark (+플러그인) | `src/server/markdown.ts` (unified/remark/rehype) |
| 코드 하이라이트 | gatsby-remark-prismjs | rehype-prism-plus + Prism 테마 CDN |
| 헤더 앵커 | gatsby-remark-autolink-headers | rehype-slug + rehype-autolink-headings |
| 목차(TOC) | remark 내장 tableOfContents | `markdown.ts` 커스텀 헤딩 수집 |
| 상태관리 | Recoil | **Zustand** (Recoil은 최신 React/Next와 비호환) |
| 스타일 | Emotion (+ gatsby-plugin-emotion) | Emotion + `compiler.emotion` + SSR 레지스트리 |
| SEO | react-helmet | App Router Metadata API (`src/lib/metadata.ts`) |
| 이미지 | gatsby-plugin-image | 정적 `public/` 경로 + `<img>` (export이므로 unoptimized) |
| 댓글 | gatsby-plugin-disqus | disqus-react |
| RSS/사이트맵/robots/manifest | gatsby 플러그인 | `app/rss.xml`, `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` |

## 디렉터리 구조

```
app/                 # App Router (라우팅 + 서버 진입점)
  layout.tsx         # 루트 레이아웃 (기본 메타데이터 + GA + Providers)
  providers.tsx      # 클라이언트 Provider (Emotion/테마/알림)
  emotion.tsx        # Emotion SSR 스타일 추출 레지스트리
  page.tsx           # 홈
  about/ search/     # 정적 페이지
  [...slug]/         # 포스트 + 카테고리 동적 페이지 (generateStaticParams)
  rss.xml/route.ts   # RSS 피드 (force-static)
  sitemap.ts robots.ts manifest.ts
src/
  server/            # 서버(Node) 전용: posts(데이터), markdown(파이프라인), content-watcher/version(HMR)
  lib/               # 서버·클라이언트 공용: metadata, jsonLd
  contexts/          # React context: nav-context (서버가 계산한 메뉴 데이터를 클라이언트로 전달)
  views/             # 각 라우트의 클라이언트 뷰
  layouts/           # List / Default 레이아웃 (기존 templates)
  components/        # UI 컴포넌트 (사용 화면 기준으로 분류, 폴더별 index.ts barrel)
    about/           #   About 페이지
    post/            #   포스트 상세
    post-list/       #   포스트 목록 (홈 · 검색 · 카테고리)
    layout/          #   Header · Footer · Contents · Menu · Notification
    common/          #   두 그룹 이상에서 공유 (Dim, PostBannerImg)
  hooks/ models/ stores/ utils/
posts/               # 마크다운 포스트 (기존과 동일)
public/              # 정적 자산 (기존 static/ + src/assets/images)
```

## 참고 사항

- **의존성 통일(루트 `resolutions`)**: `@types/react`, `@emotion/react`, `@emotion/styled` 를
  단일 버전으로 고정합니다. Emotion 인스턴스가 둘이면 `ThemeProvider` 가 design-system 에
  테마를 전달하지 못해 스타일이 깨집니다.
- **Disqus 스레드 보존**: 포스트 상세의 Disqus identifier 는 기존 Gatsby URL 형식을 그대로 유지합니다.
- **마크다운 HMR**: `.md` 는 모듈 그래프에 없어 Next(Turbopack)가 변경을 감지하지 못한다.
  Next 공식 확장 지점인 `instrumentation.ts` 의 `register()` 가 (개발 모드에서만)
  `src/server/content-watcher.ts` 를 기동하고, 이 워처가 `posts/`·`drafts/` 변경을 감지해
  센티널 모듈(`src/server/content-version.ts`)을 갱신한다. 센티널을 import 하는 `posts.ts` 가
  Fast Refresh 로 재실행되어 저장 즉시 화면에 반영된다. 센티널 값은 항상 `0` 으로 커밋한다
  (개발 중 자동 변경분은 커밋하지 말 것). 별도 wrapper 스크립트 없이 `yarn dev`(= `next dev`)만
  사용한다.
  > Turbopack 은 아직 공개 플러그인 API 가 없고, `import.meta.glob`/`require.context` 같은
  > 폴더 단위 정적 import 도 지원하지 않는다. Contentlayer·Velite·content-collections 등
  > 콘텐츠 라이브러리도 내부적으로 동일한 파일 워처를 돌리므로, 의존성을 늘리는 대신
  > Next 네이티브 훅으로 최소 구현했다.
