---
layout: post
title: '[React] TanStack Query (React Query)'
featured-img: react/tanstack-query.png
category: [tech, react]
summary: TanStack Query는 비동기 작업 처리를 돕는 라이브러리입니다. v3까지는 React Query라는 이름으로 React만 지원했는데, v4 부터 React 이외의 프레임워크(Vue, Svelte, Solid)에서 사용할 수 있도록 업데이트 되며 TanStack Query로 이름이 변경되었습니다.
---

TanStack Query는 비동기 작업 처리를 돕는 라이브러리입니다. v3까지는 React Query라는 이름으로 React만 지원했는데, v4 부터 React 이외의 프레임워크(Vue, Svelte, Solid)에서 사용할 수 있도록 업데이트 되며 TanStack Query로 이름이 변경되었습니다.

이번 포스트에서는 React에서 TanStack Query를 사용하는 방법을 살펴보도록 하겠습니다. TanStack의 `react-query`를 가져와 사용하기 때문에 이번 포스트에서는 React Query라는 명칭을 사용하도록 하겠습니다.

## 역할
React Query는 서버의 데이터 가져오기/업데이트, 캐싱, 에러 처리 등을 쉽게 처리할 수 있도록 돕는 라이브러리입니다. 서버에서 가져온 데이터 객체, 에러가 발생했다면 에러 정보를 담는 객체, 데이터 가져오기/엡데이트 중임을 나타내는 등 각종 유틸 기능을 제공합니다. 또한 동시에 동일한 요청을 여러번 해도 한번만 요청을 보내어 최적화 해주기 때문에 비동기 작업(API 호출하는 등...)을 좀 더 효율적이고 간단하게 처리할 수 있게 됩니다.

## 쿽 스타트
React Query를 사용하기 위해서 먼저 아래 코드와 같이 `@tanstack/react-query`를 설치해야 합니다.

```bash
$ npm i @tanstack/react-query
# or
$ pnpm add @tanstack/react-query
# or
$ yarn add @tanstack/react-query
```

React Query 설치가 끝나면 아래 코드와 같이 사용할 수 있습니다.

