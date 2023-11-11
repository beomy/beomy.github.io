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

아래 코드와 같이 Suspense를 사용하게 되는데, `RenderComponent`에서 `Promise`를 `throw`하게 되면 `Suspense` 컴포넌트의 `fallback` prop이 화면에 출력되게 됩니다.

```tsx
<Suspense fallback={<Loading />}>
  <RenderComponent />
</Suspense>
```

## Suspense 적용하기
Client Side Rendering으로 개발하다보면 네트워크를 통해 데이터를 가져올 경우 데이터를 응답 받는 딜레이 때문에 아래 그림과 같이 화면이 덜그럭 거리는 현상을 자주 접하게 됩니다.

~~Suspense 전과 후~~

- React.lazy: 무조건 Suspense 도는 듯
- tanstack query
- 커스텀 사용법
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

##### 참고
- [https://react.dev/reference/react/Suspense](https://react.dev/reference/react/Suspense)
- [https://www.daleseo.com/react-suspense/](https://www.daleseo.com/react-suspense/)
- [https://velog.io/@bbaa3218/React-Suspense란](https://velog.io/@bbaa3218/React-Suspense란)
- [https://velog.io/@rkio/React-Suspense에-대하여](https://velog.io/@rkio/React-Suspense에-대하여)
- [https://byseop.com/post/@b6b6d8b1-e3ed-4b5c-84ee-43defc1875b3](https://byseop.com/post/@b6b6d8b1-e3ed-4b5c-84ee-43defc1875b3)
- [https://github.com/reactwg/react-18/discussions/37?source=post_page-----557a7d3ecd45--------------------------------](https://github.com/reactwg/react-18/discussions/37?source=post_page-----557a7d3ecd45--------------------------------)
- [https://maxkim-j.github.io/posts/suspense-argibraic-effect/](https://maxkim-j.github.io/posts/suspense-argibraic-effect/)
