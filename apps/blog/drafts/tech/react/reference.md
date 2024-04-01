---
layout: post
title: '[React] Reference'
featured-img: react/react.png
category: [tech, react]
summary: React에서 DOM에 접근하기 위해 사용되는 것이 ref입니다. ref는 <div ref={divRef}>...</div>와 같이 속성처럼 사용되지만 속성과는 다른 의미를 가지고 있습니다.
---

> ##### TL;DR
> - `useRef`: 렌더링에 영향 받지 않는 변수를 만들고 싶을 때 사용하는 훅입니다. 대부분의 경우 `useRef` 훅의 반환 값을 `<input ref="..." />`의 `ref` 속성에 전달하여 DOM을 접근하기 위해 사용됩니다.
> - `forwardRef`: 부모 컴포넌트에서 자식 컴포넌트의 `ref` 속성을 통해 자식 컴포넌트의 DOM을 접근하기 위해 사용되는 함수입니다.
> - `useImperativeHandle`: 부모 컴포넌트에서 자식 컴포넌트의 `ref` 속성을 통해 노출되는 값을 제어하기 위해 사용되는 훅입니다.

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
`forwardRef`는 컴포넌트의 `ref` 속성을 통해 부모 컴포넌트에게 자식 컴포넌트의 DOM을 노출 시키기 위해 사용됩니다.

```tsx
const SomeComponent = forwardRef(render)
```

### 파라미터
- `render: (props, ref) => Component`
  - 부모로부터 받은 `props`와 `ref`를 파라미터로 전달받아 화면에 그릴 컴포넌트를 반환하는 렌더링 함수입니다.

### 반환값
- `SomeComponent`
  - `forwardRef` 함수는 화면에 그릴 컴포넌트를 반환합니다.

### 사용법
`forwardRef`의 사용법을 살펴보도록 하겠습니다.

#### 부모 컴포넌트에 DOM 노출하기
기본적으로 컴포넌트의 DOM은 부모 컴포넌트에게 노출되지 않습니다. 부모 컴포넌트에서 자식 컴포넌트의 DOM에 포커스를 줘야 할 때 `forwardRef`을 사용하여 부모 컴포넌트에게 DOM을 노출할 수 있습니다.

```tsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

```tsx
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

`Form` 컴포넌트는 `MyInput` 컴포넌트의 `ref` 속성의 `useRef`를 사용하여 참조 값을 전달합니다. `MyInput` 컴포넌트는 전달 받은 참조 값을 `input` 태그의 `ref`에 전달합니다. 이런 과정을 통해 부모 컴포넌트인 `Form` 컴포넌트는 자식 컴포넌트인 `MyInput` 컴포넌트의 `input` 태그에 포커스를 줄 수 있게 됩니다.

#### 중첩된 컴포넌트의 DOM 노출하기
아래 코드와 같이 작성하여 깊이가 있는 컴포넌트 구조에서 상위의 상위 컴포넌트까지 DOM을 노출 시킬 수 있습니다.

```tsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

```tsx
const FormField = forwardRef(function FormField(props, ref) {
  // ...
  return (
    <>
      <MyInput ref={ref} />
      ...
    </>
  );
});
```

```tsx
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <FormField label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

`Form` 컴포넌트는 `useRef`로 참조 값을 만들고, `FormField` 컴포넌트의 `ref` 속성으로 전달합니다. `FormField` 컴포넌트는 전달 받은 참조 값을 `MyInput` 컴포넌트의 `ref` 속성으로 전달하고, `MyInput` 속성은 `input` 태그의 `ref` 속성에 전달하여 조부모 컴포넌트인 `Form`는 `MyInput` 컴포넌트의 `input` 태그에 포커스를 줄 수 있게 됩니다.

#### DOM 대신 핸들링 함수 노출하기
DOM 전체를 상위 컴포넌트에 노출시키는 것이 꺼려진다면, `useImperativeHandle` 훅을 사용하여 필요한 메소드만 상위 컴포넌트 노출 시킬 수 있습니다. 그러기 위해서는 아래 코드와 같이 별도의 참조 값을 생성해야 합니다.

```tsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```

`<MyInput ref={ref} />`를 사용하면 `ref` 참조 값은 DOM이 아닌 `focus` 함수와 `scrollIntoView` 함수를 포함하는 `{ focus, scrollIntoView }` 객체가 됩니다.

## `useImperativeHandle`
`useImperativeHandle` 훅은 `ref`로 노출할 대상을 커스텀할 때 사용되는 훅입니다.

```tsx
useImperativeHandle(ref, createHandle, dependencies?)
```

### 파라미터
- `ref`
  - `forwardRef` 함수의 두번째 파라미터인 `ref`가 전달되어야 합니다.
- `createHandle`
  - 상위 컴포넌트에게 노출하려는 값을 반환하는 함수입니다.
  - 일반적으로 상위 컴포넌트에게 노출하려는 메서드를 포함하는 객체를 반환합니다.
- `dependencies?`
  - `useMomo`, `useEffect` 등의 훅의 두번째 파라미터와 동일하게 종속성을 가진 변수들을 나열하는 파라미터입니다.
  - 종속성을 가진 값들을 배열의 형태로 전달해야 하며, 종속성 배열을 하나라도 변경이 되면 `createHandle` 함수가 다시 실행되어, 상위 컴포넌트에 노출되는 값이 변경됩니다.

### 반환값
`useImperativeHandle` 훅은 `undefined`를 반환합니다.

### 사용법
`useImperativeHandle` 훅의 사용법을 살펴보도록 하겠습니다.

#### 부모 컴포넌트에게 커스텀 함수 노출하기
`useImperativeHandle` 훅을 사용하면 부모 컴포넌트에서 `ref`로 DOM이 아닌 커스텀 함수를 노출할 수 있습니다.

```tsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
      scrollIntoViewDelay(ms) {
        setTimeout(() => inputRef.current.scrollIntoView(), ms);
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```

위 코드의 `scrollIntoViewDelay`와 같이 부모 컴포넌트에 노출할 함수 이름이 DOM 메소드와 동일하지 않아도 됩니다.

#### 사용한 `ref` 부모 컴포넌트에 노출하기
컴포넌트에서 `ref`로 DOM을 가져와 사용하면서 부모 컴포넌트에 사용한 DOM을 전달해야 할 때도 `useImperativeHandle` 훅을 응용하여 사용할 수 있습니다.

```tsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput({ onChange, ...props }, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => inputRef.current, []);

  const handleChange = (e) => {
    onChange(e)
    if (e.target.value.length >= 10) {
      inputRef.current.blur()
    }
  }

  return <input {...props} ref={inputRef} onChange={handleChange} />;
});
```

위의 코드는 `input`에 10글자를 입력하면 `blur` 되는 컴포넌트입니다. 컴포넌트 내부에서 `input` DOM을 사용하면서 부모 컴포넌트에서 `ref`로 `input` DOM에 접근할 수 있도록 `useImperativeHandle` 훅을 사용했습니다.

##### 참고
- [https://react.dev/reference/react/useRef](https://react.dev/reference/react/useRef)
- [https://react.dev/reference/react/forwardRef](https://react.dev/reference/react/forwardRef)
- [https://react.dev/reference/react/useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
- [https://react.dev/learn/referencing-values-with-refs](https://react.dev/learn/referencing-values-with-refs)
- [https://react.dev/learn/manipulating-the-dom-with-refs](https://react.dev/learn/manipulating-the-dom-with-refs)
