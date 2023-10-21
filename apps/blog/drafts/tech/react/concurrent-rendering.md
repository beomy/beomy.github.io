---
layout: post
title: '[React] Concurrent Rendering - 동시성 렌더링'
featured-img: react/react.png
category: [tech, react]
summary: React 18에서 추가된 기능 중 가장 중요한 것이 동시성입니다. 동시성은 렌더링 성능을 개선하고 사용자 경험을 향상시켰습니다. 이번 포스트에서는 동시성이 무엇인지 그리고 동시성을 위해 추가된 useTransition와 useDeferredValue 훅과 startTransition 함수를 살펴보도록 하겠습니다.
---

React 18에서 추가된 기능 중 가장 중요한 것이 동시성입니다. 동시성은 렌더링 성능을 개선하고 사용자 경험을 향상시켰습니다. 이번 포스트에서는 동시성이 무엇인지 그리고 동시성을 위해 추가된 `useTransition`와 `useDeferredValue` 훅과 `startTransition` 함수를 살펴보도록 하겠습니다.

## 동시성(Concurrent)이란
동시성이란 둘 이상의 작업을 여러 조각으로 나누어 Context Switch를 통해 번갈아가며 실행하여 동시에 여러개의 작업이 실행되는 것처럼 보이게 하는 것을 말합니다.

> ##### 동시성(Concurrency)과 병렬성(Parallelism)
> 동시성과 병렬성은 동시에 둘 이상의 작업을 처리하는 방법이라는 공통점이 있지만 동작하는 방식에 차이가 있습니다.
>
> - **동시성**: 하나의 코어에서 둘 이상의 작업을 여러 코드 조각으로 나누어 Context Switch를 통해 여러개의 작업이 동시에 처리되는 것처럼 보이게 하는 것을 말합니다.
> - **병렬성**: 여러개의 코어에서 각각의 작업을 담당하여 처리하는 것을 말합니다. 각각의 코어에서 작업이 동시에 처리됩니다.
>
> ![동시성과 병렬성](/assets/img/posts/react/concurrent_parallelism.png)

React 18 이전에서는 렌더링을 쪼갤 수 없는 하나의 작업이였습니다. 그래서 렌더링이 시작되면 렌더링을 멈출 방법이 없었고 렌더링이 오래 걸린다면 다음에 수행해야 하는 작업들이 진행을 하지 못하면서 애플리케이션이 버벅이는 현상이 발생하였습니다. React 18에서는 이런 문제를 급한 작업과 덜 급한 작업으로 렌더링을 나눠는 동시성 렌더링으로 개선하였습니다.

아래 그림을 보면 검색창에서

~~급한 작업 덜 급한 작업 이미지~~

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
- [https://deview.kr/data/deview/session/attach/1_Inside%20React%20(동시성을%20구현하는%20기술).pdf](https://deview.kr/data/deview/session/attach/1_Inside%20React%20(동시성을%20구현하는%20기술).pdf)
