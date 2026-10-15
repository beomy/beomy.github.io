---
layout: post
title: '[React] Server Components'
featured-img: react/react.png
category: [tech, react]
summary: React Server Components는 서버에서만 실행되는 컴포넌트입니다. 클라이언트로 전달되는 JavaScript 번들을 줄이고, 데이터가 있는 곳에서 바로 렌더링할 수 있게 해 줍니다. 서버 컴포넌트와 클라이언트 컴포넌트가 어떻게 나뉘고, 어떤 원리로 동작하는지 살펴봅니다.
---

> **TL;DR**
>
> - 서버 컴포넌트(Server Component)는 서버에서만 실행되는 컴포넌트입니다. 클라이언트로 JavaScript가 전달되지 않고, 렌더링 결과만 RSC Payload라는 형태로 전달됩니다.
> - 클라이언트 컴포넌트(Client Component)는 파일 최상단에 `'use client'`를 선언한 컴포넌트로, 기존에 작성하던 React 컴포넌트와 같습니다. 상태, 이펙트, 이벤트 핸들러는 클라이언트 컴포넌트에서만 사용할 수 있습니다.
> - 서버 컴포넌트는 `async` 함수로 선언하고 `await`로 데이터를 직접 가져올 수 있습니다. 데이터베이스, 파일 시스템, 내부 API에 클라이언트를 거치지 않고 접근합니다.
> - 서버 컴포넌트에서 클라이언트 컴포넌트를 import 할 수 있지만, 반대로 import 하면 서버 컴포넌트가 클라이언트 컴포넌트가 되어 버립니다. 클라이언트 컴포넌트 안에 서버 컴포넌트를 두고 싶다면 `children`과 같은 prop으로 전달합니다.
> - SSR(Server Side Rendering)과는 다른 개념입니다. SSR은 HTML을 서버에서 만드는 것이고, 서버 컴포넌트는 컴포넌트 자체를 서버에서 실행하는 것입니다. 둘은 함께 사용됩니다.

React Server Components(이하 RSC)는 2020년 말 처음 소개되어 React 18 시기에 실험 기능으로 다듬어지고, React 19에서 정식 기능이 된 컴포넌트 모델입니다. 지금까지의 React 컴포넌트는 모두 브라우저에서 실행된다는 전제가 있었습니다. 서버에서 HTML을 미리 만드는 SSR을 사용하더라도, 컴포넌트 코드는 결국 브라우저로 전달되어 다시 한번 실행(하이드레이션)되어야 했습니다. RSC는 이 전제를 깨고 **서버에서만 실행되고 브라우저로는 전달되지 않는 컴포넌트**를 만들 수 있게 해 줍니다.

이번 포스트에서는 서버 컴포넌트가 무엇을 해결하려는 것인지, 서버 컴포넌트와 클라이언트 컴포넌트를 어떻게 나누는지, 그리고 내부적으로 어떤 원리로 동작하는지 살펴보도록 하겠습니다.

## 서버 컴포넌트가 해결하려는 문제
RSC가 등장한 배경을 이해하면 언제 서버 컴포넌트를 써야 하는지 자연스럽게 알 수 있습니다. 크게 세 가지 문제를 해결하기 위해 등장했습니다.

### 번들 크기
마크다운을 HTML로 바꿔 보여주는 컴포넌트가 있다고 가정해 보겠습니다.

```tsx
import { marked } from 'marked' // 35.9K (11.2K gzipped)
import sanitizeHtml from 'sanitize-html' // 206K (63.3K gzipped)

const NoteWithMarkdown = ({ text }: { text: string }) => {
  const html = sanitizeHtml(marked(text))
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
```

이 컴포넌트는 사용자와 상호작용하지 않습니다. 마크다운을 HTML로 바꿔 보여주기만 합니다. 그럼에도 `marked`와 `sanitize-html` 라이브러리가 브라우저로 전달되어야 합니다. 서버 컴포넌트로 만들면 이 라이브러리는 서버에서만 실행되고, 브라우저로는 변환이 끝난 HTML만 전달됩니다. 번들에서 두 라이브러리가 완전히 사라집니다.

### 데이터 접근
클라이언트 컴포넌트에서 데이터를 가져오려면 API 서버를 거쳐야 합니다. 컴포넌트가 마운트된 후 `useEffect`나 TanStack Query 같은 라이브러리로 요청을 보내고, 응답을 기다렸다가 화면을 그립니다. 부모 컴포넌트가 데이터를 받은 뒤에야 자식 컴포넌트의 요청이 시작되는 Waterfall 문제도 자주 겪게 됩니다.

API 서버를 거치는 이유는 브라우저가 데이터베이스나 파일 시스템에 직접 접근할 수 없기 때문입니다. 서버 컴포넌트는 서버에서 실행되므로 이 중간 단계가 필요 없습니다. 컴포넌트 안에서 데이터베이스에 바로 쿼리를 보내고, 파일을 읽고, 내부 네트워크의 API를 호출할 수 있습니다. 브라우저와 서버 사이의 왕복(Round Trip)이 사라집니다. Waterfall이 생기더라도 서버 안에서 일어나는 일이라 네트워크 지연이 거의 없고, 비용도 훨씬 작습니다.

```tsx
import db from './database'

const Note = async ({ id }: { id: string }) => {
  const note = await db.notes.get(id) // 서버에서 데이터베이스에 직접 접근
  return (
    <article>
      <h1>{note.title}</h1>
      <NoteWithMarkdown text={note.body} />
    </article>
  )
}
```

### 자동 코드 분할
번들러는 `import`로 연결된 컴포넌트를 모두 하나의 번들로 묶습니다. 아래 코드처럼 노트 종류에 따라 둘 중 하나만 보여 주는 경우에도, 사용자가 사진 노트만 열었을 때 `VideoEditor`의 코드까지 함께 브라우저로 전달됩니다.

```tsx
import PhotoEditor from './PhotoEditor'
import VideoEditor from './VideoEditor'

const Note = ({ note }) => {
  return note.type === 'photo' ? <PhotoEditor /> : <VideoEditor />
}
```

이를 피하려면 `React.lazy`로 어떤 컴포넌트를 따로 떼어낼지 개발자가 직접 지정해야 했습니다. 어디를 분할할지 매번 판단해야 하고, 빠뜨리면 그냥 한 덩어리로 묶입니다.

```tsx
import { lazy, Suspense } from 'react'

const PhotoEditor = lazy(() => import('./PhotoEditor'))
const VideoEditor = lazy(() => import('./VideoEditor'))

const Note = ({ note }) => {
  return (
    <Suspense fallback={<Loading />}>
      {note.type === 'photo' ? <PhotoEditor /> : <VideoEditor />}
    </Suspense>
  )
}
```

