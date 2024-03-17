---
layout: post
title: '[React] 알고 쓰자 React - Ref'
featured-img: react/react.png
category: [tech, react]
summary: React에서 DOM에 접근하기 위해 사용되는 것이 ref입니다. ref는 <div ref={divRef}>...</div>와 같이 속성처럼 사용되지만 속성과는 다른 의미를 가지고 있습니다.
---

React에서 DOM에 접근하기 위해 사용되는 것이 `ref`입니다. `ref`는 `<div ref={divRef}>...</div>`와 같이 속성처럼 사용되지만 속성과는 다른 의미를 가지고 있습니다.

## `useRef`
`useRef`는 렌더링에 필요하지 않은 값을 참조할 수 있는 훅입니다. 클레스형 컴포넌트에서는 `useRef` 대신 `createRef`을 사용합니다.

```tsx
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
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