```tsx
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

React Query를 사용하기 위해서는 `QueryClientProvider` 컴포넌트를 최상단에서 감싸주고 `QueryClient` 인스턴스를 `client` 속성에 넣어줘야 합니다.

## 기본 개념
React Query를 사용할 때 자주 접하게 되는 React Query의 중요한 개념들과 설정들을 살펴보도록 하겠습니다.

### Query와 Mutation
React Query를 사용하다 보면 Query와 Mutation이라는 단어를 많이 접하게 됩니다. Query는 서버에서 데이터를 가져오는 작업으로 `useQuery` 훅을 많이 사용하게 됩니다. Mutation은 서버의 데이터를 변경하는 부수효과가 있는 작업으로 `useMutation` 훅을 많이 사용하게 됩니다. 이런 특징으로 HTTP 메소드의 GET 요청의 경우 `useQuery`를 POST, PUT, PATCH, DELETE 요청의 경우 `useMutation`을 대부분의 경우 사용하게 됩니다.

`useQueries`와 `useInfiniteQuery` 훅은 `useQuery`와 동일하게 서버에서 데이터를 가져올 때 사용되는 훅입니다. 여러 데이터를 병렬로 가져와야 할 때는 `useQueries` 훅을 사용 할 수 있고, 무한 스크롤과 같이 계속해서 데이터를 가져와야 할 경우 `useInfiniteQuery` 훅을 사용할 수 있습니다.

### refetch
`useQuery`, `useQueries`, `useInfiniteQuery`는 설정 값에 따라 다르지만 기본 값으로 설정된 경우 아래와 같은 경우에 자동으로 데이터를 가져옵니다.

- 쿼리를 사용한 컴포넌트가 마운트 되었을 때
- 윈도우가 다시 포커스 되었을 때
- 네트워크가 다시 연결되었을 때
- `refetchInterval` 설정 하여 반복적으로 refetch 되도록 설정 했을 때

### `retry`
`retry` 설정에 따라 Query/Mutation 작업이 실패하면 React Query는 자동으로 재시도를 합니다. Query의 `retry` 기본 값은 3, Mutation의 `retry` 기본 값은 0입니다. `retryDelay` 설정을 통해 얼마 간의 간격으로 재시도를 할 것인지 설정할 수 있습니다.

### `staleTime`
`staleTime`은 React Query를 통해 가져온 데이터가 오래된 것으로 인식하게 되는 시간입니다. ms 단위로 저장되는데 기본 값은 0입니다. React Query는 오래된 데이터라고 판단되면 다시 데이터를 가져옵니다. `staleTime`에 설정된 시간 따라 React Query가 동작 하는 방식은 아래와 같습니다.

- 0으로 설정할 경우: 데이터를 가져온 즉시 오래된 데이터로 인식하기 때문에 캐시 된 데이터를 우선 사용한 후 API를 다시 호출하여 새로운 데이터를 응답 받으면 데이터를 교체합니다.
- 5000으로 설정할 경우
  - 5초 이전에 데이터를 요청한 경우: 최신 데이터로 판단하여 API를 다시 호출하지 않고 캐시된 데이터를 사용합니다.
  - 5초 이후에 데이터를 요청한 경우: 캐시 된 데이터를 오래된 데이터로 판단하여 캐시 된 데이터를 우선 사용한 후, API를 호출하여 새로운 데이터를 응답 받으면 데이터를 교체하고 응답 받은 데이터를 캐시합니다.

`staleTime`은 데이터를 다시 가져올지 판단하는 설정입니다. [CodeSandBox](https://codesandbox.io/s/tanstack-query-staletime-n12m0e)에서 테스트하실 수 있습니다.

### `cacheTime`
`cacheTime`은 데이터를 얼마나 오랫동안 보관 할 것인지 나타내는 시간입니다. ms 단위로 저장되는데 기본 값은 5분(5 * 60 * 1000)입니다. 쿼리 인스턴스가 unmount 되면 데이터는 비활성화(inactive) 상태가 되는데, 비활성화 된 데이터는 `cacheTime`에 설정된 시간이 지난 후 가비지 컬렉션 됩니다. `cacheTime`에 설정된 시간 따라 React Query가 동작 하는 방식은 아래와 같습니다.

- 5000으로 설정할 경우
  - 비활성화 된 데이터를 5초 이전에 요청한 경우: 캐시 된 데이터를 우선 사용한 후 API를 호출하여 새로운 데이터를 응답 받으면 응답 받은 데이터를 다시 캐시합니다.
  - 비활성화 된 데이터를 5초 이후에 요청한 경우: 데이터가 이미 가비지 컬렉션 되었기 때문에, 캐시 데이터를 사용하지 못하고 API 응답 데이터를 기다린 후 데이터를 응답 받으면 응답 받은 데이터를 사용하고 캐시합니다.

`cacheTime`은 캐시된 값을 사용할지 판단하는 설정입니다. [CodeSandBox](https://codesandbox.io/s/tanstack-query-cachetime-cr7be7)에서 테스트하실 수 있습니다.

### `queryKey`
React Query는 `queryKey`를 기반으로 쿼리 캐싱을 관리합니다. 아래 코드와 같이 `queryKey`는 단순 문자열 배열이나, 복잡한 형태의 배열 모두 가능합니다.

```tsx
useQuery({ queryKey: ['todos'], ... })
useQuery({ queryKey: ['something', 'special'], ... })
useQuery({ queryKey: ['todo', 5], ... })
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

#### `queryKey` 배열 순서
`queryKey` 배열의 순서는 동일한 쿼리인지 판단하는 값으로 사용되기 때문에 배열 순서를 신경써 줘야 합니다. 아래 코드와 같이 중첩된 객체의 순서는 동일한 쿼리로 판단합니다.

