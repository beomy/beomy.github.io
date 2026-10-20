---
layout: post
title: '[React] React Compiler'
featured-img: react/react.png
category: [tech, react]
summary: React Compiler는 빌드 시간에 컴포넌트와 훅을 자동으로 메모이제이션하는 도구입니다. useMemo, useCallback, memo를 직접 쓰지 않아도 불필요한 리렌더링과 재계산을 줄여 줍니다. 컴파일러가 코드를 어떻게 바꾸는지, 언제 컴파일을 건너뛰는지, 프로젝트에 어떻게 적용하는지 살펴봅니다.
---

> **TL;DR**
>
> - React Compiler는 Babel 플러그인 형태의 빌드 도구입니다. 컴포넌트와 훅 안의 값, 함수, JSX를 분석해 `useMemo`, `useCallback`, `memo`와 같은 효과를 내는 캐시 코드를 자동으로 끼워 넣습니다.
> - 코드를 고칠 필요는 없지만, [React 규칙(Rules of React)](https://react.dev/reference/rules)을 지키는 코드여야 합니다. 규칙을 어긴 컴포넌트는 에러를 내지 않고 조용히 컴파일을 건너뜁니다.
> - 메모이제이션의 단위는 컴포넌트가 아니라 컴포넌트 안의 값입니다. `count`가 바뀌어도 `count`와 무관한 JSX는 이전 엘리먼트를 그대로 재사용하므로, 자식 컴포넌트를 `memo`로 감싸지 않아도 리렌더링이 건너뛰어집니다.
> - 효과는 초기 로드가 아니라 상호작용에서 납니다. 부모 상태 변경이 무관한 자식을 끌고 가던 앱일수록 크고, 외부 라이브러리가 매번 새 객체를 넘기는 곳은 잡지 못합니다.
> - 2025년 10월 1.0 정식 버전이 나왔고, React 17 이상에서 쓸 수 있습니다. Next.js는 `reactCompiler: true` 한 줄로 켤 수 있습니다.
> - `"use no memo"` 지시어로 컴포넌트 하나를 빼거나, `compilationMode: 'annotation'`으로 `"use memo"`를 붙인 컴포넌트만 컴파일하는 식으로 점진적으로 도입할 수 있습니다.

React는 상태가 바뀌면 그 컴포넌트와 하위 컴포넌트 전체를 다시 실행합니다. 이 단순한 모델이 React를 배우기 쉽게 만들었지만, 앱이 커지면 바뀐 것이 없는 자식까지 매번 실행되는 비용이 문제가 됩니다. 그래서 `useMemo`, `useCallback`, `memo`로 "이 값은 저 값이 바뀔 때만 다시 계산해"라고 React에 알려 주는 수동 메모이제이션을 해 왔습니다.

React Compiler(개발 당시 이름은 React Forget)는 이 작업을 사람 대신 빌드 도구가 하도록 만든 것입니다. 2024년 React Conf에서 오픈 소스로 공개되고, 2025년 10월 7일 1.0 정식 버전이 나왔습니다. 이번 포스트에서는 컴파일러가 코드를 어떻게 바꾸는지, 어떤 코드에서 컴파일을 포기하는지, 그리고 프로젝트에 어떻게 적용하는지 살펴보도록 하겠습니다.

## 수동 메모이제이션의 문제
컴파일러가 왜 필요한지 보기 위해, 먼저 지금까지 해 오던 방식의 문제를 짚어 보겠습니다.

```tsx
const FriendList = ({ friends }: { friends: Friend[] }) => {
  const [filter, setFilter] = useState('')
  const visible = useMemo(
    () => friends.filter((f) => f.name.includes(filter)),
    [friends, filter],
  )
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }, [])

  return (
    <div>
      <input value={filter} onChange={onChange} />
      <ul>
        {visible.map((f) => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>
      <MessageButton />
    </div>
  )
}
```

이 코드에는 세 가지 문제가 있습니다.

1. **번거롭고 읽기 어렵습니다.**\
   핵심 로직은 `friends.filter(...)` 한 줄인데, 메모이제이션을 위해 `useMemo`와 의존성 배열이 둘러싸고 있습니다. 코드의 절반이 React를 위한 힌트입니다.
2. **실수하기 쉽습니다.**\
   의존성 배열에서 값을 빠뜨리면 오래된 값을 보여 주는 버그가 생기고, 불필요한 값을 넣으면 메모이제이션이 무의미해집니다. ESLint의 `exhaustive-deps` 규칙이 도와주지만, 객체와 함수 참조가 얽히면 규칙만으로는 부족합니다.
3. **한 곳만 빠져도 전체가 무너집니다.**\
   `MessageButton`은 props가 없는데도 `FriendList`가 리렌더링될 때마다 같이 실행됩니다. `memo`로 감싸야 건너뛸 수 있습니다. 그리고 `memo`로 감싼 컴포넌트에 `onClick={() => handleClick(item)}`처럼 인라인 함수를 넘기면 매번 새 함수라 `memo`가 무력화됩니다. 메모이제이션은 부모부터 자식까지 빈틈없이 이어져야 효과가 있는데, 이것을 사람이 유지하기는 어렵습니다.

컴파일러는 이 세 가지를 모두 해결하려고 합니다. 사람은 메모이제이션 없는 코드를 쓰고, 빌드 도구가 빠짐없이 정확한 메모이제이션을 넣습니다.

## 컴파일러가 하는 일
컴파일러가 실제로 코드를 어떻게 바꾸는지 보겠습니다. 아래의 `Counter` 컴포넌트를 `babel-plugin-react-compiler` 1.0.0으로 변환해 보겠습니다.

```tsx
const Counter = ({ items }: { items: number[] }) => {
  const [count, setCount] = useState(0)
  const total = sum(items)
  const onClick = () => setCount(count + 1)
  return (
    <div>
      <p>{total}</p>
      <button onClick={onClick}>{count}</button>
      <Child />
    </div>
  )
}
```

컴파일하면 아래와 같은 코드가 됩니다.

```tsx
import { c as _c } from 'react/compiler-runtime'

const Counter = (t0) => {
  const $ = _c(13)
  const { items } = t0
  const [count, setCount] = useState(0)

  let t1
  if ($[0] !== items) {
    t1 = sum(items)
    $[0] = items
    $[1] = t1
  } else {
    t1 = $[1]
  }
  const total = t1

  let t2
  if ($[2] !== count) {
    t2 = () => setCount(count + 1)
    $[2] = count
    $[3] = t2
  } else {
    t2 = $[3]
  }
  const onClick = t2

  let t3
  if ($[4] !== total) {
    t3 = <p>{total}</p>
    $[4] = total
    $[5] = t3
  } else {
    t3 = $[5]
  }

  let t4
  if ($[6] !== count || $[7] !== onClick) {
    t4 = <button onClick={onClick}>{count}</button>
    $[6] = count
    $[7] = onClick
    $[8] = t4
  } else {
    t4 = $[8]
  }

  let t5
  if ($[9] === Symbol.for('react.memo_cache_sentinel')) {
    t5 = <Child />
    $[9] = t5
  } else {
    t5 = $[9]
  }

  let t6
  if ($[10] !== t3 || $[11] !== t4) {
    t6 = <div>{t3}{t4}{t5}</div>
    $[10] = t3
    $[11] = t4
    $[12] = t6
  } else {
    t6 = $[12]
  }
  return t6
}
```

길어 보이지만 같은 패턴이 반복될 뿐입니다. 하나씩 읽어 보겠습니다.

### 캐시 배열 만들기
`_c(13)`은 `react/compiler-runtime`이 제공하는 함수로, 길이 13짜리 배열을 만들어 컴포넌트 인스턴스마다 보관합니다. 내부적으로는 `useMemo`처럼 훅으로 구현되어 있어서, 같은 컴포넌트 인스턴스가 다시 렌더링될 때 같은 배열을 돌려줍니다. 배열의 각 칸은 처음에 `Symbol.for('react.memo_cache_sentinel')`이라는 특별한 값으로 채워져 있어, "아직 한 번도 계산하지 않았음"을 나타냅니다.

### Reactive Scope로 묶기
`if ($[0] !== items) { ... } else { ... }` 블록 하나가 메모이제이션의 단위입니다. 컴파일러는 이것을 Reactive Scope라고 부릅니다. 각 블록은 다음 구조로 되어 있습니다.

- **의존성 칸**: `$[0]`에 지난번 렌더링 때의 `items`를 저장합니다.
- **출력 칸**: `$[1]`에 `sum(items)`의 결과를 저장합니다.
- **비교**: 이번 렌더링의 `items`가 `$[0]`과 다르면(`!==`) 다시 계산하고 두 칸을 갱신합니다. 같으면 `$[1]`을 꺼내 씁니다.

`useMemo(() => sum(items), [items])`를 손으로 풀어 쓴 것과 같습니다. 차이는 사람이 의존성 배열을 적는 대신 컴파일러가 코드를 분석해 `items`를 찾아냈다는 점입니다.

![Reactive Scope와 캐시 배열의 대응](/assets/img/posts/react/react_compiler_memo_cache.svg)

`onClick`도 같은 방식으로 `count`에 의존하는 Reactive Scope가 됩니다. `useCallback(() => setCount(count + 1), [count])`와 같습니다. `<Child />`는 아무 값에도 의존하지 않으므로 의존성 칸 없이 sentinel 검사만으로 최초 한 번만 생성됩니다.

#### JSX 엘리먼트도 묶기
컴파일러의 특징은 **JSX 엘리먼트도 메모이제이션 대상**이라는 점입니다. 컴파일 결과에서 엘리먼트를 담는 변수들을 따라가 보면 다음과 같습니다.

|변수|값|의존하는 것|
|:--|:--|:--|
|`t3`|`<p>{total}</p>`|`total`|
|`t4`|`<button onClick={onClick}>{count}</button>`|`count`, `onClick`|
|`t5`|`<Child />`|없음 (최초 한 번만 생성)|
|`t6`|`<div>{t3}{t4}{t5}</div>`|`t3`, `t4`|

`<p>`는 `total`에, `<button>`은 `count`와 `onClick`에 의존하는 Reactive Scope로 각각 묶였습니다. 마지막 `<div>` 블록을 다시 보겠습니다.

```tsx
let t6
if ($[10] !== t3 || $[11] !== t4) {
  t6 = <div>{t3}{t4}{t5}</div>
  $[10] = t3
  $[11] = t4
  $[12] = t6
} else {
  t6 = $[12]
}
return t6
```

`<div>`의 자식은 `t3`, `t4`, `t5` 세 엘리먼트입니다. 이 셋은 이미 각각 메모이제이션되어 있어서 입력이 바뀌지 않으면 이전과 같은 객체입니다. 그래서 `<div>`를 새로 만들지 말지는 `total`이나 `count` 같은 원래 값을 다시 볼 필요 없이, 자식 엘리먼트 `t3`, `t4`가 이전과 같은 객체인지만 보면 됩니다. `t5`는 절대 바뀌지 않으므로 비교 조건에서 아예 빠져 있습니다.

결과적으로 의존 관계가 사슬처럼 이어집니다.

- `count`가 바뀌면 `onClick`과 `t4`가 새로 만들어지고, `t4`가 바뀌었으니 `<div>`도 새로 만들어집니다. 하지만 그 안의 `t3`, `t5`는 이전 객체 그대로입니다.
- `items`가 바뀌면 `total`과 `t3`가 새로 만들어지고, `<div>`도 새로 만들어집니다. `t4`, `t5`는 그대로입니다.
- 둘 다 바뀌지 않았으면 `t3`, `t4`가 그대로라 `<div>`도 캐시에서 꺼냅니다. 컴포넌트가 지난번과 완전히 같은 엘리먼트 트리를 반환하는 것입니다.

컴파일러는 이렇게 메모이제이션을 바깥 엘리먼트까지 겹겹이 쌓아서, 바뀐 가지만 새로 만들고 나머지 가지는 이전 객체를 그대로 끼워 넣습니다.

React는 컴포넌트가 돌려준 자식 엘리먼트가 이전 렌더링과 같은 객체이면, 그 자식 컴포넌트를 다시 실행하지 않고 지난 결과를 그대로 씁니다. 위 사슬에서 `t5`(`<Child />`)는 한 번 만들어진 뒤 항상 같은 객체이므로, `Child`는 `memo`로 감싸지 않아도 다시 실행되지 않습니다. `memo`가 하던 일을 컴파일러가 부모 쪽에서 대신해 주는 셈입니다.

![컴파일 전후의 리렌더링 범위](/assets/img/posts/react/react_compiler_rerender.svg)

#### useMemo보다 촘촘하게
수동 메모이제이션은 사람이 고른 지점에서만 동작합니다. `useMemo`와 `useCallback`은 감싼 값 하나를, `memo`는 감싼 컴포넌트의 리렌더링 여부를 메모이제이션하고, 감싸지 않은 나머지는 매번 다시 계산됩니다. 컴파일러는 컴포넌트 안의 모든 값과 모든 JSX 엘리먼트에 대해 각각 "다시 계산하느냐 마느냐"를 결정합니다. React 팀은 이것을 세밀한 반응성(Fine-grained Reactivity)이라고 부릅니다.

앞에서 본 인라인 함수 문제도 이 방식으로 해결됩니다.

```tsx
const List = ({ items, onSelect }) => (
  <ul>
    {items.map((item) => (
      <Item key={item.id} onClick={() => onSelect(item)} />
    ))}
  </ul>
)
```

컴파일 전에는 `List`가 리렌더링될 때마다 `items.map(...)`이 다시 실행되고, 행마다 `() => onSelect(item)` 화살표 함수가 새로 만들어집니다. `Item`을 `memo`로 감싸 두어도 `memo`는 props를 `===`로 비교하므로, 매번 다른 `onClick` 함수를 보고 props가 바뀌었다고 판단해 `Item`을 전부 다시 렌더링합니다. 이를 막으려면 행마다 `onClick` 함수가 렌더링 사이에 같은 참조를 유지하도록 해야 하는데, 반복문 안에서는 `useCallback`을 쓸 수 없어 컴포넌트 구조를 바꿔야 했습니다.

컴파일러를 쓰면 구조를 바꾸지 않아도 됩니다. 컴파일 후 `items.map(...)` 부분은 아래처럼 바뀝니다.

```tsx
let t1
if ($[0] !== items || $[1] !== onSelect) {
  t1 = items.map((item) => <Item key={item.id} onClick={() => onSelect(item)} />)
  $[0] = items
  $[1] = onSelect
  $[2] = t1
} else {
  t1 = $[2] // 이전 렌더링의 <Item> 엘리먼트 배열을 그대로 재사용
}
```

`map`의 결과 전체가 `items`와 `onSelect`에만 의존하는 Reactive Scope로 묶였습니다. 부모의 무관한 상태 변경으로 `List`가 리렌더링되더라도 `items`와 `onSelect`가 그대로면 `map`을 실행하지 않고 지난번에 만든 `<Item>` 엘리먼트 배열을 캐시에서 꺼냅니다. `<Item>` 엘리먼트가 이전 렌더링과 같은 객체이므로 React는 `Item`을 다시 실행하지 않습니다. `Item`을 `memo`로 감싸거나 `onClick`을 `useCallback`으로 고정하지 않아도 같은 결과가 됩니다.

다만 `items`가 바뀌면 `map`이 다시 실행되고 화살표 함수도 전부 새로 만들어지므로 모든 `Item`이 리렌더링됩니다. 컴파일러가 하는 일은 행마다 `onClick` 참조를 유지하는 것이 아니라, `items`와 `onSelect`가 그대로일 때 리스트 전체를 통째로 건너뛰는 것입니다. 한 행만 바뀌었을 때 그 행만 리렌더링하고 싶다면 컴파일러만으로는 부족하고, 데이터 구조나 컴포넌트 분리를 직접 신경 써야 합니다.

### 컴포넌트 밖으로 끌어올리기
앞의 `FriendList`를 컴파일하면 `visible.map((f) => <li key={f.id}>{f.name}</li>)`의 콜백이 컴포넌트 밖으로 빠져나갑니다.

```tsx
t1 = visible.map(_temp)
// ...
function _temp(f) {
  return <li key={f.id}>{f.name}</li>
}
```

콜백이 컴포넌트의 어떤 값도 참조하지 않는다면 매 렌더링마다 새로 만들 이유가 없습니다. 컴파일러는 이런 함수를 모듈 수준으로 끌어올려 아예 한 번만 만듭니다.

## 컴파일 과정
컴파일러는 Babel 플러그인이지만, 핵심 로직은 Babel과 분리된 별도의 컴파일러입니다. Babel은 소스를 AST로 파싱해 넘겨 주는 입구이고, 컴파일러는 AST를 자체 중간 표현인 HIR(High-level Intermediate Representation)로 바꿔 분석합니다.

> - **AST(Abstract Syntax Tree)**: 소스 코드를 트리 구조로 표현한 것입니다. `a + b`라면 `+` 노드 아래에 `a`와 `b`가 자식으로 달리는 식입니다. Babel, ESLint, Prettier가 모두 이 형태로 코드를 다룹니다.
> - **중간 표현(IR, Intermediate Representation)**: 컴파일러가 분석하기 쉽도록 소스를 바꿔 놓은 내부 형식입니다. AST는 사람이 쓴 문법 그대로라 "이 값이 어디서 바뀌는가" 같은 질문에 답하기 불편해서, 대부분의 컴파일러는 자기만의 IR을 따로 둡니다.
> - **HIR(High-level Intermediate Representation)**: React Compiler의 IR입니다. 함수 본문을 분기가 없는 코드 블록 단위로 쪼개고, 각 값에 한 번만 이름을 붙여서 값의 생성, 변경, 의존 관계를 추적하기 쉽게 만든 형태입니다.

![컴파일 과정](/assets/img/posts/react/react_compiler_pipeline.svg)

1. **컴포넌트와 훅 찾기**: 기본 설정(`compilationMode: 'infer'`)에서는 대문자로 시작하는 이름의 함수가 JSX를 반환하거나 훅을 호출하면 컴포넌트로, `use`로 시작하는 함수를 훅으로 추론합니다. 나머지 일반 함수는 손대지 않습니다.
2. **분석**: HIR 위에서 각 값이 어디서 만들어지고, 어디서 변경(Mutation)되고, 다른 값과 어떻게 별칭(Alias)을 공유하는지 추적합니다. 이 분석 결과로 "이 값은 저 값에 의존한다"는 그래프가 만들어집니다.
3. **규칙 검사**: 분석 중에 React 규칙 위반이 발견되면 그 함수는 컴파일하지 않고 원본 그대로 출력합니다. 다음 절에서 자세히 봅니다.
4. **Reactive Scope 결정과 코드 생성**: 의존성이 같은 값들을 하나의 Reactive Scope로 묶고, 캐시 배열의 칸을 할당한 뒤 `if/else` 코드로 다시 출력합니다.

컴파일은 함수 단위로 독립적입니다. 파일에 컴포넌트가 다섯 개 있고 하나가 규칙을 어겼다면 나머지 넷만 컴파일됩니다.

## React 규칙과 컴파일 건너뛰기
컴파일러가 안전하게 메모이제이션하려면 두 가지 전제가 필요합니다. 같은 입력에 항상 같은 출력이 나와야 캐시한 값을 그대로 돌려줄 수 있고, 렌더링 중에 바깥 상태를 바꾸지 않아야 계산을 건너뛰어도 빠지는 일이 없습니다. 이 두 전제는 React가 오래전부터 문서화해 온 [React 규칙](https://react.dev/reference/rules)과 같습니다.

### React 규칙
컴파일러가 전제로 삼는 규칙은 네 가지입니다. 규칙마다 이를 어긴 예를 함께 적었습니다. 코드 첫 줄의 주석은 컴파일러가 `logger` 옵션으로 보고하는 실제 메시지를 우리말로 옮긴 것입니다.

- **컴포넌트와 훅은 순수해야 합니다.** 렌더링 중에 props, state, 외부 변수를 변경하지 않습니다.

  ```tsx
  // 이 값은 변경할 수 없습니다
  const A = ({ user }) => {
    user.name = 'x' // props 변경
    return <div>{user.name}</div>
  }
  ```

- **훅은 최상위에서, 매번 같은 순서로 호출합니다.**

  ```tsx
  // 훅은 항상 같은 순서로 호출해야 하며 조건부로 호출할 수 없습니다
  const B = ({ on }) => {
    if (on) {
      const [s] = useState(0) // 조건부 훅
      return <div>{s}</div>
    }
    return null
  }
  ```

- **`ref.current`는 렌더링 중에 읽거나 쓰지 않습니다.**

  ```tsx
  // 렌더링 중에는 ref에 접근할 수 없습니다
  const C = () => {
    const ref = useRef(0)
    return <div>{ref.current}</div> // 렌더링 중 ref 읽기
  }
  ```

- **렌더링 중에 `setState`를 호출하지 않습니다.**

  ```tsx
  // 렌더링 중 setState 호출은 무한 루프를 일으킬 수 있습니다
  const D = () => {
    const [a, setA] = useState(0)
    setA(1) // 렌더링 중 setState
    return <div>{a}</div>
  }
  ```

#### ESLint로 미리 찾기
`eslint-plugin-react-hooks`를 사용하면 규칙 위반을 미리 찾을 수 있습니다. 1.0부터는 컴파일러의 분석 엔진이 이 플러그인 안에 들어 있어서, 컴파일러와 같은 기준으로 규칙 위반을 lint 에러로 볼 수 있습니다. 컴파일러를 설치하지 않아도 lint만 따로 쓸 수 있습니다.

```js
// eslint.config.js
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'

export default defineConfig([reactHooks.configs.flat.recommended])
```

`recommended` 프리셋에 `set-state-in-render`, `set-state-in-effect`, `refs`, `immutability` 같은 규칙이 포함되어 있습니다. 별도 패키지였던 `eslint-plugin-react-compiler`는 이 플러그인으로 통합되었으므로, 설치되어 있다면 제거하면 됩니다.

### 컴파일 건너뛰기
컴파일러는 이 규칙을 지킨다고 가정하고 코드를 바꿉니다. 규칙을 어긴 코드를 발견하면 **빌드를 실패시키는 대신 그 함수만 건너뜁니다.** 위의 `A`부터 `D`까지는 모두 컴파일되지 않고 원본 그대로 남습니다.

다만 기본 설정에서는 규칙을 위반해도 아무 알림 없이 조용히 건너뛸 뿐, 위 주석 같은 이유를 터미널이나 콘솔에 보여주지 않습니다. 건너뛴 컴포넌트는 컴파일 전과 똑같이 동작하므로 어느 컴포넌트가 빠졌는지 모르고 지나치기 쉽습니다. 앞의 ESLint 플러그인이 컴파일러와 같은 기준으로 검사하므로, lint를 통과시켜 두면 규칙 위반으로 건너뛰는 컴포넌트는 사라집니다.

#### 컴파일러가 잡지 못하는 위반
컴파일러의 분석은 정적 분석이라 한계가 있습니다. 아래 코드는 props로 받은 배열을 `sort()`로 정렬하는데, 컴파일러는 `Array.prototype.sort`가 배열을 변경한다는 것을 모델링하지 않아 그냥 컴파일합니다.

```tsx
const E = ({ list }) => {
  const sorted = list.sort() // list 자체가 바뀜
  return <div>{sorted.length}</div>
}
```

이 코드는 컴파일 전에도 문제가 있습니다. `sort()`는 새 배열을 만들지 않고 원본 배열의 순서를 직접 바꾸므로, 부모가 같은 배열을 다른 곳에서도 쓰고 있다면 그쪽 순서까지 바뀝니다. 컴파일 후에는 `list` 참조가 같을 때 `sort()`를 건너뛰고 캐시한 `sorted`를 돌려줍니다. 배열은 첫 렌더링 때 이미 정렬되어 있으니 화면은 그대로지만, 매 렌더링마다 실행되던 `sort()`가 한 번만 실행되도록 동작이 바뀌게 됩니다. 컴파일러는 규칙을 지킨 코드를 전제로 변환하기 때문에, 규칙 위반이 남아 있으면 이렇게 컴파일 전후의 동작이 미묘하게 달라질 수 있습니다. 컴파일러를 도입하기 전에 lint를 전부 통과시켜야 이런 문제를 예방할 수 있습니다.

## 설치
`babel-plugin-react-compiler`를 설치하고 빌드 도구에 연결합니다. 공식 문서는 테스트 커버리지가 충분하지 않다면 버전을 정확히 고정(`--save-exact`)하고 직접 올리라고 권장합니다.

```bash
yarn add -D --exact babel-plugin-react-compiler@latest
```

### Babel
플러그인 목록의 **가장 앞**에 둡니다. 다른 플러그인이 코드를 먼저 바꾸면 컴파일러의 분석이 원본 소스와 달라질 수 있기 때문입니다.

```js
// babel.config.js
module.exports = {
  plugins: [
    'babel-plugin-react-compiler', // 반드시 첫 번째
    // ...
  ],
}
```

### Next.js
Next.js 16부터 `reactCompiler` 옵션이 정식 옵션이 되었습니다(15.x에서는 `experimental.reactCompiler`). Next.js는 기본 컴파일러인 SWC(Rust로 만든 Babel 대체 컴파일러)로 먼저 파일을 훑어 JSX나 훅이 있는 파일만 골라 Babel 플러그인을 돌리므로, Babel을 전체에 거는 것보다 빌드가 빠릅니다.

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
}

export default nextConfig
```

### Vite
`@vitejs/plugin-react` 6부터는 내부 Babel이 빠지고 oxc(Vite 팀이 Rust로 만든 JavaScript 변환 도구) 기반으로 바뀌어, 이전처럼 `react({ babel: { plugins: [...] } })`로는 넣을 수 없습니다. `@rolldown/plugin-babel`과 플러그인이 제공하는 `reactCompilerPreset`을 사용합니다.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
})
```

6.1.0(2026년 8월)부터는 Babel 없이 Rust로 작성된 `oxc-transform-react`를 쓰는 `react({ compiler: true })` 옵션도 있지만, 아직 실험 단계입니다. 5.x 이하에서는 기존 `babel.plugins` 방식이 그대로 동작합니다.

### React 17, 18 런타임 패키지
컴파일된 코드는 `react/compiler-runtime`에서 `c`를 import 하는데, 이 모듈은 React 19에 들어 있습니다. 17이나 18에서는 `react-compiler-runtime` 패키지를 따로 설치하고 `target`을 지정합니다.

```bash
yarn add react-compiler-runtime@latest
```

```js
['babel-plugin-react-compiler', { target: '18' }]
```

### 적용 확인
React DevTools의 Components 탭에서 컴파일된 컴포넌트 옆에 **Memo ✨** 배지가 표시됩니다.

![React DevTools의 Memo ✨ 배지](/assets/img/posts/react/react_compiler_devtools.png)

위 캡처는 앞서 만든 [compare.html](/assets/example/react/react-compiler/compare.html)을 DevTools에 연결한 것입니다. 위쪽의 컴파일 전 `App`에는 배지가 없고, 아래쪽의 컴파일 후 `App`과 모든 `Row`에는 Memo ✨ 배지가 붙어 있습니다. 빌드 결과물에서 `react/compiler-runtime` import 와 `_c(` 호출을 찾아보는 방법도 있습니다.

## 점진적 도입
처음부터 전체 프로젝트에 켜는 대신, 범위를 좁혀 시작하는 방법이 여러 가지 준비되어 있습니다. 아래 옵션은 모두 `babel-plugin-react-compiler`의 옵션이라 도구가 달라도 같은 객체를 넘기면 되고, 넘기는 자리만 다릅니다.

|도구|옵션을 넘기는 자리|
|:--|:--|
|Babel|`['babel-plugin-react-compiler', { ... }]`|
|Vite (`@vitejs/plugin-react` 6)|`reactCompilerPreset({ ... })`|
|Next.js|`reactCompiler: { ... }`|
|webpack (`react-compiler-webpack`)|`defineReactCompilerLoaderOption({ ... })`|

### 지시어: 함수 단위
컴포넌트나 훅의 첫 줄에 지시어를 쓰면 그 함수만 컴파일 대상에서 넣거나 뺄 수 있습니다. 소스 코드에 쓰는 것이라 도구와 무관합니다.

```tsx
const Legacy = () => {
  'use no memo' // 이 컴포넌트는 컴파일하지 않음
  // ...
}

const Modern = () => {
  'use memo' // annotation 모드에서 이 컴포넌트만 컴파일
  // ...
}
```

파일 최상단(import 보다 앞)에 쓰면 파일 전체에 적용되고, 함수 수준 지시어가 파일 수준보다 우선합니다. `"use no memo"`는 문제를 격리하기 위한 임시 장치로, 왜 뺐는지 주석과 함께 남기고 원인을 고친 뒤 제거하는 것이 좋습니다. 철자가 틀리면 조용히 무시되니 주의해야 합니다.

### compilationMode: 기본 범위
`compilationMode`는 어떤 함수를 컴파일할지 정합니다.

|값|동작|
|:--|:--|
|`'infer'` (기본값)|이름과 내용으로 컴포넌트·훅을 추론해 컴파일합니다. 지시어가 있으면 지시어를 따릅니다.|
|`'annotation'`|`"use memo"`가 있는 함수만 컴파일합니다. 하나씩 켜 가며 도입할 때 사용합니다.|
|`'all'`|모든 최상위 함수를 컴파일합니다.|

> **`'all'`은 컴포넌트가 아닌 함수에도 훅 호출이 들어가므로 권장하지 않습니다.**
> - 컴파일러가 넣는 `const $ = _c(n)`은 내부적으로 `useMemoCache`라는 훅입니다. 유틸 함수나 이벤트 핸들러에 이 코드가 들어가면, 렌더링 바깥에서 호출될 때 "Invalid hook call" 에러가 납니다.
> - 인자로 받은 배열을 정렬하거나 객체를 고치는 평범한 함수도 React 규칙 위반으로 걸려 건너뛰어지거나 lint 에러가 됩니다. 컴포넌트가 아닌 함수에 순수성 규칙을 강제할 이유가 없습니다.
> - 메모이제이션이 의미 없는 함수에도 캐시 배열과 비교 코드가 붙어 번들만 커집니다.
>
> React 문서도 React와 무관한 함수까지 컴파일할 수 있고 유틸 함수를 컴파일하면 성능이 오히려 나빠질 수 있다며 권장하지 않습니다. 실무에서는 `'infer'`를 기본으로 쓰고, 더 좁히고 싶을 때 `'annotation'`을 쓰는 두 가지면 충분합니다.

**Babel**

```js
// babel.config.js
module.exports = {
  plugins: [['babel-plugin-react-compiler', { compilationMode: 'annotation' }]],
}
```

**Vite**

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset({ compilationMode: 'annotation' })] })],
})
```

**Next.js**

```ts
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: { compilationMode: 'annotation' },
}
```

**webpack**

```js
// webpack.config.js
{
  loader: reactCompilerLoader,
  options: defineReactCompilerLoaderOption({ compilationMode: 'annotation' }),
}
```

### 디렉터리 단위
새로 작성하는 디렉터리부터 켜고 레거시는 나중에 옮기는 방식입니다. 이것은 플러그인 옵션이 아니라 "어떤 파일에 플러그인을 돌릴지"의 문제라서 도구마다 방법이 다릅니다.

**Babel**

`overrides`로 특정 경로에만 플러그인을 적용합니다. React Native의 Metro, Expo처럼 `babel.config.js`를 읽는 도구도 같습니다.

```js
// babel.config.js
module.exports = {
  overrides: [
    {
      test: ['./src/features/**/*.{ts,tsx}'],
      plugins: ['babel-plugin-react-compiler'],
    },
  ],
}
```

**Vite**

`@rolldown/plugin-babel`은 `babel.config.js`를 읽지 않습니다. `reactCompilerPreset()`이 돌려주는 객체의 filter를 고쳐 경로를 제한합니다.

```ts
// vite.config.ts
const preset = reactCompilerPreset()
preset.rolldown.filter.id.exclude = ['src/legacy/**']

