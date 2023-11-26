---
layout: post
title: '[React] TanStack Query v5 (React Query) API 레퍼런스'
featured-img: react/tanstack-query-v5.png
category: [tech, react]
summary:
---

## `useQuery`
~~설명~~

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

### Options

### Returns

### 사용 예제

## `useQueries`

## `useInfiniteQuery`

## `useMutation`

##### 참고
- [https://tanstack.com/query/v5/docs/react/overview](https://tanstack.com/query/v5/docs/react/overview)