```tsx
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })
```

하지만 아래 코드와 같이 `queryKey` 배열의 순서가 다르다면 다른 쿼리로 판단합니다.

```tsx
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

### `queryFn`와 `mutationFn`
`queryFn`은 `Promise` 객체를 반환하는 비동기 작업을 수행하는 함수입니다. React Query는 `queryFn`을 실행하여 서버 데이터를 가져오거나 업데이트 합니다. `useQuery` 훅에서는 `queryFn` 필드에 비동기 함수를 정의하고, `useMutation` 훅에서는 `mutationFn` 필드에 비동기 함수를 정의합니다.

#### 에러 처리 방법
`queryFn`, `mutationFn`에서 에러가 발행하면 `Promise.reject(new Error(message))` 혹은 `trow new Error(message)`로 에러를 처리해 줘야 합니다.


#### `QueryFunctionContext`
쿼리 함수(`queryFn`와 `mutationFn`)의 파라미터를 `QueryFunctionContext`라고 하는데 `QueryFunctionContext` 객체는 아래와 같은 필드를 가집니다.

- `queryKey: QueryKey`: 쿼리 키
- `pageParam?: unknown`: 무한 쿼리에서 사용되며, 현재 페이지의 파라미터 정보
- `signal?: AbortSignal`: 쿼리를 취소하기 위해 사용하는 AbortSignal 인스턴스
- `meta: Record<string, unknown> | undefined`: 쿼리의 추가 점보를 담는 필드

`QueryFunctionContext`를 사용하여 아래 코드와 같이 `queryKey`를 참고하는 `queryFn`을 선언할 수 있습니다.

```tsx
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

## 캐싱 라이프 사이클
캐싱 라이프 사이클 과정을 이해하면 React Query를 이해하는데 많은 도움을 줄 수 있습니다.

1. `A`라는 `queryKey`를 가진 `A` 쿼리 인스턴스가 `mount` 됨
2. 네트워크를 통해 데이터를 가져오고(`fetch`), 가져오는 데이터는 `A`라는 `queryKey`로 캐싱 함
3. 이 데이터는 신선한(`fresh`) 상태에서 `staleTime`(기본 값 0) 이후 오래된(`stale`) 상태로 변경됨
4. `A` 쿼리 인스턴스가 `unmount` 됨
5. 캐시는 `cacheTime`(기본 값 5분) 만큰 유지하다가 가비지 컬렉션 됨
6. 만약 `cacheTime`이 지나기 전, A 쿼리 인스턴스가 신선한(`fresh`) 상태라면 새롭게 `mount`되면 캐시된 데이터를 보여줌

## 기본 값 설정
React Query를 사용할 때 `QueryClientProvider` 컴포넌트를 최상단에서 감싸주고 `QueryClient` 인스턴스를 `client` 속성에 넣어줘야 하는데, `QueryClient` 인스턴스를 생성할 때 아래 코드와 같이 기본 값을 설정할 수 있습니다.

```tsx
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
    mutations: {
      retry: 3,
    },
  },
})
```

## 유용한 기능들
React Query를 사용하면 `useQuery`와 `useMutation` 두 훅을 가장 많이 사용하는데, 그 밖에도 사용하면 유용한 기능이 많이 있습니다. 이번에는 React Query에서 자주, 유용하게 사용되는 기능들을 살펴보겠습니다.

