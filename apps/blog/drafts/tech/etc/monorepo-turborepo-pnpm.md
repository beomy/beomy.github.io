---
layout: post
title: '[ETC] Monorepo - Turborepo + PNPM'
featured-img: etc/monorepo.png
category: [tech, etc]
summary:
---

## Turborepo 성능

### 캐싱
`package.json`의 `scripts` 필드에 저장 된 `build`, `lint`와 같은 스크립트를 Turborepo는 테스크라고 이야기합니다. Turborepo는 테스크의 결과와 로그를 캐싱하여 성능을 향상 시킵니다.
- input 값을 평가하여 hash해 둔다

#### Cache Hit/Miss

#### 캐시 설정
- 캐시를 사용하지 않으려면: `--no-cache`, `--force`, `pipeline.<task>.cache`

### 멀티테스킹

### Remote 캐싱

## Turborepo 시작하기

### PNPM 설치
- turborepo는 pnpm 사용을 추천한다.
  - https://turbo.build/repo/docs/getting-started/create-new
  - `npm install -g pnpm`

### Turborepo 템플릿
- `pnpm dlx create-turbo@latest`: 여러가지 예제가 있음

## Turborepo CLI

##### 참고
- [https://turbo.build/repo/docs](https://turbo.build/repo/docs)

---

## PNPM 설치
- turborepo는 pnpm 사용을 추천한다.
  - https://turbo.build/repo/docs/getting-started/create-new
  - `npm install -g pnpm`

## 퀵스타트
- `pnpm dlx create-turbo@latest`: 여러가지 예제가 있음

## 주요 콘셉트

### Task 캐싱
- input 값을 평가하여 hash해 둔다
- 캐시를 사용하지 않으려면: `--no-cache`, `--force`, `pipeline.<task>.cache`
- cache hit/miss:

### Remote 캐싱

##### 참고
- [https://turbo.build/repo/docs](https://turbo.build/repo/docs)
