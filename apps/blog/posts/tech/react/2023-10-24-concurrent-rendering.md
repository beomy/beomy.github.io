---
layout: post
title: '[React] Concurrent Rendering - 동시성 렌더링'
featured-img: react/react.png
category: [tech, react]
summary: React 18에서 추가된 기능 중 가장 중요한 것이 사용자 경험을 향상할 수 있는 동시성 렌더링입니다. 이번 포스트에서는 동시성이 무엇인지 그리고 동시성을 위해 추가된 startTransition 함수와 useTransition, useDeferredValue 훅을 살펴보도록 하겠습니다.
---

> ##### TL;DR
> - 동시성 렌더링: 렌더링을 긴급한 업데이트, 전환 업데이트로 나눠 긴급한 업데이트부터 진행함
>   - 전환 업데이트 중 긴급한 업데이트가 들어오면 전환 업데이트를 중단하고 긴급한 업데이트 우선 진행함
>   - 동시성 렌더링은 계산속도를 개선한 것이 아니라 우선순위를 지정하여 긴급한 업데이트를 우선 진행해 UI 차단을 최소화시킨 것
> - `startTransition` 함수: `startTransition`로 감싸진 set 함수는 전환 업데이트로 처리됨
> - `useTransition` 훅: `startTransition` 함수와 `isPending`을 반환하는 훅으로, 지연 중일 경우 `isPending`는 `true`가 됨
> - `useDeferredValue` 훅: `startTransition` 함수를 사용하지 못하는 경우, 즉 set 함수에 접근할 수 없거나 props를 지연하고 싶을 경우 사용되는 훅으로, 반환 값으로 화면이 업데이트될 때 지연처리 됨

React 18에서 추가된 기능 중 가장 중요한 것이 사용자 경험을 향상할 수 있는 동시성 렌더링입니다. 이번 포스트에서는 동시성이 무엇인지 그리고 동시성을 위해 추가된 `startTransition` 함수와 `useTransition`, `useDeferredValue` 훅을 살펴보도록 하겠습니다.

## 동시성(Concurrency)과 병렬성(Parallelism)
동시성과 병렬성은 동시에 둘 이상의 작업을 처리하는 방법이라는 공통점이 있지만 동작하는 방식에 차이가 있습니다.

- **동시성**: 하나의 코어에서 둘 이상의 작업을 여러 조각으로 나누어 Context Switch를 통해 번갈아가며 실행하여 여러 개의 작업이 동시에 처리되는 것처럼 보이게 하는 것을 말합니다.
- **병렬성**: 여러 개의 코어에서 각각의 작업을 담당하여 처리하는 것을 말합니다.

![동시성과 병렬성](/assets/img/posts/react/concurrent_parallelism.png)

## 긴급한 업데이트(Urgent updates)와 전환 업데이트(Transition updates)
React 18 이전에서는 렌더링을 쪼갤 수 없는 하나의 작업이었습니다. 그래서 렌더링이 시작되면 렌더링을 멈출 방법이 없었고 렌더링이 오래 걸린다면 다음에 수행해야 하는 작업들이 진행을 하지 못하면서 애플리케이션이 버벅거리는 현상이 발생했습니다. React 18에서는 동시성 렌더링을 사용하여 급한 작업과 덜 급한 작업으로 나눠, 급한 작업을 우선 화면에 렌더링 하는 방법으로 사용성 개선을 했습니다.

아래 그림은 구글 메인 페이지에서 검색어를 입력할 경우 노출되는 화면입니다. 사용자의 입력을 받는 input 컴포넌트와 검색 결과를 나타내는 목록 컴포넌트로 나눌 수 있습니다.

![긴급한 업데이트와 전환 업데이트](/assets/img/posts/react/search_box.png)

사용자의 입력을 받는 input 컴포넌트는 버벅거림 없이 즉시 사용자에게 노출되어야 하지만, 검색 결과를 나타내는 목록 컴포넌트는 즉시 검색 결과를 노출하지 않아도 됩니다. 따라서 input 컴포넌트의 업데이트는 급한 작업, 긴급한 업데이트(urgent updates)로 목록 컴포넌트의 업데이트는 덜 급한 작업, 전환 업데이트(transition updates)로 나눌 수 있습니다.

## React 18에서 동시성 렌더링
아래 코드는 동시성 렌더링을 사용하지 않은 코드입니다. 검색어를 입력하면 많은 검색 결과를 화면에 노출하기 때문에 화면이 버벅거리는 것을 확인할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/no-concurrent-rendering-xzd8dj?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="no concurrent rendering"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

React 18에서 추가된 동시성 렌더링을 사용하면 위의 예제처럼 버벅거리는 증상을 개선할 수 있습니다. 동시성 렌더링을 위해 추가된 `startTransition` 함수와 `useTransition`, `useDeferredValue` 훅을 살펴보도록 하겠습니다.

### `startTransition` 함수
```ts
startTransition(scope)
```

- `scope: () => void`: `scope` 함수 내부에서는 1개 이상의 set 함수(`useState`의 반환 값 중 set 함수)가 호출되어야 합니다. `scope` 함수는 즉시 실행되며, 내부에서 호출한 상태 업데이트들은 모두 전환 업데이트로 처리됩니다.