### `useQuery`
`useQuery`는 서버의 데이터를 가져오기 위해 사용되는 훅으로 보통 HTTP의 GET 요청시에 사용되는 훅입니다. `useQuery`는 아래 코드와 같은 형태로 사용됩니다. 좀 더 자세한 내용은 [useQuery API Reference](/tech/react/tanstack-query/#uesquery)에서 이야기 하도록 하겠습니다.

```tsx
const {
  data,
  error,
  status,
  ...returns
} = useQuery({
  queryKey,
  queryFn,
  ...options,
})
```

`useQuery`는 `queryKey`와 `queryFn`을 필수로 선언해 줘야 합니다. `queryFn`의 경우 기본 값으로 설정해 둔 함수가 있다면 생략할 수 있습니다. 반환 값으로 응답 데이터를 저장하는 `data`, 에러 정보를 담고 있는 `error`, 쿼리 상태를 담고 있는 `status` 등을 반환하는데, 이 값들은 비동기 처리를 좀 더 간편하게 만들 수 있게 돕습니다.

### `useMutation`
`useMutation`은 서버의 데이터를 변경하기 위해 사용되는 훅으로 보통 HTTP의 POST, PUT, DELETE, PATCH 요청과 같이 부수 효과를 발생하는 요청에서 사용되는 훅입니다. `useMutation`은 아래 코드와 같은 형태로 사용됩니다. 좀 더 자세한 내용은 [useMutation API Reference](/tech/react/tanstack-query/#usemutation)에서 이야기 하도록 하겠습니다.

```tsx
const {
  data,
  error,
  status,
  mutate,
  mutateAsync,
  ...returns
} = useMutation({
  mutationFn,
  ...options,
})
```

`useMutation`은 `mutationFn`을 필수로 선언해 주어야 하지만, 기본 값으로 설정해 둔 `mutationFn`이 있다면 생략할 수 있습니다. `useQuery`와 동일하게 반환 값으로 응답 데이터를 저장하는 `data`, 에러 정보를 담고 있는 `error`, 쿼리 상태를 담고 있는 `status` 등을 반환하는데, 이 값들은 비동기 처리를 좀 더 간편하게 만들 수 있게 돕습니다.

`useMutation`의 반환 값으로 `mutation`과 `mutationAsync` 함수가 있는데, 이 함수를 호출하여 Mutation 요청을 할 수 있습니다. `mutation`와 `mutationAsync` 함수의 차이점은 `mutation` 함수는 요청에 응답 받은 후 결과를 `onSuccess`, `onSettled`, `onError`와 같은 콜백 함수 처리할 수 있고, `mutationAsync` 함수는 `Promise`를 반환하기 때문에 `Promise`의 `then` 혹은 `Async await` 형태로 처리할 수 있습니다.

### `useQueries` - 병렬 쿼리
병렬 쿼리란 동시에 여러 쿼리를 요청하는 방법입니다. 정적으로 정해진 쿼리들을 요청하는 Manual 방법과 동적으로 결정되는 쿼리를 요청하는 Dynamic 방법 2가지 방법을 살펴보도록 하겠습니다.

#### Manual Parallel Queries
병렬 쿼리의 수가 변경되지 않는다면 `useQuery` 훅을 병렬 쿼리 수 만큼 사용하여 병렬 요청을 할 수 있습니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  // ...
}
```

#### Dynamic Parallel Queries
병렬 쿼리의수가 변경된다면 `useQueries` 훅을 사용하여 병렬 요청을 할 수 있습니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      }
    }),
  })
}
```

### `useInfiniteQuery` - 무한 쿼리
`useInfiniteQuery` 훅은 무한 스크롤이나 더 보기 버튼을 제공해야 할 때 사용하기 좋은 기능입니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';

const InfiniteQuery = () => {
  const {
    status,
    data,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: ({ pageParam }) => {
      return new Promise((resolve) => {
        const { page = 3, size = 30 } = pageParam ?? {};
        const list: number[] = [];
        for (let i = 1; i <= size; i++) {
          list.push((page - 1) * 30 + i);
        }
        setTimeout(() => resolve({ list, page, size }), 2000);
      });
    },
    getNextPageParam: (lastPage: any) => {
      const { page, size } = lastPage;
      if (page === 5) return;
      return { page: page + 1, size };
    },
    getPreviousPageParam: (firstPage: any) => {
      const { page, size } = firstPage;
      if (page === 1) return;
      return { page: page - 1, size };
    }
  });

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : (
    <>
      <div>
        <button
          disabled={!hasPreviousPage || isFetchingPreviousPage}
          onClick={() => fetchPreviousPage()}
        >
          이전 데이터
        </button>
      </div>
      <div>
        <div>{isFetchingPreviousPage ? 'Fetching...' : null}</div>
        {data?.pages.map((group: any, i) => (
          <div key={i}>{group.list.join(',')}</div>
        ))}
        <div>{isFetchingNextPage ? 'Fetching...' : null}</div>
      </div>
      <div>
        <button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          다음 데이터
        </button>
      </div>
    </>
  );
};

