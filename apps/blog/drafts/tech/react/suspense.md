---
layout: post
title: '[React] Suspense'
featured-img: react/react.png
category: [tech, react]
summary: Suspense는 컴포넌트가 화면에 노출하기 위해 필요한 데이터가 아직 준비되지 않았다고 알려주는 기능으로 16.6 버전에서 실험적 기능으로 등장해서 18버전에서 정식 지원을 시작한 기능입니다.
---

Suspense는 컴포넌트가 화면에 노출하기 위해 필요한 데이터가 아직 준비되지 않았다고 알려주는 기능으로 16.6 버전에서 실험적 기능으로 등장해서 18버전에서 정식 지원을 시작한 기능입니다. 이번 포스트에서는 Suspense의 동작 원리와 적용 방법, 주의 사항을 살펴보도록 하겠습니다.

## Suspnse 동작 원리
Suspense도 [[React] Concurrent Rendering - 동시성 렌더링](/tech/react/concurrent-rendering/)에서 이야기한 동시성 렌더링과 결을 같이합니다. 동시성 렌더링은 긴급한 렌더링과 덜 긴급한 렌더링으로 나누어 긴급한 렌더링을 우선 렌더링하고 긴급한 렌더링이 없을 경우 덜 긴급한 렌더링을 진행합니다. Suspense도 동일하게 데이터가 준비되지 않은 컴포넌트의 렌더링을 덜 긴급한 렌더링으로 판단하고 그 외의 렌더링 작업을 우선 진행합니다.

아래 코드와 같이 Suspense를 사용하게 되는데, `SomeComponent` 컴포넌트에서 `Promise`를 `throw`하게 되면 `Suspense` 컴포넌트의 `fallback` prop에 정의한 `Loading` 컴포넌트가 화면에 출력되게 됩니다.

```tsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

## Suspense를 사용하는 이유
Suspense를 적절한 곳에 잘 사용한다면 사용자 경험 향상 뿐만 아니라 개발자 경험도 향상 시킬 수 있습니다. Suspense가 주는 몇가지 이점을 살펴보도록 하겠습니다.

### 데이터 로딩 처리
CSR(Client Side Rendering)로 개발하다보면 네트워크를 통해 데이터를 가져올 경우 데이터를 응답 받을 때까지 걸리는 시간 때문에 아래 그림과 같이 화면이 덜그럭 거리는 현상을 종종 접하게 됩니다.

~~Suspense 전~~

Suspense를 사용하면 데이터를 가져오는 동안에 스켈레톤 UI와 같은 로딩 컴포넌트를 사용자에게 노출하여 아래 그림과 같이 화면이 덜그럭 거리는 어색함을 줄일 수 있습니다.

~~Suspense 후~~

### 선언형 UI의 간결함
Suspense를 사용하지 않아도 아래 코드와 같이 로딩처리가 가능한데, Suspense로 로딩 처리할 때의 장점은 선언형 UI가 주는 간결함입니다.

```tsx
const SomeComponent = () => {
  const { isLoading, data } = fetch('/api/posts') // 데이터를 가져옵니다.

  if (isLoading) {
    return <div>Loading</div>
  }
  return <div>Hello World: {JSON.stringify(data)}</div>
}
```

Suspense를 사용한다면 로딩 처리를 상위 컴포넌트에 맡겨 놓고 자신의 역할에만 충실할 수 있습니다. Suspense를 사용하면 위의 `SomeComponent` 컴포넌트는 아래 코드와 같이 데이터를 가져오고 화면에 출력하는데만 집중할 수 있게 됩니다.

```tsx
const SomeComponent = () => {
  const { data } = fetch('/api/posts') // 데이터를 가져옵니다.

  return <div>Hello World: {JSON.stringify(data)}</div>
}
```

## Suspense 사용하기
Suspense 컴포넌트는 아래 코드와 같이 사용할 수 있습니다. `SearchResults` 컴포넌트는 전달 받은 `query`로 api를 호출하게 됩니다.

```tsx
const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchResults query={query} />
    </Suspense>
  )
}
```

Suspense 컴포넌트를 사용하는 방법을 조금 더 구체적으로 살펴보도록 하겠습니다.

### 여러 컴포넌트에 Suspense 사용하기
Suspense 컴포넌트는 아래 코드와 같이 자식 컴포넌트로 여러 컴포넌트를 전달 받을 수 있습니다.

```tsx
const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchSummary />
      <SearchResults query={query} />
    </Suspense>
  )
}
```

`SearchSummary`, `SearchResults` 컴포넌트의 데이터를 모두 가져온 뒤에 두 컴포넌트가 화면에 노출됩니다. 아래 codesandbox 코드에서 테스트 해 보실 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/children-suspense-qkvph4?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="children suspense"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### 중첩해서 Suspense 사용하기
아래 코드와 같이 중첩하여 Suspense 컴포넌트를 사용할 수도 있습니다. 중첩된 Suspense를 사용하면 컴포넌트 단위로 로딩 UI를 적용할 수 있습니다.

```tsx
const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SearchSummary />
      <Suspense fallback={<Loading />}>
        <SearchResults query={query} />
      </Suspense>
    </Suspense>
  )
}
```

`SearchSummary` 컴포넌트가 먼저 데이터를 가져온다면, `SearchResults` 컴포넌트가 데이터를 가져오는 것을 기다리지 않고 먼저 화면에 노출됩니다. 아래 codesandbox 코드에서 테스트 해 보실 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/multi-suspense-272wyw?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="multi suspense"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### 데이터를 가져오는 동안 이전 데이터 보여주기
게시판에서 다음 페이지를 클릭 할 때마다 로딩 컴포넌트를 노출 시킨다면 사용자들이 어색하게 느낄 수 있습니다. 다음 페이지의 데이터를 가져오는 동안 이전 페이지의 데이터를 유지한다면 이런 어색함을 해결할 수 있습니다.

## Suspense 사용예제

### `React.lazy`
- 무조건 Suspense 도는 듯

### TanStack Query

### 커스텀 사용법
<div>
  <iframe src="https://codesandbox.io/embed/custom-suspense-hnjqvs?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="custom suspense"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## Suspense 사용시 주의사항
- tanstack query suspense: waterfall로 동작함
- concurrent rendering: useTransition, useDeferedValue에는 Suspense가 안돔

## 부록

### ErrorBoundary
- `throw new Error()`: ErrorBoundary로
- `throw new Promise()`: Suspense로

##### 참고
- [https://react.dev/reference/react/Suspense](https://react.dev/reference/react/Suspense)
- [https://www.daleseo.com/react-suspense/](https://www.daleseo.com/react-suspense/)
- [https://velog.io/@bbaa3218/React-Suspense란](https://velog.io/@bbaa3218/React-Suspense란)
- [https://velog.io/@rkio/React-Suspense에-대하여](https://velog.io/@rkio/React-Suspense에-대하여)
- [https://byseop.com/post/@b6b6d8b1-e3ed-4b5c-84ee-43defc1875b3](https://byseop.com/post/@b6b6d8b1-e3ed-4b5c-84ee-43defc1875b3)
- [https://github.com/reactwg/react-18/discussions/37?source=post_page-----557a7d3ecd45--------------------------------](https://github.com/reactwg/react-18/discussions/37?source=post_page-----557a7d3ecd45--------------------------------)
- [https://maxkim-j.github.io/posts/suspense-argibraic-effect/](https://maxkim-j.github.io/posts/suspense-argibraic-effect/)
- [https://syjn99.medium.com/react-suspense란-557a7d3ecd45](https://syjn99.medium.com/react-suspense란-557a7d3ecd45)