export default defineConfig({
  plugins: [react(), babel({ presets: [preset] })],
})
```

**Next.js**

`reactCompiler` 옵션에는 경로 옵션이 없습니다. SWC가 파일을 거른 뒤 내부 Babel을 돌리는 구조라 `babel.config.js`도 거치지 않고, 오히려 프로젝트에 Babel 설정 파일을 두면 SWC가 꺼집니다. 디렉터리 단위로 가려면 `compilationMode: 'annotation'`을 켜고 원하는 파일 최상단에 `"use memo"`를 적습니다.

**webpack**

로더 규칙의 `include`로 경로를 제한합니다. 일반 webpack 규칙과 같습니다.

```js
// webpack.config.js
{
  test: /\.[jt]sx?$/,
  include: path.resolve(__dirname, 'src/features'),
  use: [
    'babel-loader',
    { loader: reactCompilerLoader, options: defineReactCompilerLoaderOption({}) },
  ],
}
```

### 게이팅: 사용자 단위
앞의 방법들이 어떤 컴포넌트를 컴파일할지 정한다면, `gating`은 **어떤 사용자에게 컴파일된 코드를 줄지** 정합니다. 켜면 컴파일러가 컴포넌트마다 컴파일 버전과 원본 버전을 둘 다 출력하고, 지정한 함수를 호출해 실행 시간에 하나를 고릅니다. A/B 테스트나 일부 사용자에게만 먼저 배포할 때 사용합니다.

설정에는 "고르는 함수"가 어느 모듈(`source`)의 어떤 이름(`importSpecifierName`)인지만 적습니다. `source`에 적은 문자열이 그대로 `import` 경로가 되므로 상대 경로보다는 경로 별칭이나 패키지 이름을 씁니다.

**Babel**

```js
// babel.config.js
module.exports = {
  plugins: [['babel-plugin-react-compiler', {
    gating: { source: '@/lib/ReactCompilerFeatureFlags', importSpecifierName: 'isCompilerEnabled' },
  }]],
}
```

**Vite**

```ts
// vite.config.ts
reactCompilerPreset({
  gating: { source: '@/lib/ReactCompilerFeatureFlags', importSpecifierName: 'isCompilerEnabled' },
})
```

**Next.js**

```ts
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: {
    gating: { source: '@/lib/ReactCompilerFeatureFlags', importSpecifierName: 'isCompilerEnabled' },
  },
}
```

**webpack**

```js
// webpack.config.js
defineReactCompilerLoaderOption({
  gating: { source: '@/lib/ReactCompilerFeatureFlags', importSpecifierName: 'isCompilerEnabled' },
})
```

고르는 함수는 컴파일러가 만들어 주는 것이 아니라 직접 작성합니다. 인자 없이 호출되어 `true`를 돌려주면 컴파일 버전, `false`를 돌려주면 원본을 씁니다. 판단 기준은 자유입니다.

```ts
// src/lib/ReactCompilerFeatureFlags.ts
// 직접 작성하는 파일. 설정의 importSpecifierName 과 같은 이름으로 export 합니다.
export const isCompilerEnabled = (): boolean => {
  // 개발자가 강제로 켜고 끄는 스위치
  const override = localStorage.getItem('react-compiler')
  if (override === 'on') return true
  if (override === 'off') return false

  // 사용자 일부에게만 점진 배포 (예: 사용자 ID 해시의 끝자리로 10%)
  const userId = localStorage.getItem('user-id') ?? ''
  return hash(userId) % 100 < 10
}
```

`Counter`를 이 설정으로 컴파일하면 아래처럼 두 벌의 함수와 삼항식이 생깁니다.

```tsx
import { isCompilerEnabled } from '@/lib/ReactCompilerFeatureFlags'