export default InfiniteQuery;
```

[CodeSandBox](https://codesandbox.io/s/tanstack-query-useinfinitequery-k13bvw?file=/src/InfiniteQuery.tsx)에서 테스트하실 수 있습니다. `useInfiniteQuery`은 `useQuery`와 사용성이 유사하지만 아래와 같이 차이가 있습니다.

#### `data`
`useQuery`의 리턴 값 중 `data` 필드는 비동기 데이터를 저장하는 객체이지만 `useInfiniteQuery`의 `data`필드는 `pages`와 `pageParams` 필드를 포함하는 객체입니다.

- `data.pages`: 무한 쿼리를 통해 가져온 비동기 데이터를 배열의 형태로 저장하고 있는 필드입니다.
- `data.pageParams`: 무한 쿼리를 통해 비동기 데이터를 가져오기 사용한 파라미터를 배열의 형태로 저장하고 있는 필드입니다.

#### `refetch`
`useQuery`의 리턴 값 중 `refetch` 필드를 사용하면 비동기 데이터를 다시 가져올 수 있습니다. 사용성은 다르지만 `useInfiniteQuery`도 마찬가지로 `refetch` 필드를 사용하여 데이터를 다시 가져올 수 있습니다. 아래 코드와 같이 `refetch`를 사용할 수 있습니다.

```tsx
const { refetch } = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
})

// only refetch the first page
refetch({ refetchPage: (page, index) => index === 0 })
```

#### `fetchNextPage`, `fetchPreviousPage`
`useInfiniteQuery`의 리턴 값 중 `fetchNextPage`, `fetchPreviousPage` 필드를 사용하여 이전/다음 데이터를 가져올 수 있습니다.

- `fetchNextPage`: 다음 페이지 데이터를 가져올 수 있습니다.
- `fetchPreviousPage`: 이전 페이지 데이터를 가져올 수 있습니다.

#### `getNextPageParam`, `getPreviousPageParam`
`fetchNextPage`, `fetchPreviousPage` 필드를 사용하여 이전/다음 데이터를 가져올 때, `getNextPageParam`, `getPreviousPageParam` 옵션을 사용하여 이전/다음 데이터를 가져오기 위한 파라미터를 설정할 수 있습니다.

- `getNextPageParam`: `getNextPageParam` 함수에서 리턴하는 값은 `fetchNextPage` 필드로 다음 데이터를 가져올 때 사용됩니다.
- `getPreviousPageParam`: `getPreviousPageParam` 함수에서 리턴하는 값은 `fetchPreviousPage` 필드로 이전 데이터를 가져올 때 사용됩니다.

#### `hasNextPage`, `hasPreviousPage`
`hasNextPage`, `hasPreviousPage` 필드를 통해 이전/다음 데이터가 있는지 확인 할 수 있습니다.

- `hasNextPage`: 다음 데이터가 존재하면 `true`, 존재하지 않는다면 `false`가 됩니다. `getNextPageParam` 함수의 반환 값이 `undefined` 이외의 값일 경우 `hasNextPage`의 값은 `true`가 됩니다.
- `hasPreviousPage`: 이전 데이터가 존재하면 `true`, 존재하지 않는다면 `false`가 됩니다. `getPreviousPageParam` 함수의 반환 값이 `undefined` 이외의 값일 경우 `hasNextPage`의 값은 `true`가 됩니다.

#### `isFetchingNextPage`, `isFetchingPreviousPage`
`isFetchingNextPage`, `isFetchingPreviousPage` 필드를 통해 이전/다음 데이터를 가져오는 중인지 확인 할 수 있습니다.

- `isFetchingNextPage`: 다음 페이지 데이터를 가져오는 중인지 표시하는 플레그입니다.
- `isFetchingPreviousPage`: 이전 페이지 데이터를 가져오는 중인지 표시하는 플레그입니다.

### 쿼리의 옵션 값과 반환 값
`useQuery`, `useQueries`, `useInfiniteQuery` 등의 쿼리를 사용할 때 함께 사용하면 유용한 옵션 값과 반환 값 몇가지를 살펴보도록 하겠습니다.

#### `select` 옵션
`select` 옵션을 사용하여 쿼리 함수에서 반환된 데이터를 변환하거나 선택할 수 있습니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
import { useQuery } from "@tanstack/react-query";

const QuerySelect = () => {
  const { data } = useQuery({
    queryKey: ["project"],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([1, 2, 3, 4, 5, 6]), 2000);
      });
    },
    select: (value: any) => value.filter((x: any) => x % 2 === 0)
  });

  return <div>{data?.join(",")}</div>;
};

export default QuerySelect;
```

