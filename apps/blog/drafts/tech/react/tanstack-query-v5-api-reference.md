---
layout: post
title: '[React] TanStack Query v5 (React Query) API 레퍼런스'
featured-img: react/tanstack-query-v5.png
category: [tech, react]
summary: 2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query를 멋있게 사용할 수 있도록 React Query의 API를 살펴보도록 하겠습니다.
---

2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query를 멋있게 사용할 수 있도록 React Query의 API를 살펴보도록 하겠습니다.

## `useQuery`
`useQuery`는 React Query에서 가장 많이 사용되는 훅 중 하나입니다. `useQuery`를 통해 가져온 데이터는 캐시됩니다. 또한 동일한 `queryKey`를 사용하는 `useQuery`가 동시에 여러개 마운트되면 최적화 되어 한 번만 데이터를 요청합니다. `useQuery`는 API 서버에서 HTTP의 GET 메소드로 데이터를 가져오는 작업을 할 때 주로 사용됩니다.

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
    - `context.meta: Recode<string, unknown> | undefined`
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
  - 함수로 설정할 경우 함수의 첫번째 파라미터는 이전에 가져온 쿼리 데이터이고 두번째 파라미터는 이전에 완료된 쿼리 인스턴스입니다. 함수의 반환 값이 placeholder 데이터로 사용됩니다.
  - `initialData`와 함께 설정되어 있다면, `initialData`가 더 높은 우선 순위를 가집니다.
- `structuralSharing: boolean | (<T>(oldData: T | undefined, newData: T) => T)` (default: `true`)
  - `false`로 설정할 경우 쿼리가 가져온 데이터를 공유하지 않습니다.
  - 함수로 설정할 경우 함수의 첫번째 파라미터는 이전에 가져온 쿼리 데이터이고 두번째 파라미터는 새 쿼리 데이터입니다. 이 함수는 이전 데이터의 참조를 최대한 유지하면서 새로운 데이터를 반환하는 것이 좋습니다. 함수에서 반환한 데이터가 `data`로 사용됩니다.
- `throwOnError: undefined | boolean | (error: TError, query: Query) => boolean`
  - `true`로 설정할 경우 쿼리에서 에러가 발생할 경우 가장 가까운 에러 바운더리(Error Boundary)로 에러를 전파합니다.
  - `false`로 설정할 경우 쿼리에서 에러가 발생해도 에러 바운더리로 에러를 전파하지 않습니다.
  - 함수로 설정할 경우 첫번째 파라미터로 에러 정보 두번째 파라미터로 쿼리 정보가 담기고 이 값들로 에러 바운더리로 보낼지(`true`) 말지(`false`)를 결정하여 반환해야 합니다.
- `meta: Record<string, unknown>`
  - 필요에 따라 쿼리 캐시에 저장할 수 있는 추가정보입니다. `queryFn`의 `QueryFunctionContext`에도 `meta` 정보가 담겨 있습니다.
- `queryClient?: QueryClient`
  - 커스텀한 쿼리 클라이언트를 지정할 수 있습니다. 이 값을 설정하지 않는다면 가장 가까운 컨텍스트의 쿼리 클라이언트가 사용됩니다.

> ##### `placeholderData` 활용
> React Query V4에서는 `keepPreviousData` 옵션으로 쿼리 키가 변경되어 새로운 데이터를 가져오는 동안에 이전 데이터를 유지하여 화면에 노출 시킬 수 있었습니다. V5부터는 `keepPreviousData` 옵션이 없어지고 아래 코드와 같이 `placeholderData` 옵션이 그 기능을 커버해 주게 되었습니다.
>
> ```tsx
> import { keepPreviousData, useQuery } from '@tanstack/react-query';
> import React from "react";
>
> function Todos() {
>   const [page, setPage] = React.useState(0)
>
>   const fetchProjects = (page = 0) => fetch('/api/projects?page=' + page).then((res) => res.json())
>
>   const {
>     isPending,
>     isError,
>     error,
>     data,
>     isFetching,
>     isPlaceholderData,
>   } = useQuery({
>     queryKey: ['projects', page],
>     queryFn: () => fetchProjects(page),
>     placeholderData: keepPreviousData,
>   })
> }
> ```

