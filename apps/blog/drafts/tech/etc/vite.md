---
layout: post
title: '[ETC] Vite'
featured-img: etc/monorepo.png
category: [tech, etc]
summary:
---

- vite가 개선하려고 한 것
  - 느린 서버 시작, 느린 업데이트
- esbuild + rollup: 개발할 때는 esbuild 배포할 때는 rollup
  - rolldown으로 변경 예정
- 빌드할 때는 번들함
  - 코드 중복 등 청크가 더 효율적임
- 사전 번들링
- 브라우저 지원 현황
  - Native ES Modules, Native ESM Dynamic Import, `import.meta`를 지원하는 브라우저를 타겟으로 함
  - build.targer으로 커스텀할 수 있으나 최소 버전은 ES2015
  - Chrome >=87
  - Firefox >=78
  - Safari >=14
  - Edge >=88
- vite awesome plugin
  - @vitejs/plugin-legacy

- https://vitejs.dev/guide/env-and-mode.html

##### 참고
- [https://vitejs.dev/](https://vitejs.dev/)
- [https://medium.com/@hw731911/vite-monorepo-이해하기-part1-pre-bundling-cab3c769d781](https://medium.com/@hw731911/vite-monorepo-이해하기-part1-pre-bundling-cab3c769d781)