위의 코드는 쿼리 함수는 1부터 6까지 숫자의 배열을 반환하지만, `select` 옵션을 사용하여 짝수 배열 값만 얻는 예제입니다. [CodeSandBox](https://codesandbox.io/s/tanstack-query-query-select-3qkbeb?file=/src/QuerySelect.tsx)에서 확인할 수 있습니다.

#### `enabled` 옵션
쿼리는 보통 마운트 되면서 자동으로 쿼리 함수를 실행해 비동기 데이터를 가져오는데, `enabled` 옵션을 `false`로 설정하여 마운트 되었을 때 자동으로 비동기 데이터를 가져오지 않도록 할 수 있습니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const QueryEnable = () => {
  const [isEnable, setEnable] = useState(false);
  const { data } = useQuery({
    queryKey: ["project"],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([1, 2, 3, 4, 5, 6]), 2000);
      });
    },
    enabled: isEnable
  });

  useEffect(() => {
    setTimeout(() => setEnable(true), 2000);
  }, []);

  return <div>{data?.join(",")}</div>;
};

export default QueryEnable;
```

위의 코드는 2초 후 `enabled` 속성을 `true`로 변경하여 비동기 데이터를 가져오는 예제입니다. [CodeSandBox](https://codesandbox.io/s/tanstack-query-query-enable-fjum7j?file=/src/QueryEnable.tsx)에서 확인할 수 있습니다.

#### `keepPreviousData` 옵션
`keepPreviousData` 옵션은 페이징 처리를 할 때 사용하기 유용한 옵션으로 쿼리가 새로운 데이터를 가져오기 전까지 이전 데이터를 유지시키는 옵션입니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type PostRequest = {
  page: number;
  size: number;
};

const usePosts = ({ page, size }: PostRequest) => {
  return useQuery<number[]>({
    queryKey: ["post", page, size],
    queryFn: () => {
      return new Promise((resolve) => {
        const list: number[] = [];
        for (let i = 1; i <= size; i++) {
          list.push(page * size + i);
        }
        setTimeout(() => resolve(list), 2000);
      });
    },
    keepPreviousData: true
  });
};

const QueryKeepPreviousData = () => {
  const [page, setPage] = useState(0);
  const { data } = usePosts({ page, size: 10 });
  return (
    <div>
      <div>{data?.join(",")}</div>
      <button onClick={() => setPage((value) => value + 1)}>다음</button>
    </div>
  );
};

export default QueryKeepPreviousData;
```