> ##### Structural Sharing를 통한 최적화
> React Query는 새로운 데이터를 만들 때 가능한 한 기존의 데이터를 유지하려고 합니다. 아래 코드와 같이 응답 받은 데이터가 있을 때,
>
> ```json
> [
>   { "id": 1, "name": "Learn React", "status": "active" },
>   { "id": 2, "name": "Learn React Query", "status": "todo" }
> ]
> ```
>
> 서버에서 `id` 1에 대한 값이 업데이트 되었다면, React Query는 아래 코드와 같이 모든 데이터를 교체하지 않고 변경된 값만 교체하여 기존의 데이터는 유지합니다.
>
> ```json
> [
>   - { "id": 1, "name": "Learn React", "status": "active" },
>   + { "id": 1, "name": "Learn React", "status": "done" },
>   { "id": 2, "name": "Learn React Query", "status": "todo" }
> ]
> ```
>
> React Query는 이전 데이터를 유지함으로 변경되지 않은 데이터를 사용하는 컴포넌트에서는 리렌더링이 발생하지 않도록 최적화합니다. 기존의 데이터를 유지하지 않고 항상 새로운 데이터로 사용하기 위해서는 `structuralSharing` 옵션을 `false`로 설정하면 됩니다.


#### Returns
- `status: String`
  - `pending`일 경우, 캐시된 데이터가 없고 쿼리 시도가 아직 완료되지 않은 상태입니다.
  - `error`일 경우, 데이터를 가져올 때 에러가 발생한 상태입니다.
  - `success`일 경우,데이터를 성공적으로 가져오거나, `enabled`가 `false`이면서 `initialData`가 설정된 상태입니다.
- `isPending: boolean`
  - `status`가 `pending`일 경우 `true`입니다.
- `isSuccess: boolean`
  - `status`가 `success`일 경우 `true`입니다.
- `isError: boolean`
  - `status`가 `error`일 경우 `true`입니다.
- `isLoadingError: boolean`
  - 처음 데이터를 가져올 때 에러가 발생한 경우 `true`입니다.
- `isRefetchError: boolean`
  - 데이터 다시 가져오기가 실패한 경우 `true`입니다.
- `data: TData` (default: `undefined`)
  - 쿼리가 마지막으로 성공적으로 가져온 데이터입니다.
- `dataUpdatedAt: number`
  - 데이터를 성공적으로 가져온 경우, 즉 `status`가 `success`일 때 타임스탬프입니다.
- `error: null | TError` (default: `null`)
  - 쿼리에 에러가 발생한 경우 에러 정보를 담는 객체입니다.
- `errorUpdatedAt: number`
  - 가장 최근에 에러가 발생했을 경우, 즉 `status`가 `error`일 때 타임스탬프입니다.
- `isStale: boolean`
  - 캐시가 무효화 됬거나 `staleTime`이 지나 데이터가 오래된 것으로 판단될 때 `true`가 됩니다.
- `isPlaceholderData: boolean`
  - `data` 값이 `placeholderData`일 경우 `true`입니다.
- `isFetched: boolean`
  - 쿼리가 데이터를 가져온 경우 `true`입니다.
- `isFetchedAfterMount: boolean`
  - 컴포넌트가 마운트 된 후 쿼리가 데이터를 가져온 경우 `true`입니다.
  - 이전에 캐시된 데이터를 사용하고 싶지 않을 때 사용될 수 있습니다.
- `fetchStatus: FetchStatus`
  - `fetching`일 경우, `queryFn`이 실행 중이거나, 초기 `status`가 `pending` 상태이거나, 백그라운드에서 데이터를 가져오는 상태입니다.
  - `paused`일 경우, 쿼리가 데이터를 가져오려고 했지만 중지된 상태입니다. 대표적으로 네트워크가 끊겨 쿼리가 중지됬을 때 `paused` 상태입니다.
  - `idle`일 경우, `fetching` 상태도 `paused` 상태도 아닌 상태입니다.
- `isFetching: boolean`
  - `fetchStatus`가 `fetching`일 경우 `true`입니다.
- `isPaused: boolean`
  - `fetchStatus`가 `paused`일 경우 `true`입니다.
