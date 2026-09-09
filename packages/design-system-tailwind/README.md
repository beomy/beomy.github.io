# @beomy/design-system-tailwind

Beomy 블로그의 디자인 시스템입니다. **Tailwind CSS v4 (CSS-first) + CVA** 기반이며,
기존 `@beomy/design-system`(emotion + styled-system)의 Tailwind 버전입니다.

Next.js(App Router) 소비를 전제로 하며, 소스로 직접 트랜스파일되어 사용됩니다
(`transpilePackages`).

## 구성

- `.` — 컴포넌트: `Anchor`, `FieldSet`, `Icon`, `IconButton`, `IconText`, `Message`, `Portal`, `TextField`, `cn`
- `./icons` — `react-icons/bs` 재노출 + 커스텀 `BmKakaotalk`
- `./models` — 공용 타입(`StyledProps`)
- `./lib` — `cn` (clsx + tailwind-merge)
- `./styles.css` — 토큰 + 기본 스타일 번들
- `./theme.css` — 디자인 토큰(색상/폰트/z-index/애니메이션)만
- `./base.css` — 전역 기본 스타일(구 `BaseStyles` 컴포넌트 대체)

## 앱에서 사용하기 (Next.js)

### 1. next.config

```js
// next.config.mjs
const nextConfig = {
  transpilePackages: ['@beomy/design-system-tailwind', '@beomy/utils'],
};
```

### 2. 전역 CSS

```css
/* app/globals.css */
@import 'tailwindcss';
@import '@beomy/design-system-tailwind/styles.css';

/* 패키지 소스의 Tailwind 클래스를 스캔하도록 등록 */
@source '../../node_modules/@beomy/design-system-tailwind/src';
```

`app/layout.tsx` 등에서 `globals.css` 를 import 합니다.

### 3. 다크 모드

최상위 요소에 `data-theme="dark"` 또는 `.dark` 클래스를 부여하면 grey 스케일과
시맨틱 색(`background`/`title`/`body`/`caption`)이 다크로 전환됩니다.

```tsx
<html data-theme={theme === 'dark' ? 'dark' : undefined}>
```

## 토큰 → 유틸리티 매핑

| 토큰 | Tailwind 유틸리티 예시 |
| --- | --- |
| `colors.grey[90]` | `bg-grey-90`, `border-grey-90`, `text-grey-90` |
| `colors.background` | `bg-background` |
| `colors.title` / `body` / `caption` | `text-title` / `text-body` / `text-caption` |
| `colors.blue[50]` 등 색상 스케일 | `text-blue-50`, `bg-red-50` … |
| `fontSizes[2]` (1rem) | `text-2` (인덱스 0~7) |
| `keyframes.spinIn` | `animate-spin-in` |

> 참고: 구버전의 max-width 미디어쿼리(`mediaQueries.xs` = `max-width: 767px`)는
> 필요 시 임의 변형(`max-[767px]:...`)으로 대체합니다.