위의 코드는 2초 후 새로운 데이터를 가져오게 되는데, 새로운 데이터를 가져오는 2초 동안 기존의 데이터를 유지하는 예제입니다. [CodeSandBox](https://codesandbox.io/s/tanstack-query-query-enable-fjum7j?file=/src/QueryKeepPreviousData.tsx)에서 확인할 수 있습니다. 아래 그림과 같이 `keepPreviousData: true`, `keepPreviousData: false`가 차이를 보입니다.

|                                 `keepPreviousData: true`                                  |                                  `keepPreviousData: false`                                  |
|:-----------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|
| ![keyPreviousData: true](/assets/img/posts/react/react_query_keep_previous_data_true.gif) | ![keyPreviousData: false](/assets/img/posts/react/react_query_keep_previous_data_false.gif) |

#### `refetch` 반환
쿼리의 반환 값 중 `refetch`를 사용하면 비동기 데이터를 다시 가져올 수 있습니다. `useQuery`, `useQueries` 모두 `refetch` 필드를 반환 합니다. 사용 방법은 다르지만 `useInfiniteQuery` 역시 `refetch`을 반환합니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
const App = () => {
  const { data, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    enabled: true,
  })

  return (
    <div>
      <p>{data}</p>
      <button onClick={() => refetch()}>refetch</button>
    </div>
  )
}
```

`enabled: true`로 설정되어 마운트 될 때 비동기 데이터를 가져오지 않고 버튼이 클릭되는 등의 특정 액션이 발생할 때 비동기 데이터를 가져와야 하거나, 데이터가 업데이트 되어 새롭게 비동기 데이터를 가져와야 할 때 `refetch` 함수를 사용하여 비동기 데이터를 다시 가져올 수 있습니다.

### `QueryClient`
React Query를 사용하려면 최상단에 `QueryClientProvider` 컴포넌트를 감싸주고 `QueryClientProvider` 컴포넌트의 `client` 속성에 `QueryClient` 인스턴스를 넘겨줘야 합니다. 이 `QueryClient` 인스턴스는 React Query에 유용한 기능들을 담고 있습니다. 하위 컴포넌트에서 `QueryClient` 인스턴스를 가져오기 위해서는 아래 코드와 같이 `useQueryClient`를 통해 `QueryClient` 인스턴스를 가져올 수 있습니다.

```tsx
import { useQueryClient } from '@tanstack/react-query'

const Todos = () => {
  const queryClient = useQueryClient()
  // ...
}
```

#### 쿼리 무효화
`queryClient.invalidateQueries`를 사용해서 쿼리를 무효화 하여 데이터를 다시 가져오게 할 수 있습니다. 쿼리 무효화는 Mutation과 함께 사용되는 경우가 많습니다. 아래 코드와 같이 Mutation으로 Todo를 추가한 후 새로운 Todo 목록을 가져와야 할 때 쿼리 무효화를 사용하기 좋습니다.

```tsx
tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

위의 코드는 `addTodo`라는 Mutation 함수를 실행하여 Todo를 추가한 후, Mutation 성공시 쿼리를 무효화하여 새로운 Todo 목록을 가져오게 하는 코드입니다.

#### 쿼리 취소
쿼리 취소는 요청 중인 쿼리를 취소하는 방법입니다. `axios` v0.22.0+ 버전을 사용하신다면 아래 코드와 같이 작성하시면 쿼리가 비활성화(마운트 해제 등) 되면 자동으로 쿼리를 취소합니다.

```tsx
import axios from 'axios'

const query = useQuery({
  queryKey: ['todos'],
  queryFn: ({ signal }) =>
    axios.get('/todos', {
      // Pass the signal to `axios`
      signal,
    }),
})
```