- `isRefetching: boolean`
  - 초기 `pending` 상태가 아니며 백그라운드에서 데이터를 가져오는 중일 때 `true`입니다.
  - `isFetching && !isPending`와 동일한 값입니다.
- `isLoading: boolean`
  - 쿼리가 처음으로 데이터를 가져오는 중일 때 `true`입니다.
  - `isFetching && isPending`와 동일한 값입니다.
- `failureCount: number`
  - 쿼리가 데이터 가져오기를 실패한 횟수입니다. 쿼리가 성공적으로 데이터를 가져온 경우 `0`으로 초기화 됩니다.
- `failureReason: null | TError`
  - 쿼리가 데이터를 가져오기 재시도를 실패 했을 경우 에러 정보가 담깁니다. 쿼리가 성공적으로 데이터를 가져온 경우 `null`로 초기화 됩니다.
  - 예를 들어 `retry`가 `5`로 설정되어 있을 경우 쿼리가 데이터 가져오기 재시도를 실패하면 `failureReason`에 에러 정보가 담깁니다. 5번의 재시도가 모두 실패할 경우 `error` 객체에 에러 정보가 담기게 됩니다.
- `errorUpdateCount: number`
  - 쿼리가 데이터 가져오기를 실패한 총 횟수입니다.
- `refetch: (options: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>`
  - 수동으로 쿼리가 데이터를 다시 가져올 수 있게 하는 함수입니다.
  - `options.throwOnError: boolean`
    - `true`로 설정할 경우 다시 가져오기가 실패하면 가장 가까운 에러 바운더리로 에러를 전파합니다.
  - `options.cancelRefetch: boolean` (default: `true`)
    - `true`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 진행중이던 요청을 취소하고 재요청합니다.
    - `false`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 데이터를 재요청하지 않습니다.

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
`useQuery`와 동일하게 데이터를 가져오기 위해 사용되는 쿼리입니다. 여러개의 `useQuery`를 사용하고 싶을 경우 `useQuery`를 여러번 선언할 필요 없이 `useQueries`로 대신할 수 있습니다.

### 타입 정보
```tsx
const ids = [1,2,3]
const results = useQueries({
  queries: ids.map(id => (
    { queryKey: ['post', id], queryFn: () => fetchPost(id), staleTime: Infinity },
  )),
})
```

#### Options
- `queries`
  - `useQuery` 훅에서 사용했던 옵션 중 `queryClient`를 제외한 옵션을 사용할 쿼리 수만큼 배열에 담어 전달하면됩니다. 또한 렌더링 할 때마다 호출해야 하는 쿼리의 수가 달라 질 수 있기 때문에 `placeholderData` 함수는 이전 데이터를 파라미터로 전달하지 않습니다.
- `queryClient?: QueryClient`
  - 커스텀한 쿼리 클라이언트를 지정할 수 있습니다. 이 값을 설정하지 않는다면 가장 가까운 컨텍스트의 쿼리 클라이언트가 사용됩니다.
- `combine?: (result: UseQueriesResults) => TCombinedResult`
  - 이 옵션을 사용하면 여러 쿼리의 결과 값을 단인 값으로 합칠 수 있습니다.