전환 업데이트 중에 긴급한 업데이트가 들어오면 전환 업데이트는 중단되고 긴급한 업데이트를 먼저 처리하여 UI를 차단하지 않습니다. 아래 코드와 같이 `startTransition` 함수를 사용할 수 있습니다.

```tsx
import { startTransition } from 'react';

// 긴급한 업데이트 : 입력하고 있는 값
setInputValue(input);

// startTransition으로 래핑된 업데이트는 긴급하지 않은 것으로 처리되고, 더 긴급한 업데이트가 들어오면 중단된다.
startTransition(() => {
  // 전환 업데이트: 입력값에 따른 쿼리값
  setSearchQuery(input);
});
```

`startTransition` 함수를 사용하면 위의 예제에서 버벅거리던 화면을 아래 예제와 같이 개선할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/starttransition-wg55nq?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="startTransition"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useTransition` 훅
```ts
const [isPending, startTransition] = useTransition()
```

- `isPending: boolean`: 지연 중인 전환이 있는지 여부를 알려주는 플래그입니다.
- `startTransition`: 상태 업데이트를 전환 업데이트로 처리하는 함수입니다. 위에서 살펴본 `startTransition` 함수와 동일합니다.

`useTransition` 훅은 지연 중인지 확인할 수 있는 `isPending` 플레그가 있다는 점을 제외하고 위에서 살펴본 `startTransition` 함수와 동일한 사용성을 가집니다. 아래 코드와 같이 `isPending`를 사용하여 지연 상태를 표시할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/usetransition-nzngqk?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useTransition"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useDeferredValue` 훅
`useDeferredValue` 훅은 `startTransition` 함수와 동일하게 전환 업데이트 처리를 합니다. `useDeferredValue` 훅의 반환 값(`deferredValue`)으로 화면이 업데이트되는 경우에 지연처리 됩니다.

```ts
const deferredValue = useDeferredValue(value)
```

- `value: any`: 지연하려는 값입니다. 모든 타입이 올 수 있습니다.
- `deferredValue: any`: 지연된 값입니다.

`startTransition` 함수를 사용하기 위해서는 set 함수를 사용해야 하는데, set 함수에 접근할 수 없거나 컴포넌트가 전달받은 props를 지연하고 싶을 경우 `useDeferredValue` 훅을 사용할 수 있습니다.

`Object.is` 비교를 통해 현재 화면에 그리고 있는 값과 다른 값을 전달받으면 백그라운드에서 리렌더링을 진행합니다. 백그라운드에서 리렌더링 중에 새로운 값을 전달받으면 진행 중이던 렌더링은 취소되고 처음부터 다시 렌더링 합니다.

`useTransition` 훅과 다르게 지연 중임을 나타내는 값을 반환하지 않는데, 아래 코드와 같은 방법을 사용하여 지연 중임을 알 수 있습니다.

```tsx
const deferredQuery = useDeferredValue(query);
const isStale = query !== deferredQuery; // query와 deferredQuery 값이 다를 경우 지연중임
```

`useDeferredValue` 훅의 사용 방법은 아래 코드와 같습니다.

<div>
  <iframe src="https://codesandbox.io/embed/usedeferredvalue-krfnwm?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useDeferredValue"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

##### 참고
- [https://yeonyeon.tistory.com/270](https://yeonyeon.tistory.com/270)
- [https://velog.io/@ktthee/React-18-에-추가된-useDeferredValue-를-써-보자](https://velog.io/@ktthee/React-18-에-추가된-useDeferredValue-를-써-보자)
- [https://doiler.tistory.com/83](https://doiler.tistory.com/83)
- [https://www.freecodecamp.org/korean/news/riaegteu-18yi-singineung-dongsiseong-rendeoring-concurrent-rendering-jadong-ilgwal-ceori-automatic-batching-deung/](https://www.freecodecamp.org/korean/news/riaegteu-18yi-singineung-dongsiseong-rendeoring-concurrent-rendering-jadong-ilgwal-ceori-automatic-batching-deung/)
- [https://velog.io/@heelieben/React-18-Concurrent-Rendering](https://velog.io/@heelieben/React-18-Concurrent-Rendering)
- [https://kyledev.tistory.com/161](https://kyledev.tistory.com/161)
- [https://tecoble.techcourse.co.kr/post/2023-07-09-concurrent_rendering/](https://tecoble.techcourse.co.kr/post/2023-07-09-concurrent_rendering/)
- [https://deview.kr/data/deview/session/attach/1_Inside%20React%20(동시성을%20구현하는%20기술).pdf](https://deview.kr/data/deview/session/attach/1_Inside%20React%20(동시성을%20구현하는%20기술).pdf)
- [https://yrnana.dev/post/2022-04-12-react-18/](https://yrnana.dev/post/2022-04-12-react-18/)
- [https://react.dev/reference/react/startTransition](https://react.dev/reference/react/startTransition)
- [https://react.dev/reference/react/useTransition](https://react.dev/reference/react/useTransition)
- [https://react.dev/reference/react/useDeferredValue](https://react.dev/reference/react/useDeferredValue)
