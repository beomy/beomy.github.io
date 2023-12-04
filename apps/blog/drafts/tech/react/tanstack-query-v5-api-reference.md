---
layout: post
title: '[React] TanStack Query v5 (React Query) API 레퍼런스'
featured-img: react/tanstack-query-v5.png
category: [tech, react]
summary: 2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query를 멋있게 사용할 수 있도록 React Query의 API를 살펴보도록 하겠습니다.
---

2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query를 멋있게 사용할 수 있도록 React Query의 API를 살펴보도록 하겠습니다.

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
  - 다른 쿼리와 구분될 수 있는 유니크한 키입니다. 이 값은 쿼리의 해시 키로 사용됩니다.
  - 이 값이 변경되면 자동 업데이트 되어 데이터를 가져옵니다.
- `queryFn: (context: QueryFunctionContext) => Promise<TData>` (**필수**, 단 `defaultOptions`에서 정의된 경우 생략 가능)
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
  - `online`으로 설정할 경우 네트워크에 연결되어 있을 경우에 데이터를 요청합니다.
  - `always`로 설정할 경우 네트워크 상태와 상관 없이 항상 데이터를 요청합니다.
  - `offlineFirst`로 설정할 경우 데이터를 한번 요청하고 재시도하지 않습니다. [offline-first PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers)나 [Cache-Control 헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#the_cache-control_header)로 요청을 캐싱하는 경우 유용한 옵션입니다. 요청을 캐싱하였기 때문에 오프라인에서도 요청은 성공할 수 있습니다. 만약 Cache Miss되어 요청이 실패되면 `online` 옵션처럼 동작하여 네트워크가 연결될 때까지 요청을 하지 않습니다.
- `retry: boolean | number | (failureCount: number, error: TError) => boolean` (default: CSR은 `3`, SSR은 `0`)
  - `false`로 설정할 경우 요청이 실패하면 재시도하지 않습니다.
  - `true`로 설정할 경우 요청이 실패하면 성공할 때까지 재시도 합니다.
  - `number`형태로 설정할 경우 설정한 값 만큼 요청이 실패하면 재시도 합니다.
  - 함수 형태로 설정할 경우 함수가 `true`를 반환하면 재시도하고 `false`를 반환하면 재시도하지 않습니다.
    - `failureCount: number`는 실패한 횟수를 나타냅니다.
    - `error: TError`는 에러 정보를 담고 있는 객체입니다.
- `retryOnMount: boolean` (default: `true`)
  - `false`로 설정할 경우 실패했던 쿼리가 다시 마운트 되면 데이터 요청을 재시도하지 않습니다.
- `retryDelay: number | (retryAttempt: number, error: TError) => number`
  - `number` 형태로 설정할 경우 설정한 ms 초 이후에 재시도 합니다.
  - 함수 형태로 설정할 경우 함수가 반환하는 ms 초 이후에 재시도 합니다.
    - `retryAttempt: number`는 정수 값으로 아래와 같이 재시도할 시간을 계산하는데 사용됩니다.
      - `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)`
      - `attempt => attempt * 1000`
    - `error: TError`는 에러 정보를 담고 있는 객체입니다.
- `staleTime: number | Infinity` (default: `0`)
  - 가져온 데이터가 오래된 것으로 판단하는 ms 초입니다. 오래된 데이터로 판단되면 쿼리는 새로운 값을 가져옵니다.
  - `Infinity`로 설정한 경우 오래된 데이터로 판단하지 않아 최초 1회만 데이터를 가져오게 됩니다.
- `gcTime: number | Infinity` (default: CSR은 `5 * 60 * 1000`, SSR은 `Infinity`)
  - 사용하지 않거나 비활성화된 캐시 데이터가 메모리에 남아 있는 ms 초입니다. 쿼리의 캐시가 사용되지 않거나 비활성화 되면 이 ms 초가 지난 후에 가비지 컬렉션(Garbage Cllection)됩니다.
  - `Infinity`로 설정할 경우 가비지 켈렉션되지 않아 캐시 데이터가 메모리에서 삭제되지 않습니다.
- `queryKeyHashFn: (queryKey: QueryKey) => string`
  - `queryKey`를 사용하여 해시 키를 만들어 반환하는 함수입니다. 반환 된 값은 쿼리의 해시 키로 사용됩니다.
- `refetchInterval: number | false | ((query: Query) => number | false | undefined)`
  - `number` 형태로 설정할 경우 설정한 ms 초 이후에 데이터를 다시 가져옵니다.
  - 함수 형태로 설정할 경우 함수의 반환 값에 따라 데이터를 다시 가져옵니다.
- `refetchIntervalInBackground: boolean`
  - `true`로 설정할 경우 `refetchInterval`를 사용하여 계속 데이터를 다시 가져오게 설정된 쿼리라면 브라우저의 탭이나 창이 백그라운드에 있는 동안에도 계속 데이터를 다시 가져옵니다.
- `refetchOnMount: boolean | "always" | ((query: Query) => boolean | "always")` (default: `true`)
  - `true`로 설정할 경우 데이터가 오래되었다면 쿼리가 마운트 되면 데이터를 다시 가져옵니다.
  - `false`로 설정할 경우 쿼리가 마운트 될 때 데이터를 다시 가져오지 않습니다.
  - `always`로 설정할 경우 쿼리가 마운트 될 때 항상 데이터를 다시 가져옵니다.
  - 함수 형태로 설정할 경우 함수의 반환 값에 따라 데이터를 다시 가져옵니다.
- `refetchOnReconnect: boolean | "always" | ((query: Query) => boolean | "always")` (default: `true`)
  - `true`로 설정할 경우 네트워트가 다시 연결되면 데이터가 오래되었을 경우 데이터를 다시 가져옵니다.
  - `false`로 설정할 경우 네트워크가 다시 연결되어도 데이터를 다시 가져오지 않습니다.
  - `always`로 설정할 경우 네트워크가 디시 연결되면 항상 데이터를 다시 가져옵니다.
  - 함수 형태로 설정할 경우 함수의 반환 값에 따라 데이터를 다시 가져옵니다.
- `notifyOnChangeProps: string[] | "all" | (() => string[] | "all")`
  - 쿼리의 반환 키 값을 배열로 전달합니. 배열로 전달 한 키의 반환 값이 변경될 경우 컴포넌트가 재렌더링됩니다.
  - `['data', 'error']`로 설정할 경우 `data` 나 `error`의 값이 변경되면 컴포넌트가 재랜더링됩니다.
  - `all`로 설정할 경우 쿼리의 반환 값중 하나라도 값이 변경될 경우 컴포넌트가 재렌더링됩니다.
  - 함수 형태로 설정할 경우 함수의 반환 값에 따라 컴포넌트가 재렌더링됩니다.
- `select: (data: TData) => unknown`
  - `queryFn` 함수에서 반환한 값을 가공할 때 사용되는 옵션입니다. 반환 된 값이 `data`에 담기지만 쿼리 캐시에는 영향을 주지 않습니다.
- `initialData: TData | () => TData`
  - 쿼리가 생성되거나 캐시되지 않은 경우 이 값은 캐시 되어, 쿼리의 초기 데이터로 사용됩니다.
- `initialDataUpdatedAt: number | (() => number | undefined)`
  - `initialData`가 마지막으로 업데이트된 시간(ms)으로 사용됩니다.
- `placeholderData: TData | (previousValue: TData | undefined; previousQuery: Query | undefined,) => TData`
  - 이 값은 쿼리가 `pending` 상태일 때 placeholder로 사용할 수 있는 데이터로 사용됩니다. 이 값은 쿼리 캐시에 영향을 주지 않습니다.
  - 함수로 설정할 경우 함수의 첫번째 파라미터는 이전에 가져운 쿼리 데이터이고 두번째 파라미터는 이전에 완료된 쿼리 인스턴스입니다. 함수의 반환 값이 placeholder 데이터로 사용됩니다.
  - `initialData`와 함께 설정되어 있다면, `initialData`가 더 높은 우선 순위를 가집니다.
- `structuralSharing: boolean | (<T>(oldData: T | undefined, newData: T) => T)` (default: `true`)
  - `false`로 설정할 경우 쿼리가 가져온 데이터를 공유하지 않습니다.

> ##### `placeholderData` 활용
> `keepPreviousData`

> ##### Structural Sharing를 통한 최적화
> TEST

#### Returns

### 예제
<div>
  <iframe src="https://codesandbox.io/embed/zjfrnf?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useQuery"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

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
- [https://velog.io/@dev_jazziron/React-Query-Render-Optimizations](https://velog.io/@dev_jazziron/React-Query-Render-Optimizations)
