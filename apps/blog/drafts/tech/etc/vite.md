---
layout: post
title: '[ETC] Vite'
featured-img: etc/vite.png
category: [tech, etc]
summary: 웹 개발을 하다보면 자연스럽게 번들러를 사용하게 됩니다. 지금까지 다양한 번들러가 발표되었습니다. 그 중 Webpack과 Rollup이 가장 유명합니다. 여러 번들러 중 새로운 페러다임으로 접근한 Vite에 대해서 살펴보도록 하겠습니다.
---

웹 개발을 하다보면 자연스럽게 번들러를 사용하게 됩니다. 지금까지 다양한 번들러가 발표되었습니다. 그 중 Webpack과 Rollup이 가장 유명합니다. 여러 번들러 중 새로운 페러다임으로 접근한 Vite에 대해서 살펴보도록 하겠습니다.

## 왜 Vite를 사용해야 할까
제가 라이브러리를 선택할 때 보는 중요한 3가지는 `얼마나 대중적인가`, `얼마나 좋은 성능을 보이는가`, 그리고 개발 할 때 `얼마나 편리한가`를 생각하며 라이브러리를 선택합니다. 이 3가지 측면에서 Vite를 살펴보려고 합니다.

### Vite의 대중성
라이브러르리르 선택할 때 중요한 두가지는 얼마나 대중적인 라이브러리인가,

### Vite의 성능
- 성능 개선: 느린 서버 시작과 느린 업데이트
  - 기존 번들러와 Native ESM의 차이

### Vite의 편의성

## Vite의 단점은 무엇인가

### 개발/빌드 결과물의 차이
- esbuild + rollup: 개발할 때는 esbuild 배포할 때는 rollup
  - rolldown으로 변경 예정
- 빌드할 때는 번들함
  - 코드 중복 등 청크가 더 효율적임

### 레거시 브라우저 지원
- 브라우저 지원 현황
  - Native ES Modules, Native ESM Dynamic Import, `import.meta`를 지원하는 브라우저를 타겟으로 함
  - build.target으로 커스텀할 수 있으나 최소 버전은 ES2015
  - Chrome >= 87
  - Firefox >= 78
  - Safari >= 14
  - Edge >= 88

## Vite 플러그인
- vite awesome plugin
  - @vitejs/plugin-legacy
  - checker

---
- vite가 개선하려고 한 것
  - 느린 서버 시작
  - 느린 업데이트
- esbuild + rollup: 개발할 때는 esbuild 배포할 때는 rollup
  - rolldown으로 변경 예정
- 빌드할 때는 번들함
  - 코드 중복 등 청크가 더 효율적임
- 사전 번들링
- 브라우저 지원 현황
  - Native ES Modules, Native ESM Dynamic Import, `import.meta`를 지원하는 브라우저를 타겟으로 함
  - build.target으로 커스텀할 수 있으나 최소 버전은 ES2015
  - Chrome >= 87
  - Firefox >= 78
  - Safari >= 14
  - Edge >= 88
- vite awesome plugin
  - @vitejs/plugin-legacy
  - checker
- vite를 사용하면서 발생한 트러블 슈팅
  - node heap 부족
  - iphone에서 import... (미해결)
  - 각종 dynamic 에러들... (미해결)
---

##### 참고
- [https://vitejs.dev/](https://vitejs.dev/)
- [https://2024.stateofjs.com/en-US/libraries/build_tools/](https://2024.stateofjs.com/en-US/libraries/build_tools/)
- [https://medium.com/@hw731911/vite-monorepo-이해하기-part1-pre-bundling-cab3c769d781](https://medium.com/@hw731911/vite-monorepo-이해하기-part1-pre-bundling-cab3c769d781)
