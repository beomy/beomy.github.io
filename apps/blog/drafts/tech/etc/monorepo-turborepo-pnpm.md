---
layout: post
title: '[ETC] Monorepo - Turborepo + PNPM'
featured-img: etc/monorepo.png
category: [tech, etc]
summary:
---

## PNPM 설치
- turborepo에서는 pnpm을 사용할 것을 추천한다. https://turbo.build/repo/docs/getting-started/create-new
- `npm install -g pnpm`

## 퀵스타트
- `pnpm dlx create-turbo@latest`: 여러가지 예제가 있음

## 주요 컨샙

### Task 캐싱
- input 값을 평가하여 hash해 둔다
- 캐시를 사용하지 않으려면: `--no-cache`, `--force`, `pipeline.<task>.cache`
- cache hit/miss:

### Remote 캐싱

##### 참고
- [https://turbo.build/repo](https://turbo.build/repo)
- [https://pnpm.io/ko/](https://pnpm.io/ko/)