export const Counter = isCompilerEnabled()
  ? () => { /* 컴파일된 본문 */ }
  : () => { /* 원본 본문 */ }
```

삼항식은 모듈이 로드될 때 한 번만 평가되므로, 고르는 함수는 앱이 뜰 때 동기적으로 답할 수 있어야 합니다. 번들에 두 벌의 코드가 들어가므로 전환이 끝나면 옵션을 제거해야 합니다.

## 규칙 위반을 빌드 에러로
앞의 옵션들이 어디까지 컴파일할지를 정했다면, `panicThreshold`는 컴파일러가 규칙 위반을 만났을 때 조용히 건너뛸지, 빌드를 실패시킬지 정합니다. 옵션을 넘기는 자리는 점진적 도입 절의 표와 같습니다.

|값|동작|
|:--|:--|
|`'none'` (기본값)|어떤 에러가 나도 빌드를 실패시키지 않고 해당 함수만 건너뜁니다.|
|`'critical_errors'`|React 규칙 위반처럼 코드 자체가 잘못된 경우만 빌드 에러로 만듭니다.|
|`'all_errors'`|컴파일러가 지원하지 않는 문법 등 모든 건너뛰기를 빌드 에러로 만듭니다. 코드가 틀리지 않아도 빌드가 깨질 수 있습니다.|

개발 중에는 `'critical_errors'`로 두어 위반을 넣는 순간 바로 알아차리게 하고, 운영 빌드에는 `'none'`을 두어 컴파일러 문제로 배포가 막히지 않게 하는 구성이 일반적입니다.

**Babel**

```js
// babel.config.js
const panicThreshold = process.env.NODE_ENV === 'production' ? 'none' : 'critical_errors'

