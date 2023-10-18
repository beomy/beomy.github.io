---
layout: post
title: '[React] Concurrent Rendering - 동시성 렌더링'
featured-img: react/react.png
category: [tech, react]
summary: React 18에서 추가된 기능 중 가장 중요한 것이 동시성입니다. 동시성은 렌더링 성능을 개선하고 사용자 경험을 향상시켰습니다. 이번 포스트에서는 동시성이 무엇인지 그리고 동시성을 위해 추가된 useTransition와 useDeferredValue 훅과 startTransition 함수를 살펴보도록 하겠습니다.
---

React 18에서 추가된 기능 중 가장 중요한 것이 동시성입니다. 동시성은 렌더링 성능을 개선하고 사용자 경험을 향상시켰습니다. 이번 포스트에서는 동시성이 무엇인지 그리고 동시성을 위해 추가된 `useTransition`와 `useDeferredValue` 훅과 `startTransition` 함수를 살펴보도록 하겠습니다.

## 동시성(Concurrent)이란
동시성(Concurrent)이란 둘 이상의 작업을 여러 조각으로 쪼개여 Context Switch를 통해 번갈아가며 실행하여 동시에 여러개의 작업이 실행되는 것처럼 만드는 것을 이야기합니다.

React 18 이전에서는 렌더링을 쪼갤 수 없는

> ##### 동시성과 병렬성

## startTransition

## useTransition

## useDeferredValue

## 부록

### debounce

### throttle

##### 참고
- [https://yeonyeon.tistory.com/270](https://yeonyeon.tistory.com/270)
- [https://velog.io/@ktthee/React-18-에-추가된-useDeferredValue-를-써-보자](https://velog.io/@ktthee/React-18-에-추가된-useDeferredValue-를-써-보자)
- [https://doiler.tistory.com/83](https://doiler.tistory.com/83)
- [https://www.freecodecamp.org/korean/news/riaegteu-18yi-singineung-dongsiseong-rendeoring-concurrent-rendering-jadong-ilgwal-ceori-automatic-batching-deung/](https://www.freecodecamp.org/korean/news/riaegteu-18yi-singineung-dongsiseong-rendeoring-concurrent-rendering-jadong-ilgwal-ceori-automatic-batching-deung/)
- [https://velog.io/@heelieben/React-18-Concurrent-Rendering](https://velog.io/@heelieben/React-18-Concurrent-Rendering)
- [https://kyledev.tistory.com/161](https://kyledev.tistory.com/161)
- [https://tecoble.techcourse.co.kr/post/2023-07-09-concurrent_rendering/](https://tecoble.techcourse.co.kr/post/2023-07-09-concurrent_rendering/)