`Note`가 서버 컴포넌트이고 `PhotoEditor`와 `VideoEditor`가 클라이언트 컴포넌트라면 이 작업이 자동으로 이루어집니다. 서버 컴포넌트가 import 하는 클라이언트 컴포넌트는 항상 별도의 청크로 분리되고, 어떤 컴포넌트를 렌더링할지는 서버에서 결정되어 RSC Payload에 선택된 컴포넌트의 참조만 담깁니다. 브라우저는 RSC Payload에 있는 청크만 내려받으므로, 사진 노트를 열었을 때 `VideoEditor`의 코드는 전달되지 않습니다.

```tsx
// Note.tsx (서버 컴포넌트, lazy 없이 일반 import)
import PhotoEditor from './PhotoEditor' // 'use client'
import VideoEditor from './VideoEditor' // 'use client'

const Note = async ({ id }) => {
  const note = await db.notes.get(id)
  return note.type === 'photo' ? <PhotoEditor /> : <VideoEditor />
}
```

## 서버 컴포넌트와 클라이언트 컴포넌트
RSC 모델에서 컴포넌트는 서버 컴포넌트와 클라이언트 컴포넌트 둘 중 하나입니다. 두 컴포넌트를 구분하는 방법과 각각의 제약을 살펴보겠습니다.

### 구분하는 방법
Next.js App Router 같은 RSC를 지원하는 프레임워크에서는 **모든 컴포넌트가 기본적으로 서버 컴포넌트**입니다. 클라이언트 컴포넌트로 만들고 싶은 파일의 최상단에 `'use client'` 지시어를 선언합니다.

```tsx
'use client'

import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

export default Counter
```

`'use client'`는 "이 파일부터는 클라이언트 영역"이라는 경계(Boundary)를 표시하는 지시어입니다. 이 파일이 import 하는 모든 모듈도 클라이언트 번들에 포함됩니다. 모든 클라이언트 컴포넌트 파일마다 `'use client'`를 선언할 필요는 없고, 서버 컴포넌트에서 클라이언트 컴포넌트로 넘어가는 경계가 되는 파일에만 선언하면 됩니다.

### 서버 컴포넌트의 제약
서버 컴포넌트는 서버에서 한 번 실행되고 끝나기 때문에, 브라우저에서 계속 살아 있어야 하는 기능은 사용할 수 없습니다.

- `useState`, `useReducer`, `useEffect` 같이 상태와 생명주기에 관련된 훅을 사용할 수 없습니다.
- `onClick`, `onChange` 같은 이벤트 핸들러를 사용할 수 없습니다. 이벤트 핸들러는 함수인데, 함수는 서버의 변수를 참조하고 있어 문자열로 바꿔 브라우저로 보낼 수 없기 때문입니다.
- `window`, `document` 같은 브라우저 API를 사용할 수 없습니다.
- 클라이언트 컴포넌트에 전달하는 props는 직렬화 가능해야 합니다. 문자열, 숫자, 배열, 객체, `Date`, `Promise`, JSX 등은 전달할 수 있지만 함수와 클래스 인스턴스는 전달할 수 없습니다.

> **직렬화(Serialization)**
>
> 메모리에 있는 값을 네트워크로 보낼 수 있는 문자열로 바꾸는 것입니다. `JSON.stringify`가 대표적인 예입니다. 서버 컴포넌트의 렌더링 결과는 RSC Payload라는 문자열로 바뀌어 브라우저로 전달되는데, 클라이언트 컴포넌트에 넘긴 props도 이 문자열 안에 함께 담겨야 합니다. 문자열, 숫자, 배열, 객체는 그대로 문자열로 표현할 수 있지만, 함수는 코드가 참조하는 서버의 변수까지 한 묶음이라 문자열 하나로 옮길 수 없습니다. `JSON.stringify({ onClick: () => {} })`의 결과가 `{}`인 것과 같은 이유입니다.
>
> ```tsx
> const Page = async () => {
>   const note = await db.notes.get(id)
>   const handleDelete = () => db.notes.delete(note.id) // 서버의 db, note 를 참조하는 함수
>   return <DeleteButton onClick={handleDelete} />       // 문자열로 바꿀 수 없어 에러
> }
> ```

대신 서버 컴포넌트에서만 할 수 있는 것들이 있습니다.

- `async` 함수로 선언하고 `await`를 사용할 수 있습니다.
- 데이터베이스나 파일 시스템에 직접 접근할 수 있고, API 키 같은 비밀 환경 변수도 사용할 수 있습니다. 이 코드는 브라우저로 전달되지 않기 때문에 비밀 값이 노출되지 않습니다.
- 무거운 라이브러리를 번들 크기 걱정 없이 사용할 수 있습니다.

### 클라이언트 컴포넌트의 제약
클라이언트 컴포넌트는 기존 React 컴포넌트와 같습니다. 다만 한 가지 규칙이 추가됩니다. **클라이언트 컴포넌트는 서버 컴포넌트를 import 할 수 없습니다.** 클라이언트 번들에 서버 컴포넌트 코드가 들어가면 서버 컴포넌트의 의미가 없어지기 때문입니다. 아래 코드처럼 클라이언트 컴포넌트에서 서버 컴포넌트를 import 하면 서버 컴포넌트는 그냥 클라이언트 컴포넌트가 되어 버립니다. `async` 함수였거나 서버 전용 모듈을 사용했다면 에러가 발생합니다.

```tsx
'use client'

import ServerComponent from './ServerComponent' // 클라이언트 컴포넌트가 되어 버립니다.

const ClientComponent = () => {
  return <ServerComponent />
}
```

클라이언트 컴포넌트 안에 서버 컴포넌트를 두고 싶다면 import 대신 **props로 전달**합니다. 서버 컴포넌트가 렌더링한 결과는 직렬화 가능한 JSX이기 때문에 `children`을 비롯한 어떤 prop으로든 전달할 수 있습니다.

```tsx
// ClientComponent.tsx
'use client'

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(!open)}>toggle</button>
      {open && children}
    </div>
  )
}

// Page.tsx (서버 컴포넌트)
const Page = () => {
  return (
    <ClientComponent>
      <ServerComponent /> {/* 서버에서 렌더링되어 결과만 전달됩니다. */}
    </ClientComponent>
  )
}
```

이 패턴은 "클라이언트 컴포넌트에 구멍(Slot)을 뚫는다"고 표현하기도 합니다. 클라이언트 컴포넌트는 `children`이 무엇인지 알 필요 없이 자리만 내어 주고, 그 자리를 서버 컴포넌트가 채웁니다.

