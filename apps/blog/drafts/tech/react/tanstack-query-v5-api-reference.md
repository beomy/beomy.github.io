---
layout: post
title: '[React] TanStack Query v5 (React Query) API 레퍼런스'
featured-img: react/tanstack-query-v5.png
category: [tech, react]
summary: 2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query에서 사용할 수 있는 API를 살펴보도록 하겠습니다.
---

2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query에서 사용할 수 있는 API를 살펴보도록 하겠습니다.

## `useQuery`
`useQuery`는 React Query에서 가장 많이 사용되는 훅 중 하나입니다. `useQuery`를 통해 가져온 데이터는 캐시됩니다. 또한 동일한 데이터를 가져오는 `useQuery`가 동시에 여러개 마운트되면 한 번만 데이터를 요청하는 최적화 작업을 합니다.

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