#### Returns
`useQueries` 훅의 반환 값은 [`useQuery` 훅의 반환 값](/tech/react/tanstack-query-v5-api-reference/#returns)과 동일한 값을 `queries`에 선언한 쿼리 순서대로 배열 형태로 반환합니다.

### 예제
<div>
  <iframe src="https://codesandbox.io/embed/gmvk2m?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useQueries"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## `useInfiniteQuery`
`useInfiniteQuery` 훅 역시 `useQuery`나 `useQueries` 훅과 같이 데이터를 가져오기 위해 사용되는 쿼리입니다. 무한 스크롤을 통한 데이터 무한 로딩 등을 구현할 때 종종 사용되는 훅입니다.

### 타입 정보
```tsx
const {
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
  isFetchingNextPage,
  isFetchingPreviousPage,
  ...result
} = useInfiniteQuery({
  queryKey,
  queryFn: ({ pageParam }) => fetchPage(pageParam),
  initialPageParam: 1,
  ...options,
  getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
    lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    firstPage.prevCursor,
})
```

#### Options
`useInfiniteQuery` 훅의 옵션은 `useQuery` 훅의 옵션에 아래 목록의 옵션이 추가됩니다.

- `queryFn: (context: QueryFunctionContext) => Promise<TData>` (**필수**, 단 `defaultOptions`에서 정의된 경우 생략 가능)
  - `useQuery`에서 사용하는 `queryFn`와 동일하지만 `context.pageParam: TPageParam`와 `context.direction: 'forward' | 'backward'`를 추가로 사용할 수 있습니다.
    - `context.pageParam: TPageParam`
      - 현재 페이지(현재 `data`)를 가져오기 위해 사용된 파라미터입니다.
    - `context.direction: 'forward' | 'backward'`
      - 현재 패이지를 가져온 방향입니다.
- `initialPageParam: TPageParam` (**필수**)
  - 첫 페이지를 가져오늘 때 사용할 파라미터입니다.
- `getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => TPageParam | undefined | null` (**필수**)
  - 최근 페이지, 모든 페이지, 최근 파마리터, 모든 파라미터 이 데이터를 사용하여 다음 페이지를 가져오는데 사용되는 파라미터를 반환해야 하는 함수 입니다.
  - `undefined`나 `null`을 반환할 경우 다음 페이지가 없는 것으로 판단합니다.
- `getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => TPageParam | undefined | null`
  - 최근 페이지, 모든 페이지, 최근 파마리터, 모든 파라미터 이 데이터를 사용하여 이전 페이지를 가져오는데 사용되는 파라미터를 반환해야 하는 함수 입니다.
  - `undefined`나 `null`을 반환할 경우 이전 페이지가 없는 것으로 판단합니다.
- `maxPages: number | undefined` (default: `undefined`)
  - `data` 반환 값에 저장할 최대 페이지 수입니다.
  - 최대 페이지 수에 도달하면 방향에 따라 첫번째 또는 마지막 페이지가 제거됩니다.
  - `undefined`나 `0`이 설정된 경우 저장할 수 있는 페이지 수의 제한이 없게 됩니다.

#### Returns
`useInfiniteQuery` 훅의 반환 값은 아래 목록을 제외하고 `useQuery`의 반환 값과 동일합니다.

- `data.pages: TData[]`
  - 모든 페이지의 데이터가 배열 형태로 저장됩니다.
- `data.pageParams: unknown[]`
  - 페이지를 가져오기 위해 사용된 모든 파라미터 데이터가 배열 형태로 저장됩니다.
- `isFetchingNextPage: boolean`
  - `fetchNextPage` 함수로 다음 페이지를 가져오는 동안 `true`입니다.
- `isFetchingPreviousPage: boolean`
  - `fetchPreviousPage` 함수로 이전 페이지를 가져오는 동안 `true`입니다.
- `fetchNextPage: (options?: FetchNextPageOptions) => Promise<UseInfiniteQueryResult>`
  - 다음 페이지 데이터를 가져오는 함수입니다.
  - `options.cancelRefetch: boolean` (default: `true`)
    - `true`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 진행중이던 요청을 취소하고 재요청합니다.
    - `false`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 데이터를 재요청하지 않습니다.
- `fetchPreviousPage: (options?: FetchPreviousPageOptions) => Promise<UseInfiniteQueryResult>`
  - 이번 페이지 데이터를 가져오는 함수입니다.
  - `options.cancelRefetch: boolean` (default: `true`)
    - `fetchNextPage`의 `options.cancelRefetch: boolean`와 동일합니다.
- `hasNextPage: boolean`
  - 다음 페이지가 있는 경우 `true`입니다.
  - 다음 페이지가 없는 경우, 즉 `getNextPageParam` 함수가 `undefined`나 `null`을 반환할 경우 `false`입니다.
- `hasPreviousPage: boolean`
  - 이전 페이지가 있는 경우 `true`입니다.
  - 이전 페이지가 없는 경우, 즉 `getPreviousPageParam` 함수가 `undefined`나 `null`을 반환할 경우 `false`입니다.
- `isRefetching: boolean`
  - 초기 `pending`, 다음/이전 데이터를 가져오는 중을 제외하고 백그라운드에서 데이터를 가져오는 중일 경우 `true`입니다.
  - `isFetching && !isPending && !isFetchingNextPage && !isFetchingPreviousPage`와 동일한 값입니다.

### 예제
<div>
  <iframe src="https://codesandbox.io/embed/m9sfx3?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useInfiniteQuery"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

## `useMutation`
`useMutation` 역시 React Query에서 가장 많이 사용되는 훅 중 하나입니다. `useMutation`은 API 서버에 데이터를 저장하거나 업데이트, 삭제 하는 등의 데이터에 영향을 주는 HTTP의 POST, PUT, DELETE 메소드에 주로 사용됩니다.

### 타입 정보
```tsx
const {
  data, error, isError, isIdle,
  isPending, isPaused, isSuccess,
  failureCount, failureReason,
  mutate, mutateAsync, reset,
  status, submittedAt, variables,
} = useMutation({
  mutationFn, gcTime,
  mutationKey, networkMode,
  onError, onMutate, onSettled,
  onSuccess, retry, retryDelay,
  throwOnError, meta,
})

mutate(variables, {
  onError,
  onSettled,
  onSuccess,
})
```

#### Options
- `mutationFn: (variables: TVariables) => Promise<TData>` (**필수**, 단 `defaultOptions`에서 정의된 경우 생략 가능)
  - 비동기 작업을 수행하고 `Promise`를 반환하는 함수입니다.
  - `variables: TVariables`
    - 반환 값인 `mutate` 함수를 호출할 때 함께 전달되는 파라미터가 전달됩니다.
- `gcTime: number | Infinity`
  - `useQuery`의 `gcTime`과 동일합니다.
- `mutationKey: unknown[]`
  - `useMutationState`와의 연관성 ?????
- `networkMode: 'online' | 'always' | 'offlineFirst` (default: `online`)
  - `useQuery`의 `networkMode`과 동일합니다.
- `onMutate: (variables: TVariables) => Promise<TContext | void> | TContext | void`
  - `mutationFn`이 실행되기 전에 실행됩니다.
  - `variables: TVariables`
    - `mutationFn` 함수의 파라미터와 동일한 값을 파라미터로 전달받습니다.
  - `onMutate` 함수는 낙관적 업데이트(optimistic updates)에 사용하기 유용합니다. 반환 값은 `onError`와 `onSettled` 함수에 전달되어 mutation 실패 시 낙관적 업데이트를 롤백할 때 사용할 수 있습니다.
    - 낙관적 업데이트란 mutation이 성공할 것이라 판단하여 수정된 결과를 응답 받기 전, 요청한 데이터를 사용하여 업데이트 하는 것을 이야기 합니다.
- `onSuccess: (data: TData, variables: TVariables, context?: TContext) => Promise<unknown> | unknown`
  - `mutaionFn`이 성공할 경우 실행됩니다.
  - `Promise`를 반환한 경우 `resolved` 될 때까지 이후 작업(`onSettled`, `mutate` 함수의 `onSuccess`와 `onError`, `onSettled` 콜백 함수등)들이 진행되지 않습니다.
  - `data: TData`
    - `mutationFn` 함수의 반환 값입니다.
  - `variables: TVariables`
    - `mutate` 함수에 전달한 `variables` 값입니다.
  - `context?: TContext`
    - `onMutate` 함수의 반환 값입니다.
- `onError: (err: TError, variables: TVariables, context?: TContext) => Promise<unknown> | unknown`
  - `mutationFn`에서 에러가 발생할 경우 실행됩니다.
  - `Promise`를 반환한 경우 `resolved` 될 때까지 이후 작업(`onSettled`, `mutate` 함수의 `onSuccess`와 `onError`, `onSettled` 콜백 함수등)들이 진행되지 않습니다.
  - `err: TError`
    - 발생한 에러 정보입니다.
  - `variables: TVariables`
    - `mutate` 함수에 전달한 `variables` 값입니다.
  - `context?: TContext`
    - `onMutate` 함수의 반환 값입니다.
- `onSettled: (data: TData, error: TError, variables: TVariables, context?: TContext) => Promise<unknown> | unknown`
  - `mutationFn`이 성공하거나 실패할 경우 실행됩니다.
  - `Promise`를 반환한 경우 `resolved` 될 때까지 이후 작업(`mutate` 함수의 `onSuccess`와 `onError`, `onSettled` 콜백 함수등)들이 진행되지 않습니다.
  - `data: TData`
    - `mutaionFn`이 성공할 경우 `mutaionFn`의 반환 값입니다.
  - `err: TError`
    - `mutaionFn`이 실해할 경우 발생한 에러 정보입니다.
  - `variables: TVariables`
    - `mutate` 함수에 전달한 `variables` 값입니다.
  - `context?: TContext`
    - `onMutate` 함수의 반환 값입니다.
- `retry: boolean | number | (failureCount: number, error: TError) => boolean` (default: `0`)
  - `useQuery`의 `retry`와 동일합니다.
- `retryDelay: number | (retryAttempt: number, error: TError) => number`
  - `useQuery`의 `retryDelay`와 동일합니다.
- `throwOnError: undefined | boolean | (error: TError) => boolean`
  - `useQuery`의 `throwOnError`와 동일합니다.
- `meta: Record<string, unknown>`
  - 필요에 따라 Mutation 캐시에 저장할 수 있는 추가정보입니다. `MutationCache`의 `onError`, `onSuccess`와 같이 `mutation`을 사용할 수 있다면 `meta`를 사용할 수 있습니다.
- `queryClient?: QueryClient`
  - `useQuery`의 `queryClient`와 동일합니다.

#### Returns
- `mutate: (variables: TVariables, { onSuccess, onSettled, onError }) => void`
  - 변경할 데이터를 파라미터로 전달하여 데이터 변경을 수행하는 함수입니다. 두번째 파라미터는 옵션 정보로, 콜백 함수를 정의할 수 있습니다.
  - `variables: TVariables`
    - `mutationFn`의 `variables` 파라미터로 전달됩니다.
  - `onSuccess: (data: TData, variables: TVariables, context: TContext) => void`
    - Mutation이 성공 했을 때 호출되는 콜백함수입니다.
    - `data: TData`
      - `mutationFn` 함수의 반환 값입니다.
    - `variables: TVariables`
      - `mutate` 함수에 전달한 `variables` 값입니다.
    - `context: TContext`
      - `onMutate` 함수의 반환 값입니다.
  - `onError: (err: TError, variables: TVariables, context: TContext | undefined) => void`
    - Mutation이 실패 했을 때 호출되는 콜백함수입니다.
    - `err: TError`
      - `mutaionFn`이 실해할 경우 발생한 에러 정보입니다.
    - `variables: TVariables`
      - `mutate` 함수에 전달한 `variables` 값입니다.
    - `context: TContext | undefined`
      - `onMutate` 함수의 반환 값입니다.
  - `onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => void`
    - Mutation이 성공하거나 실패할 경우 실행됩니다.
    - `data: TData | undefined`
      - `mutaionFn`이 성공할 경우 `mutaionFn`의 반환 값입니다.
    - `error: TError | null`
      - `mutaionFn`이 실해할 경우 발생한 에러 정보입니다.
    - `variables: TVariables`
      - `mutate` 함수에 전달한 `variables` 값입니다.
    - `context: TContext | undefined`
      - `onMutate` 함수의 반환 값입니다.
- `mutateAsync: (variables: TVariables, { onSuccess, onSettled, onError }) => Promise<TData>`
  - `mutate` 함수와 동일한 기능을하는 async 함수 입니다.
- `status: string`

### 예제
<div>
  <iframe src="https://codesandbox.io/embed/7cjzgh?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useMutation"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

#### Optimistic Updates
Mutation을 사용하여 데이터를 업데이트 할 때, 데이터를 업데이트하고 업데이트 된 값을 가져오고 화면을 갱신하는 과정을 거쳐야 하는데 이 과정에서 사용자에게 업데이트 된 값을 노출하기까지 딜레이가 발생할 수 있습니다. 업데이트 된 값을 좀 더 빠르게 사용자에게 노출하여 사용자 경험을 향상 시킬 수 있는 방법 중 하나가 Optimistic Update, 낙관적 업데이트입니다.

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
