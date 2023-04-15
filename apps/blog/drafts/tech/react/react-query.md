---
layout: post
title: '[React] React Query 톺아보기'
featured-img: react/react.png
category: [tech, react]
summary:
---

이번 포스트에서는 비동기 작업을 도와주는 라이브러리인 React Query를 살펴보도록 하겠습니다.

## React Query 기본 개념

## React Query 세팅하기

## API

### uesQuery

### useQueries

### useInfiniteQuery

### useMutation

### useIsFetching, useIsMutating

### useQueryClient
- 쿼리 필터링

### 그 밖에..

## 부록

## React Suspense

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
