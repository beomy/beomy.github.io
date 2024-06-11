---
layout: post
title: '[ETC] Monorepo - Turborepo + PNPM'
featured-img: etc/monorepo.png
category: [tech, etc]
summary:
---

2024년 6월 4일 Turborepo 2.0 출시

## Turborepo 성능

### 캐싱
`package.json`의 `scripts` 필드에 저장 된 `build`, `lint`와 같은 스크립트를 Turborepo는 테스크라고 이야기합니다. Turborepo는 테스크의 결과와 로그를 캐싱하여 성능을 향상 시킵니다.

- input 값을 평가하여 hash해 둔다

#### Cache Hit/Miss

#### 캐시 설정
- 캐시를 사용하지 않으려면
  - `--no-cache`
  - `--force`
  - `pipeline.<task>.cache`

### Remote 캐싱

### 멀티테스킹

## Turborepo 시작하기

### PNPM 설치
- turborepo는 pnpm 사용을 추천한다.
  - https://turbo.build/repo/docs/getting-started/create-new

### Turborepo 설치
- 전역 설치
- 저장소 설치
- 개인적으로는 저장소 설치 선호

### Turborepo 템플릿
- `pnpm dlx create-turbo@latest`
- 여러가지 예제가 있음
  - pnpm dlx create-turbo@latest --example [example-name]
  - https://turbo.build/repo/docs/getting-started/installation#start-with-an-example

## Monorepo

## Turborepo CLI

## Turborepo 설정

##### 참고
- [https://turbo.build/repo/docs](https://turbo.build/repo/docs)
- [https://turbo.build/blog/turbo-2-0](https://turbo.build/blog/turbo-2-0)
