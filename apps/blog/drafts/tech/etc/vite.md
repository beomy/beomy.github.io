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
[2024 State Of JS](https://2024.stateofjs.com/en-US/libraries/build_tools/)를 살펴보면, Vite를 사용해본 사용자가 78%로 86%인 Webpack을 빠른 속도로 추격해 왔습니다. Webpack에 비교하면 등장한지는 얼마 되지 않았으나 많은 사람들의 선택을 받아 이미 Webpack에 버금 가는 사용자를 가지고 있습니다. 이미 많은 사용자들이 Vite를 사용하기 때문에 Vite에 대한 정보 부족 걱정 없이 Vite를 선택하셔도 좋을 것 같습니다.

### Vite의 성능
브라우저에서 ES Module을 지원하기 전까지 번들러는 자바스크립트를 모듈화 방식으로 개발 할 수 있게 해주었습니다. 번들러는 모듈로 개발된 자바스크립트 파일들을 브라우저가 처리할 수 있도록 파일을 연결하는 번들링 과정을 거쳐야 했습니다. 하지만 요즘은 대규모 프로젝트가 많아졌고, 확인해야 할 자바스크립트 파일이 많아 질 수록 Webpack과 같은 전통적인 번들러는 번들링 과정에 많은 시간이 들게 되었습니다.

#### 느린 서버 구동
번들러에서 개발 서버를 구동할 때는 아래 그림과 같이 모든 코드를 확인하고 번들링이 마친 후에야 서버 구동이 되었습니다.

~~그림~~

이런 느린 서버 구동은 Vite에서 아래 그림과 같이 최신 브라우저에서 지원하는 Native ESM을 사용하여 개선하였습니다.

~~그림~~

Vite는 브라우저에게 번들러 작업을 일부 맡기는 방법으로 성능을 개선했습니다. 브라우저에서 요청하는 대로 소스코드를 제공되기 때문에 거의 즉시 개발 서버를 구동할 수 있게 됩니다.

#### 느린 업데이트

- 성능 개선: 느린 서버 시작과 느린 업데이트
  - 기존 번들러와 Native ESM의 차이

### Vite의 편의성

## Vite의 단점은 무엇인가

### 개발/빌드 결과물의 차이
- esbuild + rollup: 개발할 때는 esbuild 배포할 때는 rollup
  - rolldown으로 변경 예정
- 빌드할 때는 번들함
  - 코드 중복 등 청크가 더 효율적임

### 브라우저 지원
- Native ES Modules, Native ESM Dynamic Import, `import.meta`를 지원하는 브라우저를 타겟으로 함
  - Chrome >= 87
  - Firefox >= 78
  - Safari >= 14
  - Edge >= 88
- `build.target`으로 커스텀할 수 있으나 최소 버전은 ES2015

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