![import 와 children 의 차이](/assets/img/posts/react/rsc_slot_pattern.svg)

두 종류의 컴포넌트가 서로를 어떻게 사용할 수 있는지 정리하면 다음과 같습니다. 서버 컴포넌트는 서버 컴포넌트든 클라이언트 컴포넌트든 자유롭게 사용할 수 있습니다. 제약은 클라이언트 컴포넌트에서 서버 컴포넌트를 사용할 때만 있습니다.

|방향|결과|
|:--|:--|
|서버 컴포넌트에서 서버 컴포넌트를 import|가능합니다. 서버에서 바로 실행되어 결과가 RSC Payload에 들어갑니다.|
|서버 컴포넌트에서 클라이언트 컴포넌트를 import|가능합니다. RSC Payload에 참조로 기록되고 브라우저에서 실행됩니다.|
|클라이언트 컴포넌트에서 서버 컴포넌트를 import|에러 없이 그냥 클라이언트 컴포넌트가 되어 버립니다. 클라이언트에서 할 수 없는 일을 하고 있을 때만 에러가 납니다.|
|클라이언트 컴포넌트에서 서버 컴포넌트를 `children`으로 받기|가능합니다. 서버에서 먼저 렌더링된 결과를 받습니다.|

### 어떤 컴포넌트를 클라이언트 컴포넌트로 만들어야 할까
"상호작용이 필요한 가장 작은 단위"만 클라이언트 컴포넌트로 만드는 것이 원칙입니다. 페이지 전체에 `'use client'`를 선언하면 RSC의 이점을 전부 잃어버립니다. 예를 들어 상품 상세 페이지에서 상품 정보, 설명, 리뷰 목록은 서버 컴포넌트로 두고, 수량을 고르는 셀렉트 박스와 장바구니 버튼만 클라이언트 컴포넌트로 분리합니다.

아래 기준에 하나라도 해당하면 클라이언트 컴포넌트입니다.

- 상태(`useState`)나 이펙트(`useEffect`)를 사용합니다.
- 이벤트 핸들러를 사용합니다.
- 브라우저 API를 사용합니다.
- 클라이언트 전용 라이브러리(상태 관리, 애니메이션 등)를 사용합니다.

## 동작 원리
서버 컴포넌트가 어떻게 브라우저에 도달하는지 알면 제약이 왜 생기는지 이해할 수 있습니다.

### RSC Payload
서버 컴포넌트는 서버에서 실행되어 **RSC Payload**라는 형식으로 직렬화됩니다. 내부적으로 Flight라고 부르는 이 형식은 HTML이 아니라, React 엘리먼트 트리를 한 줄씩 기록한 텍스트입니다. 아래 서버 컴포넌트가 어떤 RSC Payload로 바뀌는지 따라가 보겠습니다.

```tsx
// Page.tsx (서버 컴포넌트)
import Counter from './Counter' // 'use client'

const Page = async () => {
  const note = await db.notes.get(1)
  return (
    <article>
      <h1>{note.title}</h1>
      <Counter initialCount={note.likes} />
    </article>
  )
}
```

`note.title`이 `"Hello"`, `note.likes`가 `3`이라고 하면 서버는 아래와 같은 RSC Payload를 만듭니다. 실제 출력은 더 길지만 구조를 보기 위해 단순화했습니다.

```
0:["$","article",null,{"children":[["$","h1",null,{"children":"Hello"}],["$","$L1",null,{"initialCount":3}]]}]
1:I["./Counter.js",["chunk.js"],"default"]
```

![서버 컴포넌트 트리가 RSC Payload로 바뀌는 모습](/assets/img/posts/react/rsc_payload_mapping.svg)

한 줄이 하나의 항목이고, 각 항목은 `번호:내용` 형태입니다. 엘리먼트는 `["$", 타입, key, props]` 배열로 기록됩니다. `$`는 "이것은 React 엘리먼트다"라는 표시이고, 그 뒤로 `React.createElement(타입, props)`의 인자가 순서대로 옵니다.

- `0:`으로 시작하는 줄은 `Page`가 반환한 엘리먼트 트리입니다. `"article"`, `"h1"` 처럼 일반 HTML 엘리먼트는 태그 이름이 그대로 기록되고, 그 props(`children`)도 그대로 기록됩니다. `h1`의 `children`이 `"Hello"`인 것은 서버에서 `note.title`을 이미 읽어 값으로 바꿔 넣었기 때문입니다. 데이터베이스에서 읽는 코드는 남지 않고 결과만 남습니다.
- `"$L1"`은 클라이언트 컴포넌트 `Counter`의 자리입니다. `Counter`는 RSC Payload를 만드는 단계에서는 실행되지 않으므로 렌더링 결과 대신 "1번 항목에 정의된 컴포넌트가 여기 온다"는 참조로 기록됩니다.
  - `$`: 이 문자열은 값이 아니라 참조라는 표시입니다.
  - `L`: 필요할 때 지연(Lazy)해서 해석하라는 참조 종류입니다.
  - `1`: 가리키는 항목 번호입니다.
- `{"initialCount":3}`은 **서버 컴포넌트가 `Counter`에 넘긴 props**입니다. `<Counter initialCount={note.likes} />`에서 `note.likes`가 서버에서 `3`으로 계산되어 값으로 기록된 것입니다. 브라우저의 `Counter`는 이 값을 props로 받아 렌더링됩니다.
- `1:I[...]`는 `$L1`이 가리키는 클라이언트 컴포넌트가 어느 파일(`./Counter.js`)의 어느 export(`default`)이고, 그 코드를 받으려면 어떤 청크(`chunk.js`)를 내려받아야 하는지를 기록한 모듈 참조입니다.

