---
layout: post
title: '[React] TanStack Query (aka. React Query)'
featured-img: react/tanstack-query.png
category: [tech, react]
summary: TanStack Query는 비동기 작업 처리를 돕는 라이브러리입니다. v3까지는 React Query라는 이름으로 React만 지원했는데, v4 부터 React 이외의 프레임워크(Vue, Svelte, Solid)에서 사용할 수 있도록 업데이트 되며 TanStack Query로 이름이 변경되었습니다.
---

TanStack Query는 비동기 작업 처리를 돕는 라이브러리입니다. v3까지는 React Query라는 이름으로 React만 지원했는데, v4 부터 React 이외의 프레임워크(Vue, Svelte, Solid)에서 사용할 수 있도록 업데이트 되며 TanStack Query로 이름이 변경되었습니다.

이번 포스트에서는 React에서 TanStack Query를 사용하는 방법을 살펴보도록 하겠습니다. TanStack의 `react-query`를 가져와 사용하기 때문에 이번 포스트에서는 React Query라는 명칭을 사용하도록 하겠습니다.

## 역할
웹 서비스를 개발할 때 백엔드 API를 호출해서 데이터를 가져오는데, 이 과정은 비동기로 동작합니다. React Query는 가져온 데이터를 캐시하여 최적화 하거나, 에러 처리, 데이터를 가져오는 중임을 나타내는 등의 유틸 기능을 제공합니다. React Query에서 제공하는 기능들을 사용하면, 비동기 작업(API 호출하는 등...)을 좀 더 효율적이고 간단하게 처리할 수 있게 됩니다.

## 기본 개념
React Query를 사용할 때 자주 접하게 되는 React Query의 중요한 개념들과 설정들을 살펴보도록 하겠습니다.

### Query와 Mutation
React Query를 사용하다 보면 Query와 Mutation이라는 단어를 많이 접하게 되는데, Query는 서버에서 데이터를 가져오는 작업을 Mutation은 서버의 데이터를 변경하는 부수효과가 있는 작업을 이야기합니다. Query를 위해서 `useQuery` 훅을 많이 사용하게 되고, Mutation을 위해서 `useMutation` 훅을 많이 사용하게 됩니다.

`useQueries`와 `useInfiniteQuery` 훅은 `useQuery`와 동일하게 서버에서 데이터를 가져올 때 사용되는 훅입니다. 여러 데이터를 병렬로 가져와야 할 때는 `useQueries` 훅을 무한 스크롤과 같이 계속해서 데이터를 가져와야 할 경우 `useInfiniteQuery` 훅을 사용할 수 있습니다.

### refetch
`useQuery`, `useQueries`, `useInfiniteQuery`는 설정 값에 따라 다르지만 기본 값으로 설정된 경우 아래와 같은 경우에 자동으로 데이터를 가져옵니다.

- `useQuery`를 사용한 컴포넌트가 마운트 되었을 때
- 윈도우가 다시 포커스 되었을 때
- 네트워크가 다시 연결되었을 때
- `refetchInterval` 설정 하여 반복적으로 refetch 되도록 설정 했을 때

### retry
`retry` 설정에 따라 Query 혹은 Mutation 작업이 실패하면 React Query는 자동으로 재시도를 합니다. `retry` 설정의 기본 값은 3으로 3번 재시도를 하게 됩니다. `retryDelay` 설정을 통해 얼마 간의 간격으로 재시도를 할 것인지 설정할 수 있습니다.

### `staleTime`
`staleTime`은 React Query를 통해 가져온 데이터가 오래된 것으로 인식하게 되는 시간입니다. ms 단위로 저장되는데 기본 값은 0입니다. React Query는 오래된 데이터라고 판단되면 다시 데이터를 가져옵니다. `staleTime`에 설정된 시간 따라 React Query가 동작 하는 방식은 아래와 같습니다.

- 0으로 설정할 경우: 데이터를 가져온 즉시 오래된 데이터로 인식하기 때문에 캐시 된 데이터를 우선 사용한 후 API를 다시 호출하여 새로운 데이터를 응답 받은 후 데이터를 교체합니다.
- 5000으로 설정할 경우
  - 5초 이전에 데이터를 요청한 경우: 최신 데이터로 판단하여 API를 다시 호출하지 않고 캐시된 데이터를 사용합니다.
  - 5초 이후에 데이터를 요청한 경우: 캐시 된 데이터를 오래된 데이터로 판단하여 캐시 된 데이터를 우선 사용한 후, API를 호출하여 새로운 데이터를 응답 받으면 데이터를 교체하고 응답 받은 데이터를 캐시합니다.

`staleTime`은 데이터를 다시 가져올지 판단하는 설정입니다. [CodeSandBox](https://codesandbox.io/s/tanstack-query-staletime-n12m0e)에서 테스트하실 수 있습니다.

### `cacheTime`
`cacheTime`은 데이터를 얼마나 오랫동안 보관 할 것인지 나타내는 시간입니다. ms 단위로 저장되는데 기본 값은 5분(5 * 60 * 1000)입니다. 비활성화 된 데이터는 `cacheTime`에 설정된 시간이 지난 후 가비지 컬렉션 됩니다. `cacheTime`에 설정된 시간 따라 React Query가 동작 하는 방식은 아래와 같습니다.

- 5000으로 설정할 경우
  - 비활성화 된 데이터를 5초 이전에 요청한 경우: 캐시 된 데이터를 우선 사용한 후 API를 호출하여 새로운 데이터를 응답 받으면 응답 받은 데이터를 다시 캐시합니다.
  - 비활성화 된 데이터를 5초 이후에 요청한 경우: 데이터가 이미 가비지 컬렉션 되었기 때문에, 캐시 데이터를 사용하지 못하고 API 응답 데이터를 기다린 후 데이터를 응답 받으면 응답 받은 데이터를 사용하고 캐시합니다.

`cacheTime`은 캐시된 값을 사용할지 판단하는 설정입니다. [CodeSandBox](https://codesandbox.io/s/tanstack-query-cachetime-cr7be7)에서 테스트하실 수 있습니다.

### `queryKey`와 `mutationKey`
React Query는  유니크한 키 값을 사용하여 캐시합니다.

### `queryFn`와 `mutationFn`

## 쿽 스타트
React Query를 React 프로젝트에서 사용하기 위해서 먼저 아래 코드와 같이 `@tanstack/react-query`를 설치해야 합니다.

```bash
$ npm i @tanstack/react-query
# or
$ pnpm add @tanstack/react-query
# or
$ yarn add @tanstack/react-query
```

React Query 설치가 끝나면 아래 코드와 같이 사용할 수 있습니다.

### 기본 값 설정하기

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
