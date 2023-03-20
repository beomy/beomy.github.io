---
layout: post
title: '[React] React Query'
featured-img: react/react.png
category: [tech, react]
summary:
---

이번 포스트에서는 서버 API 호출 등의 비동기 작업을 도와주는 라이브러리인 React Query를 살펴보도록 하겠습니다.

## 개요
- React Query는 서버 상태를 관리하기 위한 라이브러리입니다.
- 서버에 데이터를 요청하거나 업데이트 하는 등의 비동기 작업의 캐싱을 지원합니다.

## 설치
```bash
npm i @tanstack/react-query
# or
pnpm add @tanstack/react-query
# or
yarn add @tanstack/react-query
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

## Query
`useQuery` 훅을 사용하여 비동기 데이터를 가져옴
- 유니크 키가 전달 되어야 함: 유니크 키는 데이터를 다시 가져오거나, 캐시, 프로젝트 내에서 데이터를 공유하기 위해 필요한 값
- 서버로 부터 전달 받은 데이터나 에러를 리턴

### `useQuery`
```js
import { useQuery } from '@tanstack/react-query'

function App() {
  const info = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
}
```

## Mutation

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
- [https://tanstack.com/query/latest](https://tanstack.com/query/latest)
