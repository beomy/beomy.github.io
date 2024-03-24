---
layout: post
title: '[React] 알고 쓰자 React - Ref'
featured-img: react/react.png
category: [tech, react]
summary: React에서 DOM에 접근하기 위해 사용되는 것이 ref입니다. ref는 <div ref={divRef}>...</div>와 같이 속성처럼 사용되지만 속성과는 다른 의미를 가지고 있습니다.
---

> ##### TL;DR
> - `useRef`
> - `forwardRef`
> - `useImperativeHandle`

React에서 DOM에 접근하기 위해 사용되는 것이 `ref`입니다. `ref`는 `<div ref={divRef}>...</div>`와 같이 속성처럼 사용되지만 속성과는 다른 의미를 가지고 있습니다.

## `useRef`
`useRef`는 렌더링에 필요하지 않은 값을 참조할 수 있는 훅입니다. 클레스형 컴포넌트에서는 `useRef` 대신 `createRef`을 사용합니다.

```tsx
const ref = useRef(initialValue)
```

### 파라미터
- `initialValue: any`
  - `current` 객체에 설정할 초기값으로 첫 렌더링시 사용되며 이후에는 무시됩니다.
  - 모든 타입을 사용할 수 있습니다.

### 반환값
- `ref.current: any`
  - 처음에는 `initialValue`로 설정되며 이후에 변경 가능합니다.
  - `ref`를 JSX 노드의 속성으로 전달하면 `current`에 JSX 노드의 DOM이 설정됩니다.
  - 리렌더링이 발생하면 `useRef`의 반환값은 변경되지 않고 동일한 객체를 반환합니다.
  - `ref.current` 값을 변경하더라도 리렌더링이 발생하지 않습니다.

### 사용법
`useRef`의 사용법을 살펴보도록 하겠습니다.

#### 값 참조하기
렌더링에 사용하지 않는 값은 아래 코드 같이 `useRef`가 참조하여 사용할 수 있습니다.

```tsx
import { useRef } from 'react';

function Stopwatch() {
  const intervalRef = useRef(0);

  function handleStartClick() {
    const intervalId = setInterval(() => {
      // ...
    }, 1000);
    intervalRef.current = intervalId;
  }

  function handleStopClick() {
    const intervalId = intervalRef.current;
    clearInterval(intervalId);
  }

  // ...
}
```

`useRef`는 `current`를 포함하는 객체를 반환하는데 `current`의 초기값은 `initialValue`로 위의 코드에서는 `intervalRef.current`의 초기값은 `0`입니다. 리렌더링이 발생하더라도 `useRef`는 동일한 객체를 반환합니다.

`intervalRef.current = 1`와 같이 `current`의 값은 변경 가능하지만 값이 변경되어도 리렌더링은 발생하지 않습니다. 화면을 그리는데 사용되지 않는 값을 `useRef`로 생성하기 좋습니다.

#### DOM 조작하기
대부분의 경우 `useRef`는 아래 코드와 같이 DOM을 조작하기 위해 사용됩니다.

```tsx
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return <input ref={inputRef} />;
}
```

`useRef(null)`로 `null`을 참조하는 `ref` 객체를 생성합니다. `<input ref={inputRef} />`와 같이 JSX의 `ref` 속성에 `null`을 참조하고 있던 `ref` 객체를 전달하면 `current`에 DOM이 담기게 되어 `inputRef.current.focus();`와 같이 DOM을 조작할 수 있게 됩니다. 참조하고 있던 DOM이 화면에 제거 되면 `current`가 `null`로 다시 설정됩니다.

#### 값 재생성 하지 않기
`useRef`에 초기값을 설정하면 첫 렌더링 시에 이 초기값을 저장하고 리렌더링이 발생하더라도 초기값을 다시 저장하지 않고 첫 리렌더링시 반환했던 동일한 객체를 반환합니다. 즉 아래 코드와 같이 작성하게 된다면, 리렌더링이 발생할 때마다 `VideoPlayer` 인스턴스가 생성되지만 이 값은 무시됩니다.

```tsx
function Video() {
  const playerRef = useRef(new VideoPlayer());
  // ...
}
```

아래 코드와 같이 작성하면 이런 낭비를 줄일 수 있게 됩니다.

```tsx
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
  // ...
}
```

## `forwardRef`

## `useImperativeHandle`

##### 참고
- [https://react.dev/reference/react/useRef](https://react.dev/reference/react/useRef)
- [https://react.dev/reference/react/forwardRef](https://react.dev/reference/react/forwardRef)
- [https://react.dev/reference/react/useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
- [https://react.dev/learn/referencing-values-with-refs](https://react.dev/learn/referencing-values-with-refs)
- [https://react.dev/learn/manipulating-the-dom-with-refs](https://react.dev/learn/manipulating-the-dom-with-refs)
