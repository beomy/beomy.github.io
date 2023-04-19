---
layout: post
title: '[React] TanStack Query (aka. React Query)'
featured-img: react/react.png
category: [tech, react]
summary: TanStack Query는 비동기 작업 처리를 돕는 라이브러리입니다. v3까지는 React Query라는 이름으로 React만 지원했는데, v4 부터 React 이외의 프레임워크(Vue, Svelte, Solid)에서 사용할 수 있도록 업데이트 되며 TanStack Query로 이름이 변경되었습니다.
---

TanStack Query는 비동기 작업 처리를 돕는 라이브러리입니다. v3까지는 React Query라는 이름으로 React만 지원했는데, v4 부터 React 이외의 프레임워크(Vue, Svelte, Solid)에서 사용할 수 있도록 업데이트 되며 TanStack Query로 이름이 변경되었습니다.

이번 포스트에서는 React에서 TanStack Query를 사용하는 방법을 살펴보도록 하겠습니다. TanStack의 `react-query`를 가져와 사용하기 때문에 이번 포스트에서는 React Query라는 명칭을 사용하도록 하겠습니다.

## 역할
웹 서비스를 개발할 때 백엔드 API를 호출해서 데이터를 가져오는데, 이 과정은 비동기로 동작합니다. React Query는 가져온 데이터를 캐시하여 최적화 하거나, 에러 처리, 데이터를 가져오는 중임을 나타내는 등의 유틸 기능을 제공합니다. React Query에서 제공하는 기능들을 사용하면, 비동기 작업(API 호출하는 등...)을 좀 더 효율적이고 간단하게 처리할 수 있게 됩니다.

## 기본 개념
React Query의 중요한 개념들과 설정들을 먼저 살펴보도록 하겠습니다.

### query와 mutation
React Query를 사용하다 보면 `useQuery`와 `useMutation` 두 개의 훅을 가장 많이 사용하게 됩니다. 상황에 따라 두 개의 훅 중 하나를 선택해 사용해야 합니다.

query는 get
mutation은 post put delete

### `staleTime`

### `cacheTime`

### `retry`

### `queryKey`와 `mutateKey`

### `queryFn`와 `MutateFn`

## 쿽 스타트
TanStack Query를 React 프로젝트에서 사용하기 위해서 먼저 아래 코드와 같이 `@tanstack/react-query`를 설치해야 합니다.

```bash
$ npm i @tanstack/react-query
# or
$ pnpm add @tanstack/react-query
# or
$ yarn add @tanstack/react-query
```

React Query 설치가 끝나면 아래 코드와 같이 사용할 수 있습니다.

## API

### uesQuery

### useQueries

### useInfiniteQuery

### useMutation

### useQueryClient
- QueryClient
- 쿼리 필터링

### useIsFetching, useIsMutating

### 그 밖에..

## 부록

### TypeScript

### React Suspense

### DevTools

### ESLint

---

이번 포스트에서는 서버 API 호출 등의 비동기 작업을 도와주는 라이브러리인 React Query를 살펴보도록 하겠습니다.

V4 기준으로 작성

## React Query 란
- React Query는 서버 상태를 관리하기 위한 라이브러리입니다.
- 서버에 데이터를 요청하거나 업데이트 하는 등의 비동기 작업의 캐싱을 지원합니다.

## 퀵 스타트
```bash
npm i @tanstack/react-query
# or
pnpm add @tanstack/react-query
# or
yarn add @tanstack/react-query
```

```js
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>
        {query.data?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```

## 기본 옵션

### Stale Data
- 즉시 오래된 값(stale data)로 인지
- `staleTime`

### Auto Refetch
- New instances of the query mount
- The window is refocused
- The network is reconnected
- The query is optionally configured with a refetch interval

### Cache
- 쿼리를 통해 응답 받은 데이터는 즉시 비활성(inactive) 상태가 되며, 재사용되는 경우를 대비하여 5분 간 캐시에 남아 있음
- `cacheTime`

### Retry
- UI에 에러를 표시하기 전 3번 재요청
- `retry`, `retryDelay`

## Query Keys
```js
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

아래와 같은 다양한 형태의 배열도 가능

```js
// An individual todo
useQuery({ queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

아래 쿼리 키는 모두 동일한 것으로 간주됩니다.

```js
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })
```

반면 아래 쿼리 키는 모두 다르기 때문에 순서에 주의해야 합니다.

```js
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

쿼리 키는 유니크하게 관리되어야 하기 때문에 아래 코드와 같이 API를 호출할 때 사용되는 값을 쿼리 키에 전달하는 것이 좋습니다.

```js
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

## Query Functions

쿼리 함수는 `Promise`를 반환하는 함수

```js
useQuery({ queryKey: ['todos'], queryFn: fetchAllTodos })
useQuery({ queryKey: ['todos', todoId], queryFn: () => fetchTodoById(todoId) })
useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId)
    return data
  },
})
useQuery({
  queryKey: ['todos', todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
})
```

`useQuery`의 결과가 에러이려면, 쿼리 함수에서 `Promise.reject`을 반환하거나 `throw new Error`로 에러를 던져줘야 한다.

```js
const { error } = useQuery({
  queryKey: ['todos', todoId],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error('Oh no!')
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error('Oh no!'))
    }

    return data
  },
})
```

쿼리 함수는 아래 코드와 같이 코드를 분리할 수 있다.

```js
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos', { status, page }],
    queryFn: fetchTodoList,
  })
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

> **QueryFunctionContext**
>
> 쿼리 함수의 파라미터를 QueryFunctionContext라고 하는데 QueryFunctionContext 객체는 아래와 같은 필드를 가진다.
>
> - `queryKey: QueryKey`: 쿼리 키
> - `pageParam?: unknown`: 무한 쿼리에서 사용되며, 현재 페이지의 파라미터 정보
> - `signal?: AbortSignal`: 쿼리를 취소하기 위해 사용하는 AbortSignal 인스턴스
> - `meta: Record<string, unknown> | undefined`: 쿼리의 추가 점보를 담는 필드

## Parallel Queries
- 수동 병렬 쿼리
- 동적 병렬 쿼리

## Background Fetching
- isFetching
- useIsFetching

## 쿼리 비활성화

## 쿼리 재시도
- retry
- retryDelay

## 페이징를 위한 쿼리
- keepPreviousData

## 무한 쿼리
- useInfiniteQuery

## 초기값
- initialData
- initialDataUpdatedAt

## Placeholder
- placeholderData: 가짜 데이터

## Prefetching

## Mutation
- `useMutaion`

## 쿼리 무효화
- invalidateQueries: `exact`
- useMuation에서 쿼리 무효화

## 쿼리 업데이트
- setQueryData

## 쿼리 취소 ??

## 쿼리 필터링

## 쿼리 기본 함수

## Suspense
- React Suspense

## ESLint

## 부록

### DevTools

#### 설치
```bash
npm i @tanstack/react-query-devtools
# or
pnpm add @tanstack/react-query-devtools
# or
yarn add @tanstack/react-query-devtools
```

#### Floating Mode
```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

- `process.env.NODE_ENV === 'development'` 일 경우에만 번들에 포함되기 때문에 별도의 제외 조건을 넣지 않아도 됩니다.

##### 옵션

#### Embedded Mode
```tsx
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtoolsPanel style={styles} className={className} />
    </QueryClientProvider>
  )
}
```

##### 옵션

#### Production에서 사용하기


##### 참고
- [https://tanstack.com/query/v4/](https://tanstack.com/query/v4/)