module.exports = {
  plugins: [['babel-plugin-react-compiler', { panicThreshold }]],
}
```

**Vite**

```ts
// vite.config.ts
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset({ panicThreshold: mode === 'production' ? 'none' : 'critical_errors' })],
    }),
  ],
}))
```

**Next.js**

```ts
// next.config.ts
const nextConfig: NextConfig = {
  reactCompiler: {
    panicThreshold: process.env.NODE_ENV === 'production' ? 'none' : 'critical_errors',
  },
}
```

**webpack**

```js
// webpack.config.js
defineReactCompilerLoaderOption({
  panicThreshold: process.env.NODE_ENV === 'production' ? 'none' : 'critical_errors',
})
```

`'critical_errors'`에서 앞서 본 렌더링 중 `ref.current`를 읽는 컴포넌트를 Vite로 빌드하면 아래처럼 실패합니다. 어느 파일의 어느 줄이 왜 문제인지까지 알려줍니다.

![panicThreshold: 'critical_errors'로 빌드가 실패한 화면](/assets/img/posts/react/react_compiler_panic_threshold.png)

## 성능은 얼마나 좋아지나
컴파일러는 리렌더링을 줄이는 도구입니다. 그래서 효과는 "부모의 상태 변경이 무관한 자식까지 끌고 가는 일"이 얼마나 많은지에 달려 있습니다.

### 직접 비교해 보기
같은 컴포넌트를 컴파일하지 않은 것과 컴파일한 것을 나란히 두고 비교해 보겠습니다. 부모 컴포넌트가 `count` 상태와 300행짜리 리스트를 가지고 있고, 각 행은 약간의 계산을 하며 렌더링될 때마다 붉게 반짝입니다. 버튼을 누르면 부모의 `count`만 바뀝니다.

```jsx
// App.jsx (일부 생략)
const ROWS = 300
const items = Array.from({ length: ROWS }, (_, i) => ({ id: i + 1, name: `item ${i + 1}` }))