`$` 뒤의 글자에 따라 참조 종류가 다릅니다. 항목 종류와 참조 형식은 [부록](#부록-rsc-payload-형식)에 정리했습니다.

props가 RSC Payload에 값으로 기록된다는 점이 중요합니다. 서버 컴포넌트에서 클라이언트 컴포넌트로 넘기는 props는 이렇게 텍스트에 담겨 브라우저로 가기 때문에, 앞서 본 것처럼 함수나 클래스 인스턴스는 넘길 수 없고 문자열·숫자·객체처럼 직렬화 가능한 값만 넘길 수 있습니다.

HTML 대신 이 형식을 사용하는 이유는 **React 트리 구조를 유지하기 위해서**입니다. HTML로 받으면 브라우저는 그것이 어떤 컴포넌트였는지 알 수 없습니다. RSC Payload는 React가 그대로 읽어 가상 DOM 트리로 복원할 수 있고, 클라이언트 컴포넌트의 상태를 유지한 채 서버 컴포넌트 부분만 갈아 끼울 수 있습니다.

### 클라이언트에서의 처리
서버에서 `Page`가 반환한 엘리먼트 트리는 텍스트(RSC Payload)로 바뀌어 브라우저로 전달됩니다. 브라우저의 React는 이 텍스트를 한 줄씩 읽어 서버에 있던 것과 같은 모양의 엘리먼트 트리(이하 복원된 트리)를 다시 만듭니다. 이때 복원된 트리는 메모리에만 들고 있고, 아직 화면에 그려지진 않습니다.

복원 과정에서 `"article"`, `"h1"` 같은 일반 엘리먼트는 그대로 트리에 넣습니다. 클라이언트 컴포넌트 참조(`$L1`)를 만나면 `1:I[...]`에 적힌 청크를 내려받아 실제 `Counter` 컴포넌트로 바꾸고, RSC Payload에 기록된 props(`{ initialCount: 3 }`)를 넘깁니다. 서버 컴포넌트가 렌더링한 부분은 JavaScript 실행 없이 트리에 그대로 들어가고, 클라이언트 컴포넌트만 브라우저에서 실행됩니다.

마지막으로 React는 복원된 트리를 화면에 반영합니다. 이 단계는 첫 요청인지 페이지 이동인지에 따라 다르게 진행됩니다.

- **첫 요청**: SSR로 만든 HTML이 이미 화면에 그려져 있으므로, 복원된 트리를 그 HTML에 연결합니다. 연결이 끝나면 클릭 같은 상호작용에 반응할 수 있게 됩니다. 이 과정이 하이드레이션입니다.
- **페이지 이동**: HTML 없이 RSC Payload만 오므로, 복원된 트리를 지금 화면의 트리와 비교해 달라진 부분의 DOM만 새로 만들거나 고칩니다. 바뀌지 않은 클라이언트 컴포넌트는 건드리지 않으므로 입력 중이던 값이나 열어 둔 메뉴 같은 상태가 그대로 남습니다. RSC Payload는 화면 전체가 아니라 바뀌는 부분만 받습니다. 두 페이지가 공유하는 레이아웃은 다시 받지 않습니다.

### Streaming과 Suspense
서버 컴포넌트는 [Suspense](/tech/react/suspense/)와 함께 동작합니다. `async` 서버 컴포넌트가 데이터를 기다리는 동안 상위의 `Suspense`가 `fallback`을 먼저 보내고, 데이터가 준비되면 그 부분의 RSC Payload를 이어서 보냅니다.

```tsx
const Comments = async () => {
  const comments = await db.comments.list() // 느린 쿼리
  return <ul>{comments.map((c) => <li key={c.id}>{c.text}</li>)}</ul>
}

const Page = () => {
  return (
    <article>
      <header>My Blog</header>
      <Suspense fallback={<div className="skeleton" />}>
        <Comments />
      </Suspense>
    </article>
  )
}
```

이때 브라우저가 요청을 두 번 보내는 것은 아닙니다. 요청도 응답도 하나인데, 서버가 응답 본문을 다 만든 뒤 한꺼번에 보내는 대신 준비된 줄부터 먼저 보내고 연결을 열어 둔 채 나머지를 이어서 보냅니다. 그래서 브라우저가 받은 응답 본문은 시간에 따라 이렇게 자라납니다.

```
// 응답 시작 직후
0:["$","article",null,{"children":[
    ["$","header",null,{"children":"My Blog"}],
    ["$","$Sreact.suspense",null,{
      "fallback":["$","div",null,{"className":"skeleton"}],
      "children":"$L2"
    }]
  ]}]
```

```
// Comments 의 await 가 끝난 뒤
0:["$","article",null,{"children":[
    ["$","header",null,{"children":"My Blog"}],
    ["$","$Sreact.suspense",null,{
      "fallback":["$","div",null,{"className":"skeleton"}],
      "children":"$L2"
    }]
  ]}]
2:["$","ul",null,{"children":[["$","li","1",{"children":"첫 댓글"}],["$","li","2",{"children":"둘째 댓글"}]]}]
```

처음 도착한 0번 줄에서 `header`는 기다릴 것이 없어 바로 렌더링 결과가 들어 있고, `Comments` 자리에는 결과 대신 `"$L2"` 참조만 있습니다. 2번 줄은 아직 없으므로 가장 가까운 `Suspense`가 `fallback`을 그려 스켈레톤이 보입니다. 서버에서 `await`가 끝나면 같은 응답에 2번 줄이 덧붙고, React는 이 줄을 받는 순간 `$L2`를 그 트리로 채워 스켈레톤을 댓글로 바꿉니다. 페이지를 다시 요청하거나 전체를 다시 그리는 것이 아니라 비워 뒀던 자리만 채웁니다.

![스트리밍 타임라인](/assets/img/posts/react/rsc_streaming_timeline.svg)

RSC Payload가 한 줄씩 기록되는 텍스트 형식인 이유가 여기에 있습니다. 한 덩어리 JSON이었다면 응답이 끝나야 파싱할 수 있지만, 한 줄이 하나의 완결된 항목이라 도착한 줄부터 읽을 수 있습니다. 각 줄이 번호로 자기 자리를 알고 있어서 `Suspense`가 여러 개일 때 데이터가 준비되는 순서대로 번호와 무관하게 도착해도 문제없습니다.

첫 요청(SSR)에서는 HTML도 같은 방식으로 스트리밍됩니다. 스켈레톤이 들어간 HTML을 먼저 보내고, 나중에 실제 내용과 그것을 스켈레톤 자리로 옮기는 작은 `<script>`를 이어서 보냅니다.

스트리밍은 동적 렌더링에서만 일어납니다. 동적 렌더링에서는 `await`를 기다리는 시간이 요청 처리 중에 생기므로 그 시간을 스트리밍으로 메우지만, 정적 렌더링에서는 `await`가 빌드 중에 이미 끝나 있습니다. 요청이 오면 완성된 RSC Payload 파일을 그대로 보내므로 기다릴 것이 없고, 한 번에 다 도착합니다.

> **동적 렌더링과 정적 렌더링**
>
> 서버 컴포넌트를 언제 실행하느냐에 따른 구분입니다. 동적 렌더링(Dynamic Rendering)은 사용자 요청이 올 때마다 서버 컴포넌트를 실행해 그 결과를 응답합니다. 로그인한 사용자마다 내용이 다른 페이지처럼 요청 시점의 정보가 필요할 때 사용합니다. 정적 렌더링(Static Rendering)은 빌드 시점에 서버 컴포넌트를 한 번 실행해 결과(HTML과 RSC Payload)를 파일로 저장해 두고, 요청이 오면 그 파일을 그대로 응답합니다. 블로그 포스트처럼 누가 보든 같은 페이지에 사용합니다. Next.js는 요청 시점의 정보(쿠키, 헤더, 검색 파라미터 등)를 사용하지 않는 페이지를 기본적으로 정적 렌더링합니다.

## SSR과의 차이
RSC를 처음 접하면 SSR과 혼동하기 쉽습니다. 둘은 다른 문제를 해결하는 다른 기술이고, 함께 사용됩니다.

|구분|SSR|RSC|
|:--|:--|:--|
|서버가 만드는 것|HTML|RSC Payload (React 트리)|
|클라이언트로 전달되는 코드|모든 컴포넌트의 JavaScript|클라이언트 컴포넌트의 JavaScript만|
|하이드레이션|모든 컴포넌트|클라이언트 컴포넌트만|
|해결하는 문제|첫 화면 표시 속도, SEO|번들 크기, 데이터 접근|
|화면 갱신|페이지 전체를 다시 렌더링|서버 컴포넌트 부분만 갱신, 클라이언트 상태 유지|

Next.js App Router에서 첫 요청을 처리하는 과정을 보면 둘이 어떻게 함께 쓰이는지 알 수 있습니다.

1. 서버 컴포넌트를 실행해 RSC Payload를 만듭니다.
2. RSC Payload와 클라이언트 컴포넌트를 사용해 HTML을 만듭니다. (SSR)
3. HTML과 RSC Payload를 함께 브라우저로 보냅니다. 별도 요청이 아니라 HTML 응답 안에 RSC Payload가 `<script>` 태그로 실려 갑니다. HTML은 JavaScript 실행 전에 화면을 바로 그리기 위한 것이고, RSC Payload는 React가 그 HTML이 어떤 트리였는지 알고 하이드레이션하기 위한 것입니다.
4. 브라우저는 HTML을 먼저 그리고, RSC Payload로 React 트리를 복원한 뒤 클라이언트 컴포넌트만 하이드레이션합니다.

![첫 요청 처리 흐름](/assets/img/posts/react/rsc_first_request.svg)

SSR 없이 RSC만 사용할 수도 있습니다. 이 경우 브라우저는 빈 HTML과 RSC Payload를 받아 클라이언트에서 트리를 그립니다. 서버 컴포넌트의 번들 절감 효과는 그대로 얻을 수 있지만 첫 화면 표시는 느려집니다.

## Server Actions
RSC와 함께 소개된 기능으로 Server Actions(React 19에서는 Server Functions)가 있습니다. `'use server'` 지시어를 선언한 함수는 서버에서만 실행되고, 클라이언트 컴포넌트에서는 이 함수를 호출하는 것처럼 보이지만 실제로는 서버에 요청을 보냅니다.

```tsx
// actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import db from './database'

export const addNote = async (formData: FormData) => {
  await db.notes.create({ title: formData.get('title') })
  revalidatePath('/notes')
}

// NoteForm.tsx
'use client'

import { addNote } from './actions'

const NoteForm = () => {
  return (
    <form action={addNote}>
      <input name="title" />
      <button type="submit">추가</button>
    </form>
  )
}
```

`'use client'`가 "이 파일은 클라이언트 영역"을 뜻하는 것과 달리, `'use server'`는 "이 함수는 서버에서 실행된다"를 뜻합니다. 서버 컴포넌트 파일에 `'use server'`를 선언하는 것이 아니라는 점에 주의해야 합니다. 서버 컴포넌트는 지시어 없이 기본값이고, `'use server'`는 클라이언트에서 호출할 수 있는 서버 함수를 만드는 지시어입니다.

클라이언트 컴포넌트가 `addNote`를 import 하지만, 브라우저로 가는 번들에 `addNote`의 코드가 들어가지는 않습니다. 빌드할 때 번들러가 `'use server'` 파일에서 export 한 함수마다 고유한 ID를 붙입니다. 그리고 클라이언트 번들에는 원래 함수 대신, 서버에 "이 ID의 함수를 실행해 달라"고 요청을 보내는 가짜 함수를 넣습니다. 데이터베이스에 접근하는 진짜 코드는 서버에만 있습니다.

```ts
// 클라이언트 번들에 실제로 들어가는 코드 (개념 코드)
export const addNote = createServerReference('a1b2c3...')
// 호출하면 → fetch(현재 URL, { method: 'POST', headers: { 'Next-Action': 'a1b2c3...' }, body: 직렬화된 인자 })
```

클라이언트에서 `addNote(formData)`를 호출하면 이 가짜 함수가 서버로 POST 요청을 보냅니다. 서버는 요청에 담긴 ID로 실제 `addNote`를 찾아 실행하고, 반환값을 직렬화해 응답합니다. `revalidatePath`를 호출했다면 갱신된 RSC Payload도 같은 응답에 함께 내려와 화면이 갱신됩니다. 인자와 반환값은 RSC Payload와 같은 규칙으로 직렬화되므로 직렬화할 수 있는 값이어야 합니다. 앞서 함수는 직렬화할 수 없다고 했는데, Server Function만 예외인 이유가 이것입니다. 함수 본문 대신 ID 하나만 직렬화하면 되기 때문입니다. [부록](#부록-rsc-payload-형식)의 `$F` 참조가 그 자리입니다.

이 때문에 `'use server'` 파일에는 몇 가지 제약이 있습니다.

- export 할 수 있는 것은 `async` 함수뿐입니다. 클라이언트에서 호출하면 항상 네트워크를 타기 때문입니다. 상수나 동기 함수를 export 하면 빌드 에러가 납니다.
- export 한 함수는 모두 클라이언트에서 호출할 수 있는 엔드포인트가 됩니다. ID만 알면 누구나 요청을 보낼 수 있으므로, 함수 안에서 인증과 권한 검사를 직접 해야 합니다. 내부에서만 쓰는 헬퍼는 export 하지 않아야 합니다.

이런 제약이 있지만 장점이 분명합니다. 데이터를 추가하거나 수정, 삭제할 때마다 API 엔드포인트를 만들고 `fetch`로 요청을 보내던 코드가 함수 호출 하나로 줄어듭니다. 데이터를 읽는 일은 서버 컴포넌트가 직접 하면 되므로, Server Actions는 데이터를 쓰는 쪽을 담당합니다.

## 주의할 점
RSC를 실제 프로젝트에 적용하면서 자주 겪는 문제들입니다.

### 서버 전용 코드의 유출
클라이언트 컴포넌트에서 서버 컴포넌트를 import 하면, 그 컴포넌트가 `async`처럼 클라이언트에서 할 수 없는 일을 하고 있을 때는 에러로 드러납니다. 하지만 서버 컴포넌트가 사용하던 데이터베이스 모듈 같은 일반 모듈은 import 해도 에러 없이 조용히 클라이언트 번들에 들어갑니다. 그러면 데이터베이스 접속 정보 같은 비밀 값이 브라우저로 노출될 수 있습니다. `server-only` 패키지를 서버 전용 모듈에 import 해 두면, 그 모듈이 클라이언트 번들에 포함될 때 빌드 에러가 발생합니다.

```ts
import 'server-only'

export const db = createConnection(process.env.DATABASE_URL)
```

### Context
서버 컴포넌트는 `createContext`와 `useContext`를 사용할 수 없습니다. 테마나 인증 상태처럼 앱 전체에서 쓰는 Context는 다음과 같이 만듭니다.

1. Context Provider를 클라이언트 컴포넌트로 만들고, `children` 자리는 비워 둡니다. 아래 코드의 `ThemeProvider`입니다.
2. 서버 컴포넌트에서 그 Provider를 사용하고, 비워 둔 자리에 서버 컴포넌트를 넣습니다. 아래 코드의 `Layout`입니다.

```tsx
// ThemeProvider.tsx
'use client'

export const ThemeProvider = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState(initialTheme)
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

// layout.tsx (서버 컴포넌트)
const Layout = () => {
  return (
    <ThemeProvider initialTheme="light">
      <Header /> {/* 서버 컴포넌트 */}
    </ThemeProvider>
  )
}
```

그럼 서버 컴포넌트는 테마를 어떻게 알 수 있을까요? `useState`에 들어 있는 테마 값은 브라우저 메모리에만 있어서 서버 컴포넌트는 알 방법이 없습니다. 서버 컴포넌트도 테마에 따라 다르게 렌더링해야 한다면, 테마를 쿠키에 저장하고 서버 컴포넌트는 쿠키를 읽으면 됩니다.

```tsx
// theme.ts (서버 전용 모듈)
import { cookies } from 'next/headers'

export const getTheme = async () => {
  return (await cookies()).get('theme')?.value ?? 'light'
}

// actions.ts
'use server'

import { cookies } from 'next/headers'

export const saveTheme = async (theme: string) => {
  (await cookies()).set('theme', theme)
}

// ThemeProvider.tsx
'use client'

import { saveTheme } from './actions'

export const ThemeProvider = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState(initialTheme)
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next) // 지금 화면의 클라이언트 컴포넌트를 위해
    saveTheme(next) // Server Action 으로 쿠키를 갱신합니다. 서버 컴포넌트도 다시 렌더링됩니다.
  }
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

// layout.tsx (서버 컴포넌트)
const Layout = async () => {
  const theme = await getTheme()
  return (
    <ThemeProvider initialTheme={theme}>
      <Header />
    </ThemeProvider>
  )
}

// Header.tsx (서버 컴포넌트)
const Header = async () => {
  const theme = await getTheme()
  return <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} />
}
```

서버 컴포넌트인 `Layout`과 `Header`는 쿠키에서 테마를 읽습니다. `ThemeProvider`는 서버에서 읽은 테마를 `initialTheme`으로 받아 `useState`의 초기값으로 씁니다. 사용자가 테마를 바꾸면 클라이언트에서 상태를 바꾸는 동시에 Server Action으로 쿠키도 갱신합니다. `next/headers`의 `cookies()`는 서버 전용 API라서 클라이언트 컴포넌트에서는 직접 쓸 수 없기 때문입니다. Server Action이 쿠키를 바꾸면 Next.js는 갱신된 RSC Payload를 응답에 함께 내려보내므로, `Header`의 로고도 다음 요청을 기다리지 않고 바로 새 테마로 바뀝니다.

정리하면 서버 컴포넌트와 클라이언트 컴포넌트 사이에서 값을 주고받는 방법은 다음과 같습니다. 클라이언트에서 서버로 가는 값은 "지금 당장" 서버 컴포넌트에 전달되는 것이 아니라, 다음 요청에 실려 가서 서버 컴포넌트가 그때 읽는다는 점이 중요합니다.

|방향|방법|
|:--|:--|
|서버 컴포넌트에서 클라이언트 컴포넌트로|props로 전달합니다. RSC Payload에 실려 갑니다.|
|클라이언트에서 서버 컴포넌트로|HTTP 요청에 실을 수 있는 것이면 됩니다. 테마나 세션처럼 계속 유지되는 값은 쿠키, 정렬이나 필터처럼 페이지의 상태는 URL(`params`, `searchParams`), 데이터를 바꿀 때는 Server Action의 인자를 사용합니다.|
|서버 컴포넌트끼리|props로 전달합니다. 여러 곳에서 같은 조회를 반복한다면 `React.cache`로 중복 실행을 막습니다.|

### 같은 데이터를 여러 서버 컴포넌트에서 조회할 때
앞의 테마 예제에서 `getTheme`은 `Layout`과 `Header`에서 각각 호출되지만, 쿠키를 읽는 비용은 무시할 만합니다. 반면 로그인한 사용자 정보처럼 데이터베이스를 조회해야 하는 값을 여러 서버 컴포넌트가 필요로 한다면, 호출할 때마다 조회가 반복됩니다. 이때는 그 함수를 `React.cache`로 감쌉니다. 한 요청, 즉 한 화면을 그리는 동안 같은 인자로 여러 번 호출해도 처음 한 번만 실행되고 결과가 재사용됩니다. 요청이 끝나면 캐시도 사라지므로 다음 요청에서는 다시 조회하고, 다른 사용자의 데이터와 섞이지도 않습니다.

```ts
import { cache } from 'react'

export const getUser = cache(async () => {
  const sid = (await cookies()).get('sid')?.value
  return await db.users.findBySession(sid)
})
```

### 서드파티 라이브러리
`'use client'`가 없는 서드파티 컴포넌트 라이브러리를 서버 컴포넌트에서 import 하면, 그 라이브러리가 `useState` 같은 훅을 사용하는 경우 에러가 발생합니다. 라이브러리가 RSC를 지원하기 전까지는 `'use client'`를 선언한 파일에서 한 번 감싸서 다시 export 해 사용합니다.

```tsx
'use client'

export { Carousel } from 'some-carousel-library'
```

### 클라이언트 컴포넌트도 서버에서 실행된다
`'use client'`를 선언했다고 해서 서버에서 실행되지 않는 것은 아닙니다. SSR 단계에서 클라이언트 컴포넌트도 서버에서 한 번 실행되어 HTML을 만듭니다. `'use client'`는 "브라우저에서도 실행된다"는 뜻이지 "브라우저에서만 실행된다"는 뜻이 아닙니다. 따라서 클라이언트 컴포넌트에서 `window`를 렌더링 중에 바로 참조하면 서버에서 에러가 발생합니다. 브라우저 API는 `useEffect` 안에서 사용해야 합니다.

### `'use client'`를 빠뜨리면 언제 에러가 날까
`useState`를 쓰는 컴포넌트를 서버 컴포넌트에서 import 하면서 `'use client'`를 빠뜨리면 에러가 납니다. 다만 어느 시점에 나는지는 무엇을 잘못했는지와 배포 방식에 따라 다릅니다.

|잘못한 것|정적 렌더링|동적 렌더링|
|:--|:--|:--|
|`useState` 같은 훅 사용|빌드 에러|빌드 에러|
|`onClick` 같은 함수 props 전달|빌드 에러|요청 시 런타임 에러 (500)|

훅 사용은 컴파일러가 잡습니다. 서버 영역의 파일이 `react`에서 `useState`를 import 하는지는 코드를 실행하지 않아도 import 문만으로 알 수 있기 때문에, 배포 방식과 무관하게 빌드 단계에서 에러가 납니다. 반면 함수 props는 import 문만 봐서는 알 수 없습니다. 실제로 렌더링해서 RSC Payload를 만들다가 함수를 직렬화하려는 순간에야 드러나므로, 에러 시점이 렌더링 시점을 따라갑니다. 정적 렌더링은 빌드 중에 페이지를 렌더링하므로 빌드에서 걸리고, 동적 렌더링은 요청이 들어와 그 페이지를 렌더링할 때 납니다.

빌드나 런타임에 에러가 난다고 해서 개발 중에 발견하기 어려운 것은 아닙니다. 개발 서버(`next dev`)는 페이지를 요청하는 순간 그 페이지를 컴파일하고 렌더링하므로, 훅 에러든 함수 props 에러든 브라우저에서 페이지를 여는 즉시 에러 오버레이로 확인할 수 있습니다. 개발 중에 한 번도 열어 보지 않은 페이지에서만 발견이 늦어지는데, 이런 페이지는 CI 빌드와 E2E 테스트로 거를 수 있습니다.

### 스트리밍과 프록시 버퍼링
스트리밍은 서버가 응답을 조각으로 보내야 동작하는데, 서버와 브라우저 사이에 있는 프록시, CDN, 로드 밸런서 중에는 응답을 전부 모았다가 한 번에 전달하는 것들이 있습니다. 이런 버퍼링이 끼어 있으면 서버가 스트리밍해도 브라우저에는 렌더링이 끝난 뒤에 한꺼번에 도착하고, 스켈레톤은 보이지 않은 채 응답 시간만 길어집니다. 코드와 서버 설정이 모두 정상이라 원인을 찾기 어려운 문제입니다.

Vercel이나 Node 서버를 직접 띄우는 경우에는 문제가 없습니다. Nginx 같은 프록시를 앞에 둔다면 해당 경로의 버퍼링을 꺼야 합니다.

```nginx
location / {
  proxy_pass http://next;
  proxy_buffering off;
}
```

### 서버 부하
서버 컴포넌트를 사용하면 서버가 하는 일이 늘어납니다. 이전에는 서버가 데이터만 주고 렌더링은 수많은 브라우저가 나눠서 했는데, 이제 서버 컴포넌트 부분의 렌더링을 서버가 떠안습니다. 요청마다 렌더링하는 동적 페이지라면 서버 CPU 사용량이 늘어납니다.

React와 Next.js는 이 비용을 상쇄하는 장치를 함께 제공합니다.

- **정적 렌더링과 캐시**: 요청마다 바뀌지 않는 페이지는 빌드 시점이나 첫 요청 때 한 번만 렌더링하고 결과(HTML과 RSC Payload)를 캐시합니다. 모든 페이지가 정적 렌더링이라면 빌드 결과물을 파일로만 배포할 수 있어 서버 렌더링 비용이 요청당 0이고, CDN에 올리면 서버 자체가 없습니다.
- **API 계층의 부담 감소**: 렌더링 비용이 늘어난 만큼 다른 쪽에서 줄어드는 부분도 있습니다. 브라우저가 API를 여러 번 호출하던 것이 서버 안에서의 함수 호출로 바뀌므로, 요청마다 반복되던 인증 확인과 응답 직렬화가 줄어듭니다. 화면에 필요한 데이터만 꺼내 쓰면 되니 범용 API가 돌려주던 불필요한 데이터도 없어집니다. 전체 계산량이 줄어드는 것은 아니고, API 계층이 무거웠던 서비스일수록 상쇄 폭이 큽니다.
- **부분 갱신**: 페이지 이동이나 갱신 시 바뀐 서버 컴포넌트 부분의 RSC Payload만 만들므로, 전체 페이지를 다시 SSR 하는 것보다 가볍습니다.

정리하면 동적 페이지는 서버가 더 일하지만, 대부분의 페이지를 정적 렌더링과 캐시로 돌릴 수 있다면 전체 비용은 오히려 줄어듭니다. 반대로 모든 페이지가 사용자마다 다르고 캐시할 수 없는 서비스라면 서버 비용 증가를 감수해야 합니다. RSC가 모든 서비스에 맞는 선택은 아닌 이유 중 하나입니다.

## 부록: RSC Payload 형식
RSC Payload 형식은 React 내부 구현(`react-server-dom-webpack` 등 `react-server-dom-*` 패키지)이고 공식 문서가 없으며 버전에 따라 바뀔 수 있습니다. 여기 적은 내용은 React 19 기준이며, 직접 만들거나 파싱할 일은 없고 구조를 이해하는 용도로만 보면 됩니다. Next.js에서는 페이지 요청에 `RSC: 1` 헤더를 붙이거나, 브라우저 개발자 도구의 네트워크 탭에서 페이지 이동 시 발생하는 `?_rsc=...` 요청의 응답을 보면 실제 RSC Payload를 확인할 수 있습니다.

### 항목(Row)
RSC Payload는 줄 단위의 텍스트이고, 한 줄이 하나의 항목입니다. 본문에서 본 두 줄을 다시 보겠습니다.

```
0:["$","article",null,{"children":[...]}]
1:I["./Counter.js",["chunk.js"],"default"]
```

- 줄 맨 앞의 `0`, `1`이 항목의 번호입니다. 다른 줄에서 `$L1`처럼 이 번호로 항목을 가리킵니다.
- 콜론 바로 뒤에 영문자 한 글자가 있으면 그 글자가 항목의 종류를 나타내는 태그입니다. `1:I[...]`의 `I`는 import 정보라는 뜻입니다.
- `0:[...]`처럼 콜론 뒤에 태그 없이 바로 JSON이 오면, 그 줄은 React 엘리먼트 트리입니다. JSX를 실행한 결과인 중첩된 엘리먼트 객체를 JSON으로 적은 것입니다. 트리 대신 props로 넘긴 숫자나 객체 같은 값이 단독으로 오기도 합니다.

태그의 종류는 다음과 같습니다.

|형태|종류|설명|
|:--|:--|:--|
|`0:[...]`|모델|JSON으로 기록된 엘리먼트 트리, 또는 props 값입니다. `0`번이 보통 페이지의 루트입니다.|
|`1:I[...]`|Import|클라이언트 컴포넌트의 모듈 참조입니다. `[모듈 경로, [청크 목록], export 이름]` 순서로 기록됩니다.|
|`2:H[...]`|Hint|스타일시트나 스크립트를 미리 불러오라는 리소스 힌트입니다. `preload`, `preconnect` 같은 정보가 담깁니다.|
|`3:T...`|Text|긴 문자열입니다. JSON 이스케이프 비용을 줄이기 위해 길이와 함께 따로 기록됩니다.|
|`4:E{...}`|Error|서버 렌더링 중 발생한 에러입니다. 클라이언트에서 가장 가까운 Error Boundary로 던져집니다.|

스트리밍으로 나중에 도착한 항목도 같은 번호 규칙으로 연결됩니다. 먼저 받은 트리에 `$L2`가 있고 `2:` 항목이 아직 없다면, 뒤에 `2:` 줄이 도착하는 순간 그 자리에 채워집니다.

### 엘리먼트
React 엘리먼트는 `["$", 타입, key, props]` 배열로 기록됩니다. `React.createElement(타입, { key, ...props })`의 인자를 순서대로 적은 것입니다.

```
["$","h1",null,{"children":"Hello"}]
["$","$L1",null,{"initialCount":3}]
["$","$Sreact.fragment",null,{"children":[...]}]
```

- 타입이 문자열이면 `"h1"` 같은 HTML 엘리먼트입니다.
- 타입이 `$L1` 같은 참조이면 클라이언트 컴포넌트입니다. 서버 컴포넌트는 서버에서 실행되어 이미 사라졌으므로 타입으로 등장하지 않습니다.
- `Fragment`, `Suspense` 같은 React 내장 타입은 심볼이라 `$S` 참조로 기록됩니다.
- `props`의 `children`에는 문자열, 엘리먼트, 배열이 그대로 중첩됩니다.

### 참조
RSC Payload 안의 문자열이 `$`로 시작하면 값이 아니라 참조입니다. `$` 뒤의 한 글자가 참조의 종류를 결정하고, 그 뒤에 항목 번호나 값이 옵니다.

|형태|뜻|
|:--|:--|
|`$$...`|`$`로 시작하는 진짜 문자열. `$$abc`는 문자열 `$abc`입니다.|
|`$1`|1번 항목을 바로 참조합니다. 같은 값을 여러 곳에서 쓸 때 중복 기록을 피하기 위해 사용됩니다.|
|`$L1`|1번 항목을 지연(Lazy) 참조합니다. 필요할 때 해석하며, 클라이언트 컴포넌트 참조가 대표적입니다.|
|`$@1`|1번 항목을 Promise로 참조합니다. 서버 컴포넌트가 클라이언트 컴포넌트에 Promise를 props로 넘겼을 때 쓰이며, 클라이언트에서는 `use()`로 읽습니다. 항목이 도착하면 Promise가 resolve 됩니다.|
|`$F1`|1번 항목의 Server Function 참조입니다. `'use server'` 함수를 props로 넘기면 함수 본문이 아니라 서버의 어떤 함수를 호출할지에 대한 ID만 기록됩니다.|
|`$S이름`|`Symbol.for(이름)` 심볼입니다. `$Sreact.fragment`, `$Sreact.suspense` 처럼 React 내장 타입에 쓰입니다.|
|`$D...`|`Date` 값입니다. ISO 문자열이 뒤따릅니다.|
|`$n...`|`BigInt` 값입니다.|
|`$undefined`|`undefined`입니다. JSON에 없는 값이라 따로 표기합니다.|
|`$NaN`, `$Infinity`, `$-Infinity`, `$-0`|JSON으로 표현할 수 없는 숫자들입니다.|
|`$Q1`, `$W1`|1번 항목으로 기록된 `Map`, `Set`입니다.|
|`$K1`, `$B1`|1번 항목으로 기록된 `FormData`, `Blob`입니다. 주로 Server Function의 인자로 쓰입니다.|
|`$T1`|임시 참조(Temporary Reference)입니다. 클라이언트에서 Server Function에 넘긴 직렬화 불가능한 값을 응답에서 그대로 돌려받기 위한 자리입니다.|

이 표는 "서버 컴포넌트에서 클라이언트 컴포넌트로 어떤 props를 넘길 수 있는가"에 대한 정확한 답이기도 합니다. props는 RSC Payload에 글자로 적혀야 하는데, RSC Payload에 적을 수 있는 값은 두 종류뿐입니다. JSON이 원래 표현할 수 있는 문자열, 숫자, 불리언, `null`, 배열, 일반 객체와, 이 표의 `$` 참조로 표현되는 값입니다. 그래서 `Date`, `Map`, `Set`, `Promise`, Server Function은 전용 참조가 있어 넘길 수 있고, 일반 함수나 클래스 인스턴스는 해당하는 참조가 없어 넘길 수 없습니다.

##### 참고
- [https://react.dev/reference/rsc/server-components](https://react.dev/reference/rsc/server-components)
- [https://react.dev/reference/rsc/use-client](https://react.dev/reference/rsc/use-client)
- [https://react.dev/reference/rsc/server-functions](https://react.dev/reference/rsc/server-functions)
- [https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [https://nextjs.org/docs/app/getting-started/server-and-client-components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [https://www.plasmic.app/blog/how-react-server-components-work](https://www.plasmic.app/blog/how-react-server-components-work)
- [https://www.joshwcomeau.com/react/server-components/](https://www.joshwcomeau.com/react/server-components/)
