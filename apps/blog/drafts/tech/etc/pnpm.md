---
layout: post
title: '[ETC] PNPM'
featured-img: etc/pnpm.png
category: [tech, etc]
summary:
---

패키지 매니저로 NPM, Yarn, PNPM 등이 있습니다. 그 중 PNPM은 Performant Node Package Manager 약자로 고성능 노드 패키지 매니저라는 뜻을 가지고 있습니다. [Turborepo는 PNPM 사용을 권장](https://turbo.build/repo/docs/getting-started/create-new)하는 등 다른 서비스에서도 PNPM의 성능을 인정하고 있습니다.

## PNPM는 정말 빠른가?
아래 표는 가장 유명한 3개의 패키지인 [NPM, Yarn, PNPM을 비교](https://pnpm.io/benchmarks)한 표입니다.

## PNPM 컨샙
PNPM이 어떻게 `node_modules`를 구성하는지 이해하면 PNPM이 왜 고성능이라고 자랑하는지 이해할 수 있습니다.

### 디스크 공간 절약

> ##### Hard Link와 Symbolic(Soft) Link, inode
> - Symbolic(Soft) Link:
> - Hard Link:
> - inode:

### 설치 속도 향상

### 플랫 하지 않은 `node_modules`
- 유령 종속성 해결

## PNPM CLI
- 패키지 설치 & 삭제

##### 참고
- [https://jeonghwan-kim.github.io/2023/10/20/pnpm](https://jeonghwan-kim.github.io/2023/10/20/pnpm)
- [https://pnpm.io/](https://pnpm.io/)
- [http://www.metalpen.net/blog/?p=439](http://www.metalpen.net/blog/?p=439)
