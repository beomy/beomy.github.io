---
layout: post
title: '[React] TanStack Query v5 (React Query) API 레퍼런스'
featured-img: react/tanstack-query-v5.png
category: [tech, react]
summary: 2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query에서 사용할 수 있는 API를 살펴보도록 하겠습니다.
---

2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query에서 사용할 수 있는 API를 살펴보도록 하겠습니다.

## `useQuery`
`useQuery`는 React Query에서 가장 많이 사용되는 훅 중 하나입니다. `useQuery`를 통해 가져온 데이터는 캐시됩니다. 또한 동일한 데이터를 가져오는 `useQuery`가 동시에 여러개 마운트되면 최적화 되어 한 번만 데이터를 요청합니다. `useQuery`는 API 서버에서 HTTP의 GET 메소드로 데이터를 가져오는 작업을 할 때 주로 사용됩니다.

### 타입 정보
```tsx
const {
  data, dataUpdatedAt, error, errorUpdatedAt,
  failureCount, failureReason, fetchStatus,
  isError, isFetched, isFetchedAfterMount,
  isFetching, isInitialLoading, isLoading,
  isLoadingError, isPaused, isPending,
  isPlaceholderData, isRefetchError,
  isRefetching, isStale, isSuccess, refetch,
  status,
} = useQuery({
  queryKey, queryFn, gcTime, enabled,
  networkMode, initialData,
  initialDataUpdatedAt, meta,
  notifyOnChangeProps, placeholderData,
  queryKeyHashFn, refetchInterval,
  refetchIntervalInBackground,
  refetchOnMount, refetchOnReconnect,
  refetchOnWindowFocus, retry, retryOnMount,
  retryDelay, select, staleTime,
  structuralSharing, throwOnError,
})
```

#### Options
- `queryKey: unknown[]` (**필수**)
  - 다른 쿼리와 구분될 수 있는 유니크한 키입니다.
  - 이 값이 변경되면 자동 업데이트 되어 데이터를 가져옵니다.
- `queryFn: (context: QueryFunctionContext) => Promise<TData>` (**필수**, 단 `defaultOptions`에 정의된 경우에는 생략 가능)
  - 데이터를 요청하는데 사용되는 함수입니다.
  - 파라미터로 `QueryFunctionContext`를 받습니다.
    - `context.queryKey: QueryKey`
      - `queryKey`로 전달한 값과 동일한 값입니다.
    - `context.signal?: AbortSignal`
      - 네트워크 요청을 취소하기 위해 사용되는 [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) 객체입니다.
    - `meta: Recode<string, unknown> | undefined`
      - 쿼리에 대한 추가 정보를 담을 수 있는 객체입니다.
  - `Promise`를 반환해야 합니다. `undefined`를 반환해서는 안됩니다.
- `enabled: boolean`
  - `false`으로 설정할 경우 쿼리는 자동으로 데이터를 가져오지 않습니다.
- `networkMode: 'online' | 'always' | 'offlineFirst` (default: `online`)
  - `online`으로 설정할 경우
  - `always`으로 설정할 경우
  - `offlineFirst`으로 설정할 경우

#### Returns

### 예제

## `useQueries`

### 타입 정보

### 예제

## `useInfiniteQuery`

### 타입 정보

### 예제

## `useMutation`

### 타입 정보

#### Options

#### Returns

### 예제

#### Optimistic Updates

## `useIsFetching`

### 타입 정보

#### Options

#### Returns

### 예제

## `useIsMutating`

### 타입 정보

#### Options

#### Returns

### 예제

## `MutationCache`

### 타입 정보

#### Options

#### Returns

### 예제

## `useMutationState`

### 타입 정보

#### Options

#### Returns

### 예제

## `useSuspenseQuery`

### 타입 정보

#### Options

#### Returns

### 예제

## `useSuspenseInfiniteQuery`

### 타입 정보

#### Options

#### Returns

### 예제

## `useSuspenseQueries`

### 타입 정보

#### Options

#### Returns

### 예제

## `QueryClient`

### 타입 정보

#### Options

#### Returns

### 예제

## `useQueryClient`

### 타입 정보

#### Options

#### Returns

### 예제

## `QueryClientProvider`

### 타입 정보

#### Options

#### Returns

### 예제

## `QueryCache`

### 타입 정보

#### Options

#### Returns

### 예제

## `QueryObserver`

### 타입 정보

#### Options

#### Returns

### 예제

## `InfiniteQueryObserver`

### 타입 정보

#### Options

#### Returns

### 예제

## `QueriesObserver`

### 타입 정보

#### Options

#### Returns

### 예제

## `QueryErrorResetBoundary`

## `useQueryErrorResetBoundary`

## `focusManager`

### 타입 정보

#### Options

#### Returns

### 예제

## `onlineManager`

### 타입 정보

#### Options

#### Returns

### 예제

## 부록

### React Query 구조

##### 참고
- [https://tanstack.com/query/v5/docs/react/overview](https://tanstack.com/query/v5/docs/react/overview)
- [https://tanstack.com/blog/announcing-tanstack-query-v5](https://tanstack.com/blog/announcing-tanstack-query-v5)
- [https://velog.io/@hyunjine/Inside-React-Query](https://velog.io/@hyunjine/Inside-React-Query)
- [https://leego.tistory.com/entry/react-query는-어떻게-작동할까](https://leego.tistory.com/entry/react-query는-어떻게-작동할까)
- [https://fe-developers.kakaoent.com/2023/230720-react-query/](https://fe-developers.kakaoent.com/2023/230720-react-query/)