> **`fetch`, `axios` v0.22.0 아래의 버전, `XMLHttpRequest`, `graphql-request`에서 쿼리 취소**
>
> `fetch`, `axios` v0.22.0 아래의 버전, `XMLHttpRequest`, `graphql-request` 등을 사용하신다면, [공식 문서](https://tanstack.com/query/v4/docs/react/guides/query-cancellation)에서 쿼리가 비활성화 될 때 자동으로 쿼리를 취소하는 방법을 참고바랍니다.
>

`queryClient.cancelQueries({ queryKey })`를 사용하면 수동으로 쿼리를 취소할 수 있습니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
const query = useQuery({
  queryKey: ['todos'],
  queryFn: async ({ signal }) => {
    const resp = await fetch('/todos', { signal })
    return resp.json()
  },
})

const queryClient = useQueryClient()

return (
  <button
    onClick={(e) => {
      e.preventDefault()
      queryClient.cancelQueries({ queryKey: ['todos'] })
    }}
  >
    Cancel
  </button>
)
```

#### 쿼리 업데이트
대부분의 경우 수동으로 쿼리를 업데이트하지 않고, `refetch`나 `queryClient.invalidateQueries`를 사용하여 최신 쿼리를 가져오는 방법을 사용합니다. 하지만 때때로 수동으로 쿼리를 업데이트해 주는 것이 더 좋은 사용성을 제공할 수 있습니다. 수동 쿼리 업데이트는 `queryClient.setQueryData`를 사용하면 됩니다.

예를 들어, Mutation으로 데이터를 변경 후 Query하여 데이터 사용자에게 변경 후의 데이터를 제공해야 할 때, 변경된 결과를 예상할 수 있지만 Mutation이나 Query가 오래 걸려 사용자에게 늦게 새로운 데이터를 노출하게 된다면, 수동으로 먼저 쿼리를 업데이트 하여 사용자에게 빠르게 변경된 데이터를 제공할 수 있습니다. 이런 방식을 Optimistic Updates(낙관적인 업데이트)라고 하는데 아래 코드와 같이 사용할 수 있습니다.

```tsx
const queryClient = useQueryClient()

useMutation({
  mutationFn: updateTodo,
  // mutate가 호출되면 실행됩니다.
  onMutate: async (newTodo) => {
    // optimistic update 한 것이 덮어써지지 않도록 호출한 쿼리를 취소합니다.
    await queryClient.cancelQueries({ queryKey: ['todos'] })

    // 에러 발생시 복원을 위해 기존 데이터를 저장합니다.
    const previousTodos = queryClient.getQueryData(['todos'])

    // 예상되는 변경 값으로 쿼리를 업데이트 합니다.
    queryClient.setQueryData(['todos'], (old) => [...old, newTodo])

    // 복원을 위한 기존 데이터를 반환합니다.
    return { previousTodos }
  },
  // mutate에 에러가 발생하면 실행됩니다.
  onError: (err, newTodo, context) => {
    // context를 통해 기존 값으로 쿼리를 업데이트 합니다.
    queryClient.setQueryData(['todos'], context.previousTodos)
  },
  // mutate가 끝나면(성공, 실패 모두) 호출됩니다.
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

#### 쿼리 미리 가져오기

## API Reference

### `uesQuery`

### `useQueries`

### `useInfiniteQuery`

### `useMutation`

### `useQueryClient`
- QueryClient
- 쿼리 필터링

### `useIsFetching`

### `useIsMutating`

## 부록

### TypeScript
```tsx
export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>
```

```tsx
export function useMutaion<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>
```

### ErrorBoundary
- useErrorBoundary

### Suspense

### DevTools

### ESLint

#### `queryKey`와 `queryFn`

### Tanstack Query V4와 V5

### Mutation의 캐싱

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
- [https://github.com/ssi02014/react-query-tutorial](https://github.com/ssi02014/react-query-tutorial)