// 행 하나를 그릴 때 드는 약간의 계산 (실제 앱의 포맷팅·필터링 등을 흉내)
const format = (n) => {
  let s = 0
  for (let i = 0; i < 20000; i++) s = (s + n * i) % 9973
  return s
}

const Row = ({ item, onSelect, onRender }) => {
  const ref = useRef(null)
  useEffect(() => {
    // 이 효과는 Row 가 렌더링될 때마다 실행됩니다. 렌더링 횟수를 세고 행을 잠깐 반짝입니다.
    onRender()
    // ... ref.current 에 flash 클래스를 붙였다 떼는 코드
  })
  return (
    <li ref={ref} onClick={() => onSelect(item.id)}>
      {item.name} <span className="dim">{format(item.id)}</span>
    </li>
  )
}

export const App = ({ label }) => {
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(null)
  const rowRenders = useRef(0)
  const rendersRef = useRef(null)
  // ...

  const onRender = () => {
    rowRenders.current += 1
  }
  const onClick = () => {
    // ... 클릭 시각 기록
    setCount(count + 1)
  }

  useEffect(() => {
    // 렌더링과 커밋이 끝난 시점. 자식 Row 의 효과가 먼저 실행되므로 누적 횟수가 정확합니다.
    rendersRef.current.textContent = String(rowRenders.current)
    // ... 클릭부터 커밋까지 걸린 시간도 함께 표시
  })

  return (
    <section className="panel">
      <h2>{label}</h2>
      <button onClick={onClick}>count + 1</button>
      <dl>
        {/* ... */}
        <dt>Row 누적 렌더링 횟수</dt>
        <dd ref={rendersRef}>0</dd>
      </dl>
      <ul>
        {items.map((item) => (
          <Row key={item.id} item={item} onSelect={setSelected} onRender={onRender} />
        ))}
      </ul>
    </section>
  )
}
```

![컴파일 전후 비교](/assets/img/posts/react/react_compiler_compare.gif)

[compare.html](/assets/example/react/react-compiler/compare.html)에서 직접 눌러 볼 수 있습니다. 컴파일 전후 코드는 `babel-plugin-react-compiler` 1.0.0으로 변환한 결과를 그대로 넣은 것입니다. 원본은 [App.jsx](/assets/example/react/react-compiler/App.jsx)이고, 변환에 쓴 스크립트는 [compile.mjs](/assets/example/react/react-compiler/compile.mjs)입니다. 브라우저는 JSX를 읽지 못하므로 컴파일 전 쪽도 JSX 변환만 거친 코드이고, 두 쪽의 차이는 컴파일러 플러그인을 켰는지뿐입니다. 컴파일 전(왼쪽)은 버튼을 누를 때마다 300개 행이 전부 반짝이고 클릭 한 번에 약 26~29ms가 걸립니다. 컴파일 후(오른쪽)는 행이 하나도 반짝이지 않고 0.2ms면 끝납니다. `Row`에 넘기는 `onRender`를 컴파일러가 한 번만 만들어 두고 재사용하므로, `items`와 `onSelect`, `onRender` 어느 것도 바뀌지 않는 리스트 JSX는 첫 렌더링 뒤로 계속 캐시에서 꺼내 쓰게 되어 300개 `Row`의 리렌더링 자체가 사라지게 됩니다.

|조건 (300행, 부모 state 200회 변경)|컴파일 전|컴파일 후|
|:--|--:|--:|
|행마다 무거운 계산이 있는 리스트|534~623ms|7~9ms|
|계산이 없는 가벼운 리스트|282~353ms|7~9ms|
|자식에 인라인 객체 `style={{ ... }}`를 넘기는 리스트|329~404ms|6~9ms|

위 표는 같은 구조를 jsdom + React 19에서 반복 실행해 잰 것입니다. 행의 계산이 가벼워도 차이가 큰 이유는, 300개 컴포넌트를 다시 실행하고 비교(Reconciliation)하는 비용 자체가 사라지기 때문입니다. 세 번째 줄의 인라인 객체 `style={{ ... }}`는 컴파일 전에는 렌더링마다 새 객체라 자식을 `memo`로 감싸도 매번 리렌더링됩니다. 컴파일러는 이런 객체 리터럴도 함께 캐시해 같은 참조를 넘기므로, 인라인 객체가 있어도 다른 두 줄과 같은 6~9ms가 나옵니다.

## 주의할 점
컴파일러를 실제 프로젝트에 적용하면서 겪는 문제들입니다.

### 기존 useMemo는 그대로 둔다
그대로 두어도 됩니다. 컴파일러는 기존 `useMemo`, `useCallback`을 자신의 Reactive Scope로 흡수하면서, 사람이 적은 의존성과 자신이 분석한 의존성이 일치하는지 검사합니다. 아래처럼 의존성 배열에서 `b`를 빠뜨린 경우, 컴파일러의 분석으로는 `b`가 바뀌면 `v`도 바뀌어야 하므로 기존 메모이제이션을 그대로 보장할 수 없습니다. 이때는 `Existing memoization could not be preserved`라는 이유로 그 컴포넌트의 컴파일을 건너뜁니다.

```tsx
const Wrong = ({ a, b }) => {
  const v = useMemo(() => ({ a, b }), [a]) // b 누락 → 컴파일 건너뜀
  return <Child v={v} />
}
```

결과가 숫자나 문자열 같은 원시 값일 때는 다릅니다. `useMemo(() => a + b, [a])`처럼 유지할 참조가 없으면 메모이제이션할 필요 자체가 없다고 판단해 `useMemo`를 벗겨 내고 `const v = a + b`로 바꿉니다.

새로 작성하는 코드에서는 성능을 위한 `useMemo`, `useCallback`은 쓰지 않고 컴파일러에 맡깁니다. 다만 아래 코드처럼 참조가 바뀌면 동작까지 달라지는 경우는 예외입니다.

```tsx
const options = useMemo(() => ({ id }), [id]) // 컴파일러에 맡기지 않고 직접 고정
useEffect(() => {
  connect(options) // options 참조가 바뀔 때마다 다시 연결됨
}, [options])
```

`useMemo` 없이 `const options = { id }`로 쓰고 컴파일러에 맡겼다면, 나중에 규칙 위반 코드가 추가되는 등의 이유로 컴파일러가 이 컴포넌트를 건너뛰는 순간 `options`가 렌더링마다 새 객체가 되어 이펙트가 매번 재실행됩니다. 이런 값은 위처럼 `useMemo`로 직접 만들어 참조를 고정해 둡니다. 기존 코드의 `useMemo`를 지우는 것도 같은 이유로 결과가 달라질 수 있으므로, 지운다면 테스트로 확인하는 것이 좋습니다.

### 동작이 바뀌는 코드
가장 흔한 문제는 어떤 값이 매 렌더링마다 새로 만들어지는 것을 예상했던 코드가, 컴파일 후 그 값이 캐시되면서 다르게 동작하는 경우입니다.

```tsx
const Search = ({ query }) => {
  const options = { query, page: 1 }

  useEffect(() => {
    fetchResults(options)
  }, [options])
  // ...
}
```

컴파일 전에는 `options`가 매 렌더링마다 새 객체라 이펙트가 매번 실행되었습니다. 컴파일 후에는 `options`가 `query`에 의존하는 Reactive Scope가 되어 `query`가 같으면 같은 객체이고, 이펙트는 `query`가 바뀔 때만 실행됩니다. 이것이 의도한 동작이라면 버그가 고쳐진 것이고, 매번 실행되는 것에 기대고 있었다면 동작이 바뀐 것입니다.

캐시가 잘못 작동하는 문제도 있습니다. [순수성 규칙](#react-규칙)을 어기고 props나 state에서 온 객체를 렌더링 중에 변경하면 참조는 그대로인 채 내용만 바뀌므로 캐시 비교가 어긋나고, 이펙트가 예상보다 자주 실행되거나 무한 루프에 빠지기도 합니다. `user.name = 'x'`처럼 컴포넌트 안에서 눈에 보이게 변경하는 코드는 lint가 잡아 주지만, `sort()`처럼 컴파일러가 모델링하지 않은 메서드나 다른 함수 안에 숨은 변경은 lint도 놓칩니다.

이런 문제가 의심되는 컴포넌트에 `"use no memo"`를 붙여 컴파일에서 빼서 증상이 사라진다면, 컴파일러 버그라기보다 그 컴포넌트에 숨어 있던 React 규칙 위반이 드러난 것입니다.

### 캐시는 인스턴스마다 따로
캐시 배열은 컴포넌트 인스턴스마다 따로 만들어지므로, 다른 컴포넌트나 같은 컴포넌트의 다른 인스턴스와 공유되지 않습니다. 여러 컴포넌트가 같은 무거운 계산을 한다면 각자 계산하기 때문에, 이런 경우는 직접 캐시를 관리하는 것이 좋습니다.

### 비교는 얕은 비교
Reactive Scope는 의존성을 `!==`로 비교합니다. `useMemo`의 의존성 비교와 같은 얕은 비교라, 내용이 같아도 참조가 다르면 다시 계산합니다. 그래서 컴파일되지 않은 부모가 매 렌더링마다 새 객체를 props로 넘기면 컴파일된 자식도 매번 다시 계산합니다. 부모까지 컴파일되면 그 객체도 캐시되어 참조가 유지되므로, 프로젝트 전체에 적용할수록 효과가 커집니다.

### 런타임 비용
컴파일된 코드는 원본보다 길고, 렌더링마다 캐시 칸을 비교하는 연산이 추가됩니다. 매우 단순한 컴포넌트에서는 비교 비용이 절약되는 비용보다 클 수도 있습니다.

### 라이브러리 배포 시 React 19 요구
라이브러리를 컴파일해서 배포하면, 그 라이브러리를 쓰는 앱은 컴파일러를 설치하지 않아도 메모이제이션된 코드를 받습니다. 다만 컴파일된 코드는 React 19에 들어 있는 `react/compiler-runtime`을 import 하므로, 라이브러리가 React 19 이상을 요구하게 됩니다. 17이나 18까지 지원하려면 설치 절에서 본 대로 `target`을 낮추고 `react-compiler-runtime` 패키지를 라이브러리의 의존성에 추가해야 합니다.

##### 참고
- [https://react.dev/learn/react-compiler/introduction](https://react.dev/learn/react-compiler/introduction)
- [https://react.dev/learn/react-compiler/installation](https://react.dev/learn/react-compiler/installation)
- [https://react.dev/learn/react-compiler/incremental-adoption](https://react.dev/learn/react-compiler/incremental-adoption)
- [https://react.dev/learn/react-compiler/debugging](https://react.dev/learn/react-compiler/debugging)
- [https://react.dev/reference/react-compiler/configuration](https://react.dev/reference/react-compiler/configuration)
- [https://react.dev/reference/react-compiler/directives](https://react.dev/reference/react-compiler/directives)
- [https://react.dev/blog/2025/10/07/react-compiler-1](https://react.dev/blog/2025/10/07/react-compiler-1)
- [https://react.dev/reference/rules](https://react.dev/reference/rules)
- [https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler](https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler)
- [https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
- [https://oxc.rs/blog/2026-08-18-react-compiler-support](https://oxc.rs/blog/2026-08-18-react-compiler-support)
- [https://playground.react.dev](https://playground.react.dev)
