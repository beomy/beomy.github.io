---
layout: post
title: '[React] TanStack Query v5 (React Query) API 레퍼런스'
featured-img: react/tanstack-query-v5.png
category: [tech, react]
summary: 2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query를 멋있게 사용할 수 있도록 React Query의 API를 살펴보도록 하겠습니다.
---

2023년 10월 TanStack Query v5가 정식 버전으로 릴리즈 되었습니다. 이번 포스터에서는 TanStack Query v5의 React Query를 멋있게 사용할 수 있도록 React Query의 API를 살펴보도록 하겠습니다.

## React Query 구조
React Query의 API는 서로 연관이 있는 부분들이 많아, React Query의 구조를 이해하면 API의 역할을 이해하는데 많은 도움을 줄 수 있습니다. 아래 그림은 React Query의 구조를 간단하게 나타낸 그림입니다.

![React Query 구조](/assets/img/posts/react/react_query_structure.png)

## React Query API 레퍼런스
React Query는 다양한 API를 제공해 줍니다. 그중 `useQuery`, `useMutation`, `useQueryClient` 이 3개 훅은 자주 사용되기 때문에, 이 3개의 API는 자세히 살펴보는 것이 좋습니다.

### `useQuery`
`useQuery`는 React Query에서 가장 많이 사용되는 훅 중 하나입니다. `useQuery`를 통해 가져온 데이터는 캐시 됩니다. 또한 동일한 `queryKey`를 사용하는 `useQuery`가 동시에 여러 번 마운트 되면 최적화되어 한 번만 데이터를 요청합니다. `useQuery`는 API 서버에서 HTTP의 GET 메서드로 데이터를 가져오는 작업을 할 때 주로 사용됩니다.

#### 타입 정보
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

##### Options
- `queryKey: unknown[]` (**필수**)
  - 다른 쿼리와 구분될 수 있는 유니크한 키입니다. 이 값은 쿼리의 해시 키로 사용됩니다.
  - 이 값이 변경되면 자동으로 데이터를 가져옵니다.
- `queryFn: (context: QueryFunctionContext) => Promise<TData>` (**필수**, 단 `defaultOptions`에서 정의된 경우 생략 가능)
  - 데이터를 요청하는 데 사용되는 함수입니다.
  - 파라미터로 `context`를 받습니다.
    - `context.queryKey: QueryKey`
      - `queryKey`로 전달한 값과 동일한 값입니다.
    - `context.signal?: AbortSignal`
      - 네트워크 요청을 취소하기 위해 사용되는 [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) 객체입니다.
    - `context.meta: Recode<string, unknown> | undefined`
      - 쿼리에 대한 추가 정보가 담긴 객체입니다.
  - `Promise`를 반환해야 합니다. `undefined`를 반환해서는 안됩니다.
- `enabled: boolean`
  - `false`으로 설정할 경우 쿼리는 자동으로 데이터를 가져오지 않습니다.
- `networkMode: 'online' | 'always' | 'offlineFirst` (default: `online`)
  - `online`으로 설정할 경우 네트워크에 연결되어 있을 경우에 데이터를 요청합니다.
  - `always`로 설정할 경우 네트워크 상태와 상관없이 항상 데이터를 요청합니다.
  - `offlineFirst`로 설정할 경우 데이터를 한번 요청하고 재시도하지 않습니다. [offline-first PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers)나 [Cache-Control 헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#the_cache-control_header)로 요청을 캐싱하는 경우 유용한 옵션입니다. 요청을 캐싱하였기 때문에 오프라인에서도 요청은 성공할 수 있습니다. 만약 Cache Miss 되어 요청이 실패되면 `online` 옵션처럼 동작하여 네트워크가 연결될 때까지 요청을 하지 않습니다.
- `retry: boolean | number | (failureCount: number, error: TError) => boolean` (default: CSR은 `3`, SSR은 `0`)
  - `false`로 설정할 경우 요청이 실패하면 재시도하지 않습니다.
  - `true`로 설정할 경우 요청이 실패하면 성공할 때까지 재시도합니다.
  - `number`형태로 설정할 경우 설정한 값만큼 요청이 실패하면 재시도합니다.
  - 함수 형태로 설정할 경우 함수가 `true`를 반환하면 재시도하고 `false`를 반환하면 재시도하지 않습니다.
    - `failureCount: number`는 실패한 횟수를 나타냅니다.
    - `error: TError`는 에러 정보를 담고 있는 객체입니다.
- `retryOnMount: boolean` (default: `true`)
  - `false`로 설정할 경우 실패했던 쿼리가 다시 마운트 되면 데이터 요청을 재시도하지 않습니다.
- `retryDelay: number | (retryAttempt: number, error: TError) => number`
  - `number` 형태로 설정할 경우 설정한 ms 초 이후에 재시도합니다.
  - 함수 형태로 설정할 경우 함수가 반환하는 ms 초 이후에 재시도합니다.
    - `retryAttempt: number`는 정수 값으로 아래와 같이 재시도할 시간을 계산하는 데 사용됩니다.
      - `attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)`
      - `attempt => attempt * 1000`
    - `error: TError`는 에러 정보를 담고 있는 객체입니다.
- `staleTime: number | Infinity` (default: `0`)
  - 가져온 데이터가 오래된 것으로 판단하는 ms 초입니다. 오래된 데이터로 판단되면 쿼리는 새로운 값을 가져옵니다.
  - `Infinity`로 설정한 경우 오래된 데이터로 판단하지 않아 최초 1회만 데이터를 가져오게 됩니다.
- `gcTime: number | Infinity` (default: CSR은 `5 * 60 * 1000`(5분), SSR은 `Infinity`)
  - 사용하지 않거나 비활성화된 캐시 데이터가 메모리에 남아 있는 ms 초입니다. 쿼리의 캐시가 사용되지 않거나 비활성화되면 이 ms 초가 지난 후에 가비지 컬렉션(Garbage Cllection)됩니다.
  - `Infinity`로 설정할 경우 가비지 켈렉션 되지 않아 캐시 데이터가 메모리에서 삭제되지 않습니다.
- `queryKeyHashFn: (queryKey: QueryKey) => string`
  - `queryKey`를 사용하여 해시 키를 만들어 반환하는 함수입니다. 반환된 값은 쿼리의 해시 키로 사용됩니다.
- `refetchInterval: number | false | ((query: Query) => number | false | undefined)`
  - `number` 형태로 설정할 경우 설정한 ms 초 이후에 데이터를 다시 가져옵니다.
  - `false`로 설정할 경우 즉시 데이터를 다시 가져옵니다.
  - 함수 형태로 설정할 경우 함수의 반환 값에 따라 데이터를 다시 가져옵니다.
- `refetchIntervalInBackground: boolean`
  - `true`로 설정할 경우 `refetchInterval`를 사용하여 계속 데이터를 다시 가져오게 설정된 쿼리라면 브라우저의 탭이나 창이 백그라운드에 있는 동안에도 계속 데이터를 다시 가져옵니다.
- `refetchOnMount: boolean | "always" | ((query: Query) => boolean | "always")` (default: `true`)
  - `true`로 설정할 경우 데이터가 오래되었다면 쿼리가 마운트 되면 데이터를 다시 가져옵니다.
  - `false`로 설정할 경우 쿼리가 마운트 될 때 데이터를 다시 가져오지 않습니다.
  - `always`로 설정할 경우 쿼리가 마운트 될 때 항상 데이터를 다시 가져옵니다.
  - 함수 형태로 설정할 경우 함수의 반환 값에 따라 데이터를 다시 가져옵니다.
- `refetchOnReconnect: boolean | "always" | ((query: Query) => boolean | "always")` (default: `true`)
  - `true`로 설정할 경우 네트워크가 다시 연결되면 데이터가 오래되었을 경우 데이터를 다시 가져옵니다.
  - `false`로 설정할 경우 네트워크가 다시 연결되어도 데이터를 다시 가져오지 않습니다.
  - `always`로 설정할 경우 네트워크가 디시 연결되면 항상 데이터를 다시 가져옵니다.
  - 함수 형태로 설정할 경우 함수의 반환 값에 따라 데이터를 다시 가져옵니다.
- `notifyOnChangeProps: string[] | "all" | (() => string[] | "all")`
  - 쿼리의 반환 키 값을 배열로 전달합니다. 배열로 전달 한 키의 반환 값이 변경될 경우 컴포넌트가 재렌더링됩니다. 예를 들어, `['data', 'error']`로 설정할 경우 `data` 나 `error`의 값이 변경되면 컴포넌트가 재랜더링됩니다.
  - `all`로 설정할 경우 쿼리의 반환 값 중 하나라도 값이 변경될 경우 컴포넌트가 재렌더링됩니다.
  - 함수 형태로 설정할 경우 함수의 반환 값에 따라 컴포넌트가 재렌더링됩니다.
- `select: (data: TData) => unknown`
  - `queryFn` 함수에서 반환한 값을 가공할 때 사용되는 옵션입니다. 반환된 값이 `data`에 담기지만 쿼리 캐시에는 영향을 주지 않습니다.
- `initialData: TData | () => TData`
  - 쿼리가 생성되거나 캐시 되지 않은 경우 이 값은 캐시 되어, 쿼리의 초기 데이터로 사용됩니다.
- `initialDataUpdatedAt: number | (() => number | undefined)`
  - `initialData`가 마지막으로 업데이트된 시간(ms)으로 사용됩니다.
- `placeholderData: TData | (previousValue: TData | undefined; previousQuery: Query | undefined,) => TData`
  - 이 값은 쿼리가 `pending` 상태일 때 placeholder로 사용할 수 있는 데이터로 사용됩니다. 이 값은 쿼리 캐시에 영향을 주지 않습니다.
  - 함수로 설정할 경우 함수의 첫 번째 파라미터는 이전에 가져온 쿼리 데이터이고 두 번째 파라미터는 이전에 완료된 쿼리 인스턴스입니다. 함수의 반환 값이 placeholder 데이터로 사용됩니다.
  - `initialData`와 함께 설정되어 있다면, `initialData`가 더 높은 우선순위를 가집니다.
- `structuralSharing: boolean | (<T>(oldData: T | undefined, newData: T) => T)` (default: `true`)
  - `false`로 설정할 경우 쿼리가 가져온 데이터를 공유하지 않습니다.
  - 함수로 설정할 경우 함수의 첫 번째 파라미터는 이전에 가져온 쿼리 데이터이고 두 번째 파라미터는 새 쿼리 데이터입니다. 이 함수는 이전 데이터의 참조를 최대한 유지하면서 새로운 데이터를 반환하는 것이 좋습니다. 함수에서 반환한 데이터가 `data`로 사용됩니다.
- `throwOnError: undefined | boolean | (error: TError, query: Query) => boolean`
  - `true`로 설정할 경우 쿼리에서 에러가 발생할 경우 가장 가까운 에러 바운더리(Error Boundary)로 에러를 전파합니다.
  - `false`로 설정할 경우 쿼리에서 에러가 발생해도 에러 바운더리로 에러를 전파하지 않습니다.
  - 함수로 설정할 경우 첫 번째 파라미터로 에러 정보 두 번째 파라미터로 쿼리 정보가 담기고 이 값들로 에러 바운더리로 보낼지(`true`) 말지(`false`)를 결정하여 반환해야 합니다.
- `meta: Record<string, unknown>`
  - 필요에 따라 쿼리 캐시에 저장할 수 있는 추가정보입니다. 이 값이 `queryFn`의 `context`의 `meta`에 전달됩니다.
- `queryClient?: QueryClient`
  - 커스텀한 쿼리 클라이언트를 지정할 수 있습니다. 이 값을 설정하지 않는다면 가장 가까운 콘텍스트의 쿼리 클라이언트가 사용됩니다.

> ##### `placeholderData` 활용
> React Query V4에서는 `keepPreviousData` 옵션으로 쿼리 키가 변경되어 새로운 데이터를 가져오는 동안에 이전 데이터를 유지하여 화면에 노출시킬 수 있었습니다. V5부터는 `keepPreviousData` 옵션이 없어지고 아래 코드와 같이 `placeholderData` 옵션이 그 기능을 대체합니다.
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
> React Query는 새로운 데이터를 만들 때 가능한 한 기존의 데이터를 유지하려고 합니다. 아래 코드와 같이 응답받은 데이터가 있을 때,
>
> ```json
> [
>   { "id": 1, "name": "Learn React", "status": "active" },
>   { "id": 2, "name": "Learn React Query", "status": "todo" }
> ]
> ```
>
> 서버에서 `id` 1에 대한 값이 업데이트되었다면, React Query는 아래 코드와 같이 모든 데이터를 교체하지 않고 변경된 값만 교체하여 기존의 데이터는 유지합니다.
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


##### Returns
- `status: 'pending' | 'error' | 'success'`
  - `pending`일 경우, 캐시 된 데이터가 없고 쿼리 시도가 아직 완료되지 않은 상태입니다.
  - `error`일 경우, 데이터를 가져올 때 에러가 발생한 상태입니다.
  - `success`일 경우, 데이터를 성공적으로 가져오거나, `enabled`가 `false`이면서 `initialData`가 설정된 상태입니다.
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
- `data: TData | undefined` (default: `undefined`)
  - 쿼리가 마지막으로 성공적으로 가져온 데이터입니다.
- `dataUpdatedAt: number`
  - 데이터를 성공적으로 가져온 경우(`status`가 `success`일 때) 타임스탬프입니다.
- `error: null | TError` (default: `null`)
  - 쿼리에 에러가 발생한 경우 에러 정보를 담는 객체입니다.
- `errorUpdatedAt: number`
  - 가장 최근에 에러가 발생했을 경우(`status`가 `error`일 때) 타임스탬프입니다.
- `isStale: boolean`
  - 캐시가 무효화 됐거나 `staleTime`이 지나 데이터가 오래된 것으로 판단될 때 `true`입니다.
- `isPlaceholderData: boolean`
  - `data` 값이 `placeholderData`일 경우 `true`입니다.
- `isFetched: boolean`
  - 쿼리가 데이터를 가져온 경우 `true`입니다.
- `isFetchedAfterMount: boolean`
  - 컴포넌트가 마운트 된 후 쿼리가 데이터를 가져온 경우 `true`입니다.
  - 이전에 캐시 된 데이터를 사용하고 싶지 않을 때 사용될 수 있습니다.
- `fetchStatus: 'fetching' | 'paused' | 'idle'`
  - `fetching`일 경우, `queryFn`이 실행 중이거나, 초기 `status`가 `pending` 상태이거나, 백그라운드에서 데이터를 가져오는 상태입니다.
  - `paused`일 경우, 쿼리가 데이터를 가져오려고 했지만 중지된 상태입니다. 대표적으로 네트워크가 끊겨 쿼리가 중지됐을 때 `paused` 상태입니다.
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
  - 쿼리가 데이터 가져오기를 실패한 횟수입니다. 쿼리가 성공적으로 데이터를 가져온 경우 `0`으로 초기화됩니다.
- `failureReason: null | TError`
  - 쿼리가 데이터를 가져오기 재시도를 실패했을 경우 에러 정보가 담깁니다. 쿼리가 성공적으로 데이터를 가져온 경우 `null`로 초기화 됩니다.
  - 예를 들어 `retry`가 `5`로 설정되어 있을 경우 쿼리가 데이터 가져오기 재시도를 실패하면 `failureReason`에 에러 정보가 담깁니다. 5번의 재시도가 모두 실패할 경우 `error` 객체에 에러 정보가 담기게 됩니다.
- `errorUpdateCount: number`
  - 쿼리가 데이터 가져오기를 실패한 총횟수입니다.
- `refetch: (options: { throwOnError: boolean, cancelRefetch: boolean }) => Promise<UseQueryResult>`
  - 수동으로 쿼리가 데이터를 다시 가져올 수 있게 하는 함수입니다.
  - `options.throwOnError: boolean`
    - `true`로 설정할 경우 다시 가져오기가 실패하면 가장 가까운 에러 바운더리로 에러를 전파합니다.
  - `options.cancelRefetch: boolean` (default: `true`)
    - `true`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 진행 중이던 요청을 취소하고 재요청합니다.
    - `false`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 데이터를 재요청하지 않습니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/zjfrnf?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useQuery"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useQueries`
`useQuery`와 동일하게 데이터를 가져오기 위해 사용되는 쿼리입니다. 여러 개의 `useQuery`를 사용하고 싶을 경우 `useQuery`를 여러 번 선언할 필요 없이 `useQueries`로 대신할 수 있습니다.

#### 타입 정보
```tsx
const ids = [1,2,3]
const results = useQueries({
  queries: ids.map(id => (
    { queryKey: ['post', id], queryFn: () => fetchPost(id), staleTime: Infinity },
  )),
})
```

##### Options
- `queries`
  - [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options) 중 `queryClient`를 제외한 옵션을 사용할 쿼리 수만큼 배열에 담아 전달하면 됩니다. 또한 렌더링 할 때마다 호출해야 하는 쿼리의 수가 달라질 수 있기 때문에 `placeholderData` 함수는 이전 데이터를 파라미터로 전달하지 않습니다.
- `queryClient?: QueryClient`
  - 커스텀한 쿼리 클라이언트를 지정할 수 있습니다. 이 값을 설정하지 않는다면 가장 가까운 콘텍스트의 쿼리 클라이언트가 사용됩니다.
- `combine?: (result: UseQueriesResults) => TCombinedResult`
  - 이 옵션을 사용하면 여러 쿼리의 결과 값을 단일 값으로 합칠 수 있습니다.

##### Returns
`useQueries` 훅의 반환 값은 [`useQuery` 훅의 반환 값](/tech/react/tanstack-query-v5-api-reference/#returns)과 동일한 값을 `queries`에 선언한 쿼리 순서대로 배열 형태로 반환합니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/gmvk2m?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useQueries"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useInfiniteQuery`
`useInfiniteQuery` 훅 역시 `useQuery`나 `useQueries` 훅과 같이 데이터를 가져오기 위해 사용되는 쿼리입니다. 무한 스크롤을 통한 데이터 무한 로딩 등을 구현할 때 종종 사용되는 훅입니다.

#### 타입 정보
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

##### Options
`useInfiniteQuery` 훅의 옵션은 [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)에 아래 목록의 옵션이 추가됩니다.

- `queryFn: (context: QueryFunctionContext) => Promise<TData>` (**필수**, 단 `defaultOptions`에서 정의된 경우 생략 가능)
  - `useQuery`에서 사용하는 `queryFn`와 동일하지만 `context.pageParam: TPageParam`와 `context.direction: 'forward' | 'backward'`를 추가로 사용할 수 있습니다.
    - `context.pageParam: TPageParam`
      - 현재 페이지(현재 `data`)를 가져오기 위해 사용된 파라미터입니다.
    - `context.direction: 'forward' | 'backward'`
      - 현재 페이지를 가져올 방향입니다.
- `initialPageParam: TPageParam` (**필수**)
  - 첫 페이지를 가져올 때 사용할 파라미터입니다.
- `getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => TPageParam | undefined | null` (**필수**)
  - 최근 페이지(`lastPage`), 모든 페이지(`allPages`), 최근 파마리터(`lastPageParam`), 모든 파라미터(`allPageParams`) 이 데이터를 사용하여 다음 페이지를 가져오는 데 사용되는 파라미터를 반환해야 하는 함수입니다.
  - `undefined`나 `null`을 반환할 경우 다음 페이지가 없는 것으로 판단합니다.
- `getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) => TPageParam | undefined | null`
  - 최근 페이지(`firstPage`), 모든 페이지(`allPages`), 첫 파마리터(`firstPageParam`), 모든 파라미터(`allPageParams`) 이 데이터를 사용하여 이전 페이지를 가져오는 데 사용되는 파라미터를 반환해야 하는 함수입니다.
  - `undefined`나 `null`을 반환할 경우 이전 페이지가 없는 것으로 판단합니다.
- `maxPages: number | undefined` (default: `undefined`)
  - `data` 반환 값에 저장할 최대 페이지 수입니다.
  - 최대 페이지 수에 도달하면 방향에 따라 첫 번째 또는 마지막 페이지가 제거됩니다.
  - `undefined`나 `0`이 설정된 경우 저장할 수 있는 페이지 수의 제한이 없게 됩니다.

##### Returns
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
    - `true`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 진행 중이던 요청을 취소하고 재요청합니다.
    - `false`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 데이터를 재요청하지 않습니다.
- `fetchPreviousPage: (options?: FetchPreviousPageOptions) => Promise<UseInfiniteQueryResult>`
  - 이전 페이지 데이터를 가져오는 함수입니다.
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

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/m9sfx3?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useInfiniteQuery"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useMutation`
`useMutation` 역시 React Query에서 가장 많이 사용되는 훅 중 하나입니다. `useMutation`은 API 서버에 데이터를 저장하거나 업데이트, 삭제 하는 등의 데이터에 영향을 주는 HTTP의 POST, PUT, DELETE 메서드에 주로 사용됩니다.

#### 타입 정보
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

##### Options
- `mutationFn: (variables: TVariables) => Promise<TData>` (**필수**, 단 `defaultOptions`에서 정의된 경우 생략 가능)
  - 비동기 작업을 수행하고 `Promise`를 반환하는 함수입니다.
  - `variables: TVariables`
    - 반환 값인 `mutate` 함수를 호출할 때 전달되는 파라미터입니다.
- `gcTime: number | Infinity`
  - `useQuery`의 `gcTime`과 동일합니다.
- `mutationKey: unknown[]`
  - 다른 Mutation과 구분될 수 있는 유니크한 키입니다. 쿼리의 `queryKey`와는 다르게 필수값이 아닙니다.
- `networkMode: 'online' | 'always' | 'offlineFirst` (default: `online`)
  - `useQuery`의 `networkMode`과 동일합니다.
- `onMutate: (variables: TVariables) => Promise<TContext | void> | TContext | void`
  - `mutationFn`이 실행되기 전에 실행됩니다.
  - `variables: TVariables`
    - `mutationFn` 함수의 파라미터와 동일한 값을 파라미터로 전달받습니다.
  - `onMutate` 함수는 [낙관적 업데이트(optimistic updates)](/tech/react/tanstack-query-v4/#쿼리-업데이트)에 사용하기 유용합니다. 반환 값은 `onError`와 `onSettled` 함수에 전달되어 mutation 실패 시 낙관적 업데이트를 롤백할 때 사용할 수 있습니다.
    - 낙관적 업데이트란 mutation이 성공할 것이라 판단하여 수정된 결과를 응답받기 전, 요청한 데이터를 사용하여 업데이트하는 것을 말합니다.
- `onSuccess: (data: TData, variables: TVariables, context?: TContext) => Promise<unknown> | unknown`
  - `mutaionFn`이 성공할 경우 실행됩니다.
  - `Promise`를 반환한 경우 `resolved` 될 때까지 이후 작업(`onSettled`, `mutate` 함수의 `onSuccess`와 `onError`, `onSettled` 콜백 함수 등)들이 진행되지 않습니다.
  - `data: TData`
    - `mutationFn` 함수의 반환 값입니다.
  - `variables: TVariables`
    - `mutate` 함수에 전달한 `variables` 값입니다.
  - `context?: TContext`
    - `onMutate` 함수의 반환 값입니다.
- `onError: (err: TError, variables: TVariables, context?: TContext) => Promise<unknown> | unknown`
  - `mutationFn`에서 에러가 발생할 경우 실행됩니다.
  - `Promise`를 반환한 경우 `resolved` 될 때까지 이후 작업(`onSettled`, `mutate` 함수의 `onSuccess`와 `onError`, `onSettled` 콜백 함수 등)들이 진행되지 않습니다.
  - `err: TError`
    - 발생한 에러 정보입니다.
  - `variables: TVariables`
    - `mutate` 함수에 전달한 `variables` 값입니다.
  - `context?: TContext`
    - `onMutate` 함수의 반환 값입니다.
- `onSettled: (data: TData, error: TError, variables: TVariables, context?: TContext) => Promise<unknown> | unknown`
  - `mutationFn`이 성공하거나 실패할 경우 실행됩니다.
  - `Promise`를 반환한 경우 `resolved` 될 때까지 이후 작업(`mutate` 함수의 `onSuccess`와 `onError`, `onSettled` 콜백 함수 등)들이 진행되지 않습니다.
  - `data: TData`
    - `mutaionFn`이 성공할 경우 `mutaionFn`의 반환 값입니다.
  - `err: TError`
    - `mutaionFn`이 실패할 경우 발생한 에러 정보입니다.
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

##### Returns
- `mutate: (variables: TVariables, { onSuccess, onSettled, onError }) => void`
  - 변경할 데이터를 파라미터로 전달하여 데이터 변경을 수행하는 함수입니다. 두 번째 파라미터는 옵션 정보로, 콜백 함수를 정의할 수 있습니다.
  - `variables: TVariables`
    - `mutationFn`의 `variables` 파라미터로 전달됩니다.
  - `onSuccess: (data: TData, variables: TVariables, context: TContext) => void`
    - Mutation이 성공했을 때 호출되는 콜백함수입니다.
    - `data: TData`
      - `mutationFn` 함수의 반환 값입니다.
    - `variables: TVariables`
      - `mutate` 함수에 전달한 `variables` 값입니다.
    - `context: TContext`
      - `onMutate` 함수의 반환 값입니다.
  - `onError: (err: TError, variables: TVariables, context: TContext | undefined) => void`
    - Mutation이 실패했을 때 호출되는 콜백함수입니다.
    - `err: TError`
      - `mutaionFn`이 실패할 경우 발생한 에러 정보입니다.
    - `variables: TVariables`
      - `mutate` 함수에 전달한 `variables` 값입니다.
    - `context: TContext | undefined`
      - `onMutate` 함수의 반환 값입니다.
  - `onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => void`
    - Mutation이 성공하거나 실패할 경우 실행됩니다.
    - `data: TData | undefined`
      - `mutaionFn`이 성공할 경우 `mutaionFn`의 반환 값입니다.
    - `error: TError | null`
      - `mutaionFn`이 실패할 경우 발생한 에러 정보입니다.
    - `variables: TVariables`
      - `mutate` 함수에 전달한 `variables` 값입니다.
    - `context: TContext | undefined`
      - `onMutate` 함수의 반환 값입니다.
- `mutateAsync: (variables: TVariables, { onSuccess, onSettled, onError }) => Promise<TData>`
  - `mutate` 함수와 동일한 기능을 하는 async 함수입니다.
- `status: 'idle' | 'pending' | 'error' | 'success'`
  - `idle`인 경우, Mutation 함수가 실행되기 전 상태입니다.
  - `pending`인 경우, Mutation 함수가 실행 중인 상태입니다.
  - `error` 인 경우, Mutation 함수에서 에러가 발생한 상태입니다.
  - `success`인 경우, Mutation 함수가 성공한 상태입니다.
- `isIdle: boolean`
  - `status`가 `idle`인 경우 `true`입니다.
- `isPending: boolean`
  - `status`가 `pending`인 경우 `true`입니다.
- `isError: boolean`
  - `status`가 `error`인 경우 `true`입니다.
- `isSuccess: boolean`
  - `status`가 `success`인 경우 `true`입니다.
- `isPaused: boolean`
  - Mutation이 중지된 상태입니다. 대표적으로 네트워크가 끊겨 Mutation이 중지됐을 때 `paused` 상태입니다.
- `data: undefined | unknown` (default: `undefined`)
  - 가장 최근에 성공한 Mutation의 반환 값을 담습니다.
- `error: null | TError`
  - Mutation이 실패했을 경우 에러 정보가 담긴 객체입니다.
- `reset: () => void`
  - Mutation의 상태를 초기화하는 함수입니다.
- `failureReason: null | TError`
  - Mutation 재시도를 실패했을 경우 에러 정보가 담깁니다. Mutation이 성공한 경우 `null`로 초기화 됩니다.
- `submittedAt: number` (default: `0`)
  - Mutation이 실행된 시점의 타입스탬프입니다.
- `variables: undefined | TVariables` (default: `undefined`)
  - `mutationFn` 함수의 파라미터로 전달된 `variables` 값입니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/7cjzgh?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useMutation"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useIsFetching`
`useIsFetching` 훅은 데이터를 가져오는 중인 쿼리의 수를 반환합니다.

#### 타입 정보
```tsx
import { useIsFetching } from '@tanstack/react-query'
// How many queries are fetching?
const isFetching = useIsFetching()
// How many queries matching the posts prefix are fetching?
const isFetchingPosts = useIsFetching({ queryKey: ['posts'] })
```

##### Options
- `filters?: QueryFilters`
  - `filters.queryKey?: QueryKey`
    - 찾으려고 하는 쿼리의 쿼리 키입니다.
  - `filters.exact?: boolean`
    - `true`로 설정할 경우 정확히 일치하는 쿼리를 찾습니다.
    - `false`로 설정할 경우 설정한 `filters.queryKey`가 포함되는 쿼리를 찾습니다.
  - `filters.type?: 'active' | 'inactive' | 'all'` (default: `all`)
    - `active`로 설정할 경우 활성화된 쿼리 중에 찾습니다.
    - `inactive`로 설정할 경우 비활성화된 쿼리 중에 찾습니다.
    - `all`로 설정할 경우 모든 쿼리 중에 찾습니다.
  - `filters.stale?: boolean`
    - `true`로 설정할 경우 오래된(stale) 쿼리 중에 찾습니다.
    - `false`로 설정할 경우 신선한(fresh) 쿼리 중에 찾습니다.
  - `filters.fetchStatus?: 'fetching' | 'paused' | 'idle'`
    - `fetching`으로 설정할 경우 가져오는 중인 쿼리 중에 찾습니다.
    - `paused`로 설정할 경우 데이터를 가져오려고 했지만 일시 중단된 쿼리 중에 찾습니다.
    - `idle`로 설정할 경우 데이터를 가져온 적이 없는 쿼리 중에 찾습니다.
  - `filters.predicate?: (query: Query) => boolean`
    - 최종 필터로 사용되는 함수입니다. 다른 필터를 정의하지 않으면 모든 쿼리 중에 찾습니다.
- `queryClient?: QueryClient`
  - 커스텀한 쿼리 클라이언트를 지정할 수 있습니다. 이 값을 설정하지 않는다면 가장 가까운 콘텍스트의 쿼리 클라이언트가 사용됩니다.

##### Returns
- `isFetching: number`
  - 데이터를 가져오는 중인 쿼리의 수입니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/cq2gkp?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useIsFetching"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useIsMutating`
`useIsMutating` 훅은 Mutation 중인 수를 반환합니다.

#### 타입 정보
```tsx
import { useIsMutating } from '@tanstack/react-query'
// How many mutations are fetching?
const isMutating = useIsMutating()
// How many mutations matching the posts prefix are fetching?
const isMutatingPosts = useIsMutating({ mutationKey: ['posts'] })
```

##### Options
- `filters?: MutationFilters`
  - `filters.mutationKey?: MutationKey`
    - 찾으려고 하는 Mutation의 키입니다.
  - `filters.exact?: boolean`
    - `true`로 설정할 경우 정확히 일치하는 Mutation을 찾습니다.
    - `false`로 설정할 경우 설정한 `filters.mutationKey`가 포함되는 Mutation을 찾습니다.
  - `filters.status?: 'idle' | 'pending' | 'error' | 'success'`
    - `idle`인 경우 실행되기 전인 Mutation 중에 찾습니다.
    - `pending`인 경우 실행 중인 Mutation 중에 찾습니다.
    - `error` 인 경우 에러가 발생한 Mutation 중에 찾습니다.
    - `success`인 경우 성공한 Mutation 중에 찾습니다.
  - `filters.predicate?: (mutation: Mutation) => boolean`
    - 최종 필터로 사용되는 함수입니다. 다른 필터를 정의하지 않으면 모든 Mutation 중에 찾습니다.
- `queryClient?: QueryClient`
  - 커스텀한 쿼리 클라이언트를 지정할 수 있습니다. 이 값을 설정하지 않는다면 가장 가까운 콘텍스트의 쿼리 클라이언트가 사용됩니다.

##### Returns
- `isMutating: number`
  - Mutation 중인 숫자입니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/rzm4tc?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useIsMutating"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `QueryCache`
`QueryCache`는 쿼리를 저장하는 저장소입니다. 쿼리에 포함된 데이터, 메타 정보, 쿼리의 상태가 저장됩니다. 보통 아래 코드와 같이 QueryClient에 정의하고, `useQueryClient`의 `getQueryCache`를 통해 가져와 사용합니다.

```tsx
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // 옵션 설정
  }),
});

const App = () => {
  const queryClient = useQueryClient()
  const queryCache = queryClient.getQueryCache()
  // ...
}

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

#### 타입 정보
```tsx
import { QueryCache } from '@tanstack/react-query'

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error)
  },
  onSuccess: (data) => {
    console.log(data)
  },
  onSettled: (data, error) => {
    console.log(data, error)
  },
})
```

##### Options
`QueryCache`의 옵션들은 모두 콜백함수입니다. 전역에서 처리해야 할 적업을 할 때 사용할 수 있습니다.

- `onError?: (error: unknown, query: Query) => void`
  - 실행한 쿼리에 에러가 발생할 경우 호출되는 콜백함수입니다.
  - `error: unknown`
    - 발생한 에러 정보가 담긴 객체입니다.
  - `query: Query`
    - 실행한 쿼리 객체입니다.
- `onSuccess?: (data: unknown, query: Query) => void`
  - 실행한 쿼리가 성공하면 호출되는 콜백함수입니다.
  - `data: unknown`
    - `queryFn` 함수의 반환 값입니다.
  - `query: Query`
    - 실행한 쿼리 객체입니다.
- `onSettled?: (data: unknown | undefined, error: unknown | null, query: Query) => void`
  - 실행한 쿼리가 성공 혹은 실패하여 종료되면 호출되는 콜백함수입니다.
  - `data: unknown | undefined`
    - 쿼리가 성공한 경우 `queryFn` 함수의 반환 값입니다.
  - `error: unknown | null`
    - 쿼리가 실패한 경우 발생한 에러 정보가 담긴 객체입니다.
  - `query: Query`
    - 실행한 쿼리 객체입니다.

> ##### `QueryClient`의 `defaultOptions`와 `QueryCache`의 옵션의 차이
> - `defaultOpions`의 콜백함수들은 각각의 쿼리를 호출할 때 오버라이드될 수 있습니다. `QueryCache`의 전역 콜백함수들은 항상 호출됩니다.
> - `defaultOpions`의 콜백함수들은 각각의 옵저버에서 한 번씩 호출되지만, `QueryCache`의 전역 콜백함수들은 한 번만 호출됩니다.
>   - 예를 들어 `useQuery({ queryKey: ['posts'] })`와 같이 동일한 쿼리가 부모, 자식 컴포넌트 각각에 2번 선언되었다면 `defaultOpions`의 콜백함수는 2번 호출되지만, `QueryCache`의 전역 콜백함수는 한 번만 호출됩니다.

##### Returns
- `find: (filters: QueryFilters) => Query | undefined`
  - `filters`에 해당하는 쿼리를 반환하는 함수입니다. 해당하는 쿼리가 없을 경우 `undefined`를 반환합니다.
  - `filters?: QueryFilters`
    - `filters.queryKey?: QueryKey`
      - 찾으려고 하는 쿼리의 쿼리 키입니다.
    - `filters.exact?: boolean`
      - `true`로 설정할 경우 정확히 일치하는 쿼리를 찾습니다.
      - `false`로 설정할 경우 설정한 `filters.queryKey`가 포함되는 쿼리를 찾습니다.
    - `filters.type?: 'active' | 'inactive' | 'all'` (default: `all`)
      - `active`로 설정할 경우 활성화된 쿼리 중에 찾습니다.
      - `inactive`로 설정할 경우 비활성화된 쿼리 중에 찾습니다.
      - `all`로 설정할 경우 모든 쿼리 중에 찾습니다.
    - `filters.stale?: boolean`
      - `true`로 설정할 경우 오래된(stale) 쿼리 중에 찾습니다.
      - `false`로 설정할 경우 신선한(fresh) 쿼리 중에 찾습니다.
    - `filters.fetchStatus?: 'fetching | 'paused' | 'idle'`
      - `fetching`으로 설정할 경우 가져오는 중인 쿼리 중에 찾습니다.
      - `paused`로 설정할 경우 데이터를 가져오려고 했지만 일시 중단된 쿼리 중에 찾습니다.
      - `idle`로 설정할 경우 데이터를 가져온 적이 없는 쿼리 중에 찾습니다.
    - `filters.predicate?: (query: Query) => boolean`
      - 최종 필터로 사용되는 함수입니다. 다른 필터를 정의하지 않으면 모든 쿼리 중에 찾습니다.
- `findAll: (filters: QueryFilters) => Query[]`
  - `filters`에 해당하는 쿼리를 배열 형태로 반환하는 함수입니다. 해당하는 쿼리가 없을 경우 `빈 배열을 반환합니다.
  - `find` 함수의 `filters`와 동일한 값을 파라미터로 전달받습니다.
- `subscribe: (callback: (event: QueryCacheNotifyEvent) => void) => unsubscribe: Function => void`
  - 쿼리 캐시를 구독합니다. `query.setState`나 `queryClient.removeQueries` 등 쿼리가 업데이트될 때마다 업데이트된 쿼리를 파라미터로 하여 `callback` 함수가 호출됩니다.
  - 구독을 취소하는 함수인 `unsubscribe`를 반환합니다.
  - ```tsx
    const callback = (event) => {
      console.log(event.type, event.query)
    }
    const unsubscribe = queryCache.subscribe(callback)
    ```
- `clear: () => void`
  - 쿼리 캐시를 모두 지우는 데 사용되는 함수입니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/5vcsmr?view=Editor+%2B+Preview&module=%2Fsrc%2Findex.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="QueryCache"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `MutationCache`
`MutationCache`는 Mutation을 저장하는 저장소입니다. 보통 아래 코드와 같이 `QueryClient`에 정의하고, `useQueryClient`의 `getMutationCache`를 통해 가져와 사용합니다.

```tsx
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    // 옵션 설정
  }),
});

const App = () => {
  const queryClient = useQueryClient()
  const mutationCache = queryClient.getMutationCache()
  // ...
}

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

#### 타입 정보
```tsx
import { MutationCache } from '@tanstack/react-query'

const mutationCache = new MutationCache({
  onError: error => {
    console.log(error)
  },
  onSuccess: data => {
    console.log(data)
  },
})
```

##### Options
`MutationCache`의 옵션들은 모두 콜백함수입니다. 전역에서 처리해야 할 적업을 할 때 사용할 수 있습니다.

- `onError?: (error: unknown, variables: unknown, context: unknown, mutation: Mutation) => Promise<unknown> | unknown`
  - 실행한 Mutation에 에러가 발생할 경우 호출되는 콜백함수입니다. `Promise`를 반환할 경우 `resolved` 될 때까지 이후 작업들이 진행되지 않습니다.
  - `error: unknown`
    - 발생한 에러 정보가 담긴 객체입니다.
  - `variables: unknown`
    - `mutate`(또는 `mutateAsync`) 함수의 `variables` 파라미터로 전달한 값입니다.
  - `context: unknown`
    - `useMutation` 훅의 옵션 중 `onMutate` 함수의 반환 값입니다.
  - `mutation: Mutation`
    - 실행한 Mutation 객체입니다.
- `onSuccess?: (data: unknown, variables: unknown, context: unknown, mutation: Mutation) => Promise<unknown> | unknown`
  - 실행한 Mutation이 성공하면 호출되는 콜백함수입니다. `Promise`를 반환할 경우 `resolved` 될 때까지 이후 작업들이 진행되지 않습니다.
  - `data: unknown`
    - `mutationFn` 함수의 반환 값입니다.
  - `variables: unknown`
    - `mutate`(또는 `mutateAsync`) 함수의 `variables` 파라미터로 전달한 값입니다.
  - `context: unknown`
    - `useMutation` 훅의 옵션 중 `onMutate` 함수의 반환 값입니다.
  - `mutation: Mutation`
    - 실행한 Mutation 객체입니다.
- `onSettled?: (data: unknown | undefined, error: unknown | null, variables: unknown, context: unknown, mutation: Mutation) => Promise<unknown> | unknown`
  - 실행한 Mutation이 성공 혹은 실패하여 종료되면 호출되는 콜백함수입니다. `Promise`를 반환할 경우 `resolved` 될 때까지 이후 작업들이 진행되지 않습니다.
  - `data: unknown | undefined`
    - Mutation이 성공한 경우 `mutationFn` 함수의 반환 값입니다.
  - `error: unknown | null`
    - Mutation이 실패한 경우 발생한 에러 정보가 담긴 객체입니다.
  - `variables: unknown`
    - `mutate`(또는 `mutateAsync`) 함수의 `variables` 파라미터로 전달한 값입니다.
  - `context: unknown`
    - `useMutation` 훅의 옵션 중 `onMutate` 함수의 반환 값입니다.
  - `mutation: Mutation`
    - 실행한 Mutation 객체입니다.
- `onMutate?: (variables: unknown, mutation: Mutation) => Promise<unknown> | unknown`
  - Mutation이 실행되기 전에 호출되는 콜백합수입니다.
  - `variables: unknown`
    - `mutate`(또는 `mutateAsync`) 함수의 `variables` 파라미터로 전달한 값입니다.
  - `mutation: Mutation`
    - 실행한 Mutation 객체입니다.

> ##### `QueryClient`의 `defaultOptions`와 `MutationCache`의 옵션의 차이
> - `defaultOpions`에 정의한 콜백함수들은 각각의 Mutation을 호출할 때 오버라이드될 수 있습니다. `MutationCache`에 정의한 전역 콜백함수들은 항상 호출됩니다.
> - `MutationCache`의 옵션 중 `onMutate` 함수의 반환 값은 `context`에 담기지 않습니다.

##### Returns
- `getAll: () => Mutation[]`
  - 캐시 된 모든 Mutation을 반환합니다.
- `subscribe: (callback: (mutation?: MutationCacheNotifyEvent) => void) => unsubscribe: Function => void`
  - Mutation 캐시를 구독합니다. Mutation 추가/삭제/수정되면 `callback` 함수가 실행됩니다.
  - 구독을 취소하는 함수인 `unsubscribe`를 반환합니다.
  - ```tsx
    const callback = event => {
      console.log(event.type, event.mutation)
    }
    const unsubscribe = mutationCache.subscribe(callback)
    ```
- `clear: () => void`
  - Mutation 캐시를 모두 지우는 데 사용되는 함수입니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/9m9p9l?view=Editor+%2B+Preview&module=%2Fsrc%2Findex.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="MutationCache"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useMutationState`
`useMutationState` 훅은 `MutationCache`에 있는 Mutation에 접근할 수 있는 훅입니다. `filter`을 사용하여 원하는 Mutation을 찾을 수 있고 `select`를 사용하여 필요한 Mutation의 값을 선택해 가져올 수 있습니다.

#### 타입 정보
```tsx
import { useMutation, useMutationState } from '@tanstack/react-query'

const mutationKey = ['posts']

// Some mutation that we want to get the state for
const mutation = useMutation({
  mutationKey,
  mutationFn: (newPost) => {
    return axios.post('/posts', newPost)
  },
})

const data = useMutationState({
  // this mutation key needs to match the mutation key of the given mutation (see above)
  filters: { mutationKey },
  select: (mutation) => mutation.state.data,
})
```

##### Options
- `options`
  - `filters?: MutationFilters`
    - `filters.mutationKey?: MutationKey`
      - 찾으려고 하는 Mutation의 키입니다.
    - `filters.exact?: boolean`
      - `true`로 설정할 경우 정확히 일치하는 Mutation을 찾습니다.
      - `false`로 설정할 경우 설정한 `filters.mutationKey`가 포함되는 Mutation을 찾습니다.
    - `filters.status?: 'idle' | 'pending' | 'error' | 'success'`
      - `idle`인 경우 실행되기 전인 Mutation 중에 찾습니다.
      - `pending`인 경우 실행 중인 Mutation 중에 찾습니다.
      - `error` 인 경우 에러가 발생한 Mutation 중에 찾습니다.
      - `success`인 경우 성공한 Mutation 중에 찾습니다.
    - `filters.predicate?: (mutation: Mutation) => boolean`
      - 최종 필터로 사용되는 함수입니다. 다른 필터를 정의하지 않으면 모든 Mutation 중에 찾습니다.
  - `select?: (mutation: Mutation) => TResult`
    - 이 옵션을 사용하여 Mutation의 정보를 선택해 가져올 수 있습니다.
- `queryClient?: QueryClient`
  - 커스텀한 쿼리 클라이언트를 지정할 수 있습니다. 이 값을 설정하지 않는다면 가장 가까운 콘텍스트의 쿼리 클라이언트가 사용됩니다.

##### Returns
- `Array<TResult>`
  - `select` 옵션에서 반환한 Mutation 배열입니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/wft346?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useMutationState"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useSuspenseQuery`
`useSuspenseQuery` 훅은 `useQuery`와 동일한 동작을 하지만 데이터를 가져오는 동안에 React의 Suspense 동작을 실행시킵니다.

#### 타입 정보
```tsx
const result = useSuspenseQuery(options)
```

##### Options
[`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)에서 `throwOnError`, `enabled`, `placeholderData`가 빠진 형태입니다.

##### Returns
[`useQuery` 훅의 반환 값](/tech/react/tanstack-query-v5-api-reference/#returns)과 대부분 동일하지만, 아래 목록만 차이가 있습니다.

- `data`는 항상 `undefined`가 아닙니다.
  - 데이터를 가져오는 동안에는 Suspense가 동작하기 때문에 `data`는 항상 `undefined`가 아니게 됩니다.
- `isPlaceholderData`이 제거되었습니다.
  - `placeholderData`로 화면에 노출되는 것이 아니라 Suspense가 화면에 노출되기 때문에 `isPlaceholderData`가 제거되었습니다.
- `status`는 항상 `success`입니다.
  - `useQuery` 훅의 `status` 반환 값 중 `pending`일 경우 Suspense가 동작하고, `error`일 경우 Error Boundary가 화면에 노출되기 때문에 항상 `success`가 됩니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/ghm5tk?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useSuspenseQuery"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useSuspenseInfiniteQuery`
`useSuspenseInfiniteQuery` 훅은 `useInfiniteQuery` 와 동일한 동작을 하지만 데이터를 가져오는 동안에 React의 Suspense 동작을 실행 시킵니다.

#### 타입 정보
```tsx
const result = useSuspenseInfiniteQuery(options)
```

##### Options
[`useInfiniteQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-2)에서 `throwOnError`, `enabled`, `placeholderData`가 빠진 형태입니다.

##### Returns
[`useInfiniteQuery` 훅의 반환 값](/tech/react/tanstack-query-v5-api-reference/#returns-2)과 대부분 동일하지만, 아래 목록만 차이가 있습니다.

- `data`는 항상 `undefined`가 아닙니다.
  - 데이터를 가져오는 동안에는 Suspense가 동작하기 때문에 `data`는 항상 `undefined`가 아니게 됩니다.
- `isPlaceholderData`이 제거되었습니다.
  - `placeholderData`로 화면에 노출되는 것이 아니라 Suspense가 화면에 노출되기 때문에 `isPlaceholderData`가 제거되었습니다.
- `status`는 항상 `success`입니다.
  - `useInfiniteQuery` 훅의 `status` 반환 값 중 `pending`일 경우 Suspense가 동작하고, `error`일 경우 Error Boundary가 화면에 노출되기 때문에 항상 `success`가 됩니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/3z7s5v?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useSuspenseInfiniteQuery"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `useSuspenseQueries`
`useSuspenseQueries` 훅은 `useQueries`와 동일한 동작을 하지만 데이터를 가져오는 동안에 React의 Suspense 동작을 실행시킵니다.

#### 타입 정보
```tsx
const result = useSuspenseQueries(options)
```

##### Options
[`useQueries` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-1)에서 `throwOnError`, `enabled`, `placeholderData`가 빠진 형태입니다.

##### Returns
[`useQueries` 훅의 반환 값](/tech/react/tanstack-query-v5-api-reference/#returns-1)과 대부분 동일하지만, 아래 목록만 차이가 있습니다.

- `data`는 항상 `undefined`가 아닙니다.
  - 데이터를 가져오는 동안에는 Suspense가 동작하기 때문에 `data`는 항상 `undefined`가 아니게 됩니다.
- `isPlaceholderData`이 제거되었습니다.
  - `placeholderData`로 화면에 노출되는 것이 아니라 Suspense가 화면에 노출되기 때문에 `isPlaceholderData`가 제거되었습니다.
- `status`는 항상 `success`입니다.
  - `useQuery` 훅의 `status` 반환 값 중 `pending`일 경우 Suspense가 동작하고, `error`일 경우 Error Boundary가 화면에 노출되기 때문에 항상 `success`가 됩니다.

#### 예제
<div>
  <iframe src="https://codesandbox.io/embed/4jzy9s?view=Editor+%2B+Preview&module=%2Fsrc%2FApp.tsx"
  style="width:100%; height: 500px; border:0; border-radius: 10px; overflow:hidden;"
  title="useSuspenseQueries"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `QueryClient`
`QueryClient`는 캐시와 상호 작용할 수 있는 기능을 제공합니다. React Query를 사용하기 위해서 루트 위치에서 `QueryClient` 인스턴스를 생성하여 `QueryClientProvider` 컴포넌트의 prop으로 전달해야 합니다.

하위 컴포넌트에서는 `useQueryClient` 훅을 사용하여 `QueryClient` 인스턴스를 접근할 수 있고 `QueryClient` 인스턴스를 통해 다양한 React Query 기능을 사용할 수 있습니다.

#### 타입 정보
```tsx
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts })
```

##### Options
- `queryCache?: QueryCache`
  - 쿼리 클라이언트에서 사용할 쿼리 캐시입니다.
  - `QueryCache`는 [`QueryCache`의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-6)와 동일한 값입니다.
- `mutationCache?: MutationCache`
  - 쿼리 클라이언트에서 사용할 Mutation 캐시입니다.
  - `MutationCache`는 [`MutationCache`의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-7)와 동일한 값입니다.
- `defaultOptions?: DefaultOptions`
  - 쿼리와 Mutation에서 사용할 기본 옵션입니다.
  - `defaultOptions.queries`
    - [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)과 동일한 값입니다.
  - `defaultOptions.mutations`
    - [`useMutation` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-3)과 동일한 값입니다.

##### Returns
- `fetchQuery: (options) => Promise<TData>`
  - 쿼리로 데이터를 가져와 캐시 하는 데 사용하는 비동기 메서드입니다. 가져온 데이터를 `Promise` 형태로 반환하거나 에러가 발생했을 경우 에러를 `throw` 합니다.
  - 캐시 된 데이터가 `staleTime`이 지나지 않았다면 캐시 된 데이터를 반환합니다. `staleTime`이 지났다면 데이터를 새로 가져옵니다.
  - `options`는 `enabled`, `refetchInterval`, `refetchIntervalInBackground`, `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchOnMount`, `notifyOnChangeProps`, `throwOnError`, `select`, `suspense`, `placeholderData`를 제외한 `useQuery` 훅의 옵션과 동일합니다.
- `fetchInfiniteQuery: (options) => Promise<InfiniteData<TData, TPageParam>>`
  - 무한 쿼리로 데이터를 가져와 캐시 하는 데 사용되는 비동기 메서드입니다.
  - `options`는 `fetchQuery`와 동일합니다.
- `prefetchQuery: (opitons) => Promise<void>`
  - 쿼리 데이터를 사용하기 전에 데이터를 미리 가져와 캐시 하는 데 사용하는 비동기 메서드입니다. 가져온 데이터를 반환하지 않는다는 점을 제외하면 `fetchQuery`와 동일합니다.
  - `options`는 `fetchQuery`와 동일합니다.
- `prefetchInfiniteQuery: (options) => Promise<void>`
  - 무한 쿼리 데이터를 사용하기 전에 데이터를 미리 가져와 캐시 하는 데 사용하는 비동기 메서드입니다.
  - `options`는 `fetchQuery`와 동일합니다.
- `getQueryData: (queryKey: QueryKey) => TQueryFnData | undefined`
  - 쿼리의 캐시 된 데이터를 가져오는 함수입니다. 쿼리의 캐시 된 데이터가 없다면 `undefined`를 반환합니다.
- `ensureQueryData: (options) => Promise<TData>`
  - 쿼리의 캐시 된 데이터를 가져오는 비동기 함수입니다. 쿼리의 캐시 된 데이터가 없다면 `fetchQuery`가 호출되고 그 응답 값을 반환합니다.
  - `options`는 `fetchQuery`와 동일하지만, `queryKey`가 필수 값입니다.
- `getQueriesData: (filters: QueryFilters) => [queryKey: QueryKey, data: TQueryFnData | undefined][]`
  - 여러 쿼리의 캐시 된 데이터를 가져오는 함수입니다. 파라미터로 전달한 `filters`에 일치되는 쿼리의 데이터를 `[queryKey, data]` 튜플의 배열 형태로 반환합니다. 일치되는 쿼리가 없으면 빈 배열을 반환합니다.
  - `filters` 정보는 [`useIsFetching` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-4)을 참고 바랍니다.
- `setQueryData: (queryKey: QueryKey, updater: TQueryFnData | undefined | ((oldData: TQueryFnData | undefined) => TQueryFnData | undefined)) => TInferredQueryFnData | undefined`
  - 쿼리의 캐시 된 데이터를 업데이트하는 함수입니다. 쿼리가 존재하지 않으면 쿼리가 생성됩니다.
  - `queryKey: QueryKey`
    - 데이터를 업데이트할 쿼리 키입니다.
  - `updater: TQueryFnData | undefined | ((oldData: TQueryFnData | undefined) => TQueryFnData | undefined)`
    - 함수가 아닌 값을 전달할 경우 전달된 값으로 쿼리의 데이터가 업데이트됩니다.
    - 함수를 전달할 경우 함수는 현재 데이터를 파라미터로 하여 업데이트할 값을 반환해야 합니다. 함수가 반환된 값으로 쿼리의 데이터가 업데이트됩니다.
    - `undefined`를 전달하거나 함수의 반환 값이 `undefined`일 경우 쿼리의 데이터는 업데이트되지 않습니다.
    - `oldData`나 `getQueryData` 통해 가져온 캐시 된 데이터를 직접 수정하면 안 됩니다.
- `getQueryState: (querykey: QueryKey) => QueryState`
  - 쿼리의 상태를 가져오는 함수입니다. 쿼리가 존재하지 않으면 `undefined`를 반환합니다.
  - `queryKey: QueryKey`
    - 쿼리 상태를 가져올 쿼리 키입니다.
  - `QueryState`
    - 쿼리 상태를 담고 있는 객체입니다.
    - `data: TData | undefined`
      - 쿼리가 마지막으로 성공적으로 가져온 데이터입니다.
    - `dataUpdateCount: number`
      - 쿼리가 데이터를 업데이트 한 횟수입니다.
    - `dataUpdatedAt: number`
      - 데이터를 성공적으로 가져왔을 때(`status`가 `success`) 타임스탬프입니다.
    - `error: TError | null`
      - 쿼리에 에러가 발생한 경우 에러 정보를 담는 객체입니다.
    - `errorUpdateCount: number`
      - 쿼리가 데이터 가져오기를 실패한 총횟수입니다.
    - `errorUpdatedAt: number`
      - 가장 최근에 에러가 발생했을 때(`status`가 `error`) 타임스탬프입니다.
    - `fetchFailureCount: number`
      - 쿼리가 데이터 가져오기를 실패한 횟수입니다. 쿼리가 성공적으로 데이터를 가져온 경우 `0`으로 초기화됩니다.
    - `fetchFailureReason: TError | null`
      - 쿼리가 데이터를 가져오기 재시도를 실패했을 경우 에러 정보가 담깁니다. 쿼리가 성공적으로 데이터를 가져온 경우 `null`로 초기화 됩니다.
    - `fetchMeta: FetchMeta | null`
      - 쿼리에서 사용한 메타 정보입니다.
    - `isInvalidated: boolean`
      - 유효한 쿼리인지 나타내는 플래그입니다.
    - `status: 'pending' | 'error' | 'success'`
      - `pending`일 경우, 캐시 된 데이터가 없고 쿼리 시도가 아직 완료되지 않은 상태입니다.
      - `error`일 경우, 데이터를 가져올 때 에러가 발생한 상태입니다.
      - `success`일 경우, 데이터를 성공적으로 가져오거나, `enabled`가 `false`이면서 `initialData`가 설정된 상태입니다.
    - `fetchStatus: 'fetching' | 'paused' | 'idle'`
      - `fetching`일 경우, `queryFn`이 실행 중이거나, 초기 `status`가 `pending` 상태이거나, 백그라운드에서 데이터를 가져오는 상태입니다.
      - `paused`일 경우, 쿼리가 데이터를 가져오려고 했지만 중지된 상태입니다. 대표적으로 네트워크가 끊겨 쿼리가 중지됐을 때 `paused` 상태입니다.
      - `idle`일 경우, `fetching` 상태도 `paused` 상태도 아닌 상태입니다.
- `setQueriesData: (filters: QueryFilters, updater: TQueryFnData | (oldData: TQueryFnData | undefined) => TQueryFnData) => [QueryKey, TQueryFnData | undefined][]`
  - `filters`에 해당하는 여러 쿼리의 캐시 된 데이터를 업데이트하는 함수입니다. 내부적으로 각각의 쿼리는 `setQueryData` 함수가 호출됩니다.
  - `filters` 정보는 [`useIsFetching` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-4)을 참고 바랍니다.
  - `updater` 정보는 `setQueryData` 함수의 `updater` 파라미터와 동일합니다.
- `invalidateQueries: (filters?: InvalidateQueryFilters, options?: InvalidateOptions) => Promise<void>`
  - `filters`에 해당하는 쿼리를 무효화하고 데이터를 다시 가져오는 비동기 함수입니다.
  - `filters?: InvalidateQueryFilters`
    - `QueryFilter`에 `refetchType?: 'active' | 'inactive' | 'all' | 'none'`가 추가된 형태입니다.
    - `refetchType?: 'active' | 'inactive' | 'all' | 'none'` (default: `'active'`)
      - `active`로 설정할 경우, 활성화된 쿼리의 데이터를 무효화 후 다시 가져옵니다.
      - `inactive`로 설정할 경우, 비활성화된 쿼리의 데이터를 무효화 후 다시 가져옵니다.
      - `all`로 설정할 경우, 활성화/비활성화된 쿼리의 데이터를 무효화 후 다시 가져옵니다.
      - `none`으로 설정할 경우, 쿼리의 데이터를 무효화하지만 다시 가져오지는 않습니다.
  - `options?: InvalidateOptions`
    - `throwOnError?: boolean`
      - `true`로 설정할 경우 쿼리에서 에러가 발생할 경우 가장 가까운 에러 바운더리(Error Boundary)로 에러를 전파합니다.
      - `false`로 설정할 경우 쿼리에서 에러가 발생해도 에러 바운더리로 에러를 전파하지 않습니다.
    - `cancelRefetch?: boolean` (default `true`)
      - `true`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 진행 중이던 요청을 취소하고 재요청합니다.
      - `false`로 설정할 경우 쿼리가 데이터를 가져오는 중일 경우 데이터를 재요청하지 않습니다.
- `refetchQueries: (filters?: QueryFilters, options?: RefetchOptions) => Promise<void>`
  - `filters`에 해당하는 쿼리의 데이터를 다시 가져오는 비동기 함수입니다.
  - `filters` 정보는 [`useIsFetching` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-4)을 참고 바랍니다.
  - `options` 정보는 `invalidateQueries` 함수의 `options`와 동일합니다.
- `cancelQueries: (filters?: QueryFilters) => Promise<void>`
  - `filters`에 해당하는 쿼리의 요청을 취소하는 비동기 함수입니다.
  - `filters` 정보는 [`useIsFetching` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-4)을 참고 바랍니다.
- `removeQueries: (filters?: QueryFilters) => void`
  - `filters`에 해당하는 쿼리의 캐시를 삭제하는 함수입니다.
  - `filters` 정보는 [`useIsFetching` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-4)을 참고 바랍니다.
- `resetQueries: (filters?: QueryFilters, options?: ResetOptions) => Promise<void>`
  - `filters`에 해당하는 쿼리를 초기 상태로 재설정하는 비동기 함수입니다.
  - `invalidateQueries` 함수와 달리 쿼리는 데이터를 미리 가져온 상태가 됩니다. `initialData`가 정의된 쿼리라면 해당 데이터로 초기화되고, 활성화된 쿼리는 데이터를 다시 가져옵니다.
  - `filters` 정보는 [`useIsFetching` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-4)을 참고 바랍니다.
  - `options` 정보는 `invalidateQueries` 함수의 `options`와 동일합니다.
- `isFetching: (filters?: QueryFilters) => number`
  - `filters`에 해당하는 쿼리 중 데이터를 가져오는 중인 쿼리의 수를 반환하는 함수입니다. `useIsFetching` 훅과 동일한 역할을 합니다.
  - `filters` 정보는 [`useIsFetching` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-4)을 참고 바랍니다.
- `isMutating: (filters?: QueryFilters) => number`
  - `filters`에 해당하는 Mutation 중인 수를 반환하는 함수입니다. `useIsMutating` 훅과 동일한 역할을 합니다.
  - `filters` 정보는 [`useIsFetching` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-4)을 참고 바랍니다.
- `getDefaultOptions: () => DefaultOptions`
  - `QueryClient` 인스턴스를 생성할 때 전달할 `defaultOptions` 혹은 `setDefaultOptions` 함수에 전달한 파라미터를 반환합니다.
  - `DefaultOptions`
    - 쿼리와 Mutation에서 사용할 기본 옵션입니다.
    - `queries?: QueryObserverOptions`
      - [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)과 동일한 값입니다.
    - `mutations?: MutationObserverOptions`
      - [`useMutation` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-3)과 동일한 값입니다.
- `setDefaultOptions: (options: DefaultOptions) => void`
  - `QueryClient`의 기본 옵션을 동적으로 변경하기 위해 사용되는 함수입니다.
  - `DefaultOptions`
    - 쿼리와 Mutation에서 사용할 기본 옵션입니다.
    - `queries?: QueryObserverOptions`
      - [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)과 동일한 값입니다.
    - `mutations?: MutationObserverOptions`
      - [`useMutation` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-3)과 동일한 값입니다.
- `getQueryDefaults: (queryKey: QueryKey) => QueryObserverOptions`
  - `queryKey`에 해당되는 쿼리의 기본 옵션을 반환합니다. `queryKey`에 일치하는 쿼리가 여러 개일 경우 가장 먼저 매칭되는 쿼리의 기본 옵션을 반환합니다.
  - `QueryObserverOptions`는 [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)과 동일한 값입니다.
- `setQueryDefaults: (queryKey: QueryKey, options: QueryOptions) => void`
  - `queryKey`에 해당되는 쿼리의 기본 옵션을 `options`로 변경합니다. `queryKey`에 일치하는 쿼리가 여러 개일 경우 가장 먼저 매칭되는 쿼리의 기본 옵션을 변경합니다.
  - `QueryOptions`은 [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)에서 `queryKey`를 제외한 값의 옵셔널 한 형태입니다. 즉 `Partial<Omit<QueryObserverOptions, 'queryKey''>>`와 동일합니다.
- `getMutationDefaults: (mutationKey: MutationKey) => MutationObserverOptions`
  - `mutationKey`에 해당되는 Mutation의 기본 옵션을 반환합니다.
  - `MutationObserverOptions`은 [`useMutation` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-3)과 동일한 값입니다.
- `setMutationDefaults: (mutationKey: MutationKey, options: MutationOptions) => void`
  - `mutationKey`에 해당되는 Mutation의 기본 옵션을 `options`로 변경합니다.
  - `MutationOptions`은 [`useMutation` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-3)에서 `mutationKey`를 제외한 값의 옵셔널 한 형태입니다. 즉 `Partial<Omit<MutationObserverOptions, 'mutationKey''>>`와 동일합니다.
- `getQueryCache: () => QueryCache`
  - `QueryClient`에 연결된 `QueryCache`를 반환합니다.
  - `QueryCache`는 [`QueryCache`의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-6)와 동일한 값입니다.
- `getMutationCache: () => MutationCache`
  - `QueryClient`에 연결된 `MutationCache`를 반환합니다.
  - `MutationCache`는 [`MutationCache`의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-7)와 동일한 값입니다.
- `clear: () => void`
  - 모든 캐시를 삭제하는 함수입니다.
- `resumePausedMutations: () => Promise<unknown>`
  - 네트워크 연결이 되지 않아 일시 중지된 Mutation을 다시 시작하는 데 사용하는 함수입니다.

### `useQueryClient`
현재 사용하는 `QueryClient`의 인스턴스를 반환하는 훅입니다.

#### 타입 정보
```tsx
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient(queryClient?: QueryClient)
```

##### Options
- `queryClient?: QueryClient`
  - 커스텀한 `QueryClient`를 사용하려면 이 파라미터를 전달해야 합니다. 전달하지 않을 경우 가장 가까운 콘텍스트의 `QueryClient`를 사용합니다.

##### Returns
`useQueryClient` 훅의 반환 값은 [`QueryClient`의 반환 값](/tech/react/tanstack-query-v5-api-reference/#returns-12)과 동일합니다.

### `QueryClientProvider`
`QueryClientProvider` 컴포넌트는 React Query를 사용하기 위해서 루트 위치에서 선언되어야 합니다. `QueryClientProvider`의 `client` 속성으로 `QueryClient`를 전달해야 하며, 전달된 `QueryClient`는 하위 컴포넌트에서 `useQuery` 등, React Query를 사용할 때 사용됩니다.

#### 타입 정보
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

##### Props
- `client: QueryClient`
  - 하위 컴포넌트에서 React Query를 사용할 때 사용되는 `QueryClient`입니다.

### `QueryObserver`
`QueryObserver`는 쿼리를 관찰할 때 사용됩니다. `useQuery`는 내부적으로 `QueryObserver` 인스턴스를 만들어 사용하는데, `useQuery` 훅을 사용하면 되기 때문에 직접 `QueryObserver` 인스턴스를 생성하는 경우는 많지 않습니다.

#### 타입 정보
```tsx
const observer = new QueryObserver(queryClient, { queryKey: ['posts'] })

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
  unsubscribe()
})
```

##### Options
- `queryClient: QueryClient`
  - 관찰할 쿼리가 있는 `QueryClient` 인스턴스입니다.
- `options: QueryObserverOptions`
  - 쿼리 데이터를 가져오기 위해 사용되는 옵션입니다. [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)과 동일한 값입니다.

### `InfiniteQueryObserver`
`InfiniteQueryObserver`는 무한 쿼리를 관찰합니다. `useInfiniteQuery`는 내부적으로 `InfiniteQueryObserver` 인스턴스를 만들어 사용하는데, `useInfiniteQuery` 혹을 사용하면 되기 때문에 직접 `InfiniteQueryObserver` 인스턴스를 생성하는 경우는 많지 않습니다.

#### 타입 정보
```tsx
const observer = new InfiniteQueryObserver(queryClient, {
  queryKey: ['posts'],
  queryFn: fetchPosts,
  getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
})

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
  unsubscribe()
})
```

##### Options
- `queryClient: QueryClient`
  - 관찰할 무한 쿼리가 있는 `QueryClient` 인스턴스입니다.
- `options: InfiniteQueryObserverOptions`
  - 무한 쿼리 데이터를 가져오기 위해 사용되는 옵션입니다. [`useInfiniteQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options-2)과 동일한 값입니다.

### `QueriesObserver`
`QueriesObserver`는 쿼리들(queries)을 관찰합니다. `useQueries`의 내부적으로 `QueriesObserver` 인스턴스를 만들어 사용하는데, `useQueries` 훅을 사용하면 되기 때문에 직접 `QueriesObserver` 인스턴스를 생성하는 경우는 많지 않습니다.

#### 타입 정보
```tsx
const observer = new QueriesObserver(queryClient, [
  { queryKey: ['post', 1], queryFn: fetchPost },
  { queryKey: ['post', 2], queryFn: fetchPost },
])

const unsubscribe = observer.subscribe((result) => {
  console.log(result)
  unsubscribe()
})
```

##### Options
- `queryClient: QueryClient`
  - 관찰할 무한 쿼리가 있는 `QueryClient` 인스턴스입니다.
- `options: QueryObserverOptions[]`
  - queries의 데이터를 가져오기 위해 사용되는 옵션입니다. [`useQuery` 훅의 옵션](/tech/react/tanstack-query-v5-api-reference/#options)과 동일한 값의 배열입니다.

### `QueryErrorResetBoundary`
`suspense`나 `throwOnError`를 사용하면 컴포넌트에서 에러가 발생할 때 에러 화면으로 전환할 수 있습니다. 전환된 에러 화면에서 쿼리의 에러를 초기화하고 데이터를 다시 요청해야 할 때 사용하는 것이 `QueryErrorResetBoundary` 컴포넌트입니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App: React.FC = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            There was an error!
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
          </div>
        )}
      >
        <Page />
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
```

### `useQueryErrorResetBoundary`
`useQueryErrorResetBoundary` 훅은 `QueryErrorResetBoundary` 컴포넌트를 훅 형태로 사용할 수 있게 합니다. 아래 코드와 같이 사용할 수 있습니다.

```tsx
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

const App: React.FC = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div>
          There was an error!
          <Button onClick={() => resetErrorBoundary()}>Try again</Button>
        </div>
      )}
    >
      <Page />
    </ErrorBoundary>
  )
}
```

### `focusManager`
`focusManager`은 React Query가 포커스 될 때 발생하는 이벤트 리스너를 변경하거나, 수동으로 포커스 할 때 사용됩니다.

#### 타입 정보
- `focusManager.setEventListener`
  - 이벤트 리스너를 변경할 때 사용되는 함수입니다.
  - ```tsx
    import { focusManager } from '@tanstack/react-query'

    focusManager.setEventListener((handleFocus) => {
      // Listen to visibilitychange
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('visibilitychange', handleFocus, false)
      }

      return () => {
        // Be sure to unsubscribe if a new handler is set
        window.removeEventListener('visibilitychange', handleFocus)
      }
    })
    ```
- `focusManager.subscribe`
  - 포커스 상태가 변경되는 것을 구독하는 함수입니다. 구독을 취소하는 함수를 반환합니다.
  - ```tsx
    import { focusManager } from '@tanstack/react-query'

    const unsubscribe = focusManager.subscribe((isVisible) => {
      console.log('isVisible', isVisible)
    })
    ```
- `focusManager.setFocused`
  - 포커스 상태를 수동으로 설정할 수 있는 함수입니다.
  - ```tsx
    import { focusManager } from '@tanstack/react-query'

    // Set focused
    focusManager.setFocused(true)

    // Set unfocused
    focusManager.setFocused(false)

    // Fallback to the default focus check
    focusManager.setFocused(undefined)
    ```
- `focusManager.isFocused`
  - 현재 포커스 상태를 가져오는 함수입니다.
  - ```tsx
    const isFocused = focusManager.isFocused()
    ```

### `onlineManager`
`onlineManager`은 온라인 상태를 감지하는 이벤트 리스터를 변경하거나, 수동으로 온라인 상태로 변경할 때 사용됩니다.

#### 타입 정보
- `onlineManager.setEventListener`
  - 이벤트 리스너를 변경할 때 사용되는 함수입니다.
  - ```tsx
    import NetInfo from '@react-native-community/netinfo'
    import { onlineManager } from '@tanstack/react-query'

    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected)
      })
    })
    ```
- `onlineManager.subscribe`
  - 온라인 상태가 변경되는 것을 구독하는 함수입니다. 구독을 취소하는 함수를 반환합니다.
  - ```tsx
    import { onlineManager } from '@tanstack/react-query'

    const unsubscribe = onlineManager.subscribe((isOnline) => {
      console.log('isOnline', isOnline)
    })
    ```
- `onlineManager.setOnline`
  - 온라인 상태를 수동으로 설정할 수 있는 함수입니다.
  - ```tsx
    import { onlineManager } from '@tanstack/react-query'

    // Set to online
    onlineManager.setOnline(true)

    // Set to offline
    onlineManager.setOnline(false)
    ```
- `onlineManager.isOnline`
  - 현재 온라인 상태를 가져오는 함수입니다.
  - ```tsx
    const isOnline = onlineManager.isOnline()
    ```

##### 참고
- [https://tanstack.com/query/v5/docs/framework/react/overview](https://tanstack.com/query/v5/docs/framework/react/overview)
- [https://tanstack.com/blog/announcing-tanstack-query-v5](https://tanstack.com/blog/announcing-tanstack-query-v5)
- [https://velog.io/@hyunjine/Inside-React-Query](https://velog.io/@hyunjine/Inside-React-Query)
- [https://leego.tistory.com/entry/react-query는-어떻게-작동할까](https://leego.tistory.com/entry/react-query는-어떻게-작동할까)
- [https://fe-developers.kakaoent.com/2023/230720-react-query/](https://fe-developers.kakaoent.com/2023/230720-react-query/)
- [https://velog.io/@hyunjine/Inside-React-Query](https://velog.io/@hyunjine/Inside-React-Query)
- [https://velog.io/@dev_jazziron/React-Query-Render-Optimizations](https://velog.io/@dev_jazziron/React-Query-Render-Optimizations)
- [https://yiyb-blog.vercel.app/posts/error-boundary-with-react-query](https://yiyb-blog.vercel.app/posts/error-boundary-with-react-query)
- [https://velog.io/@suyeon9456/React-Query-Error-Boundary-적용하기](https://velog.io/@suyeon9456/React-Query-Error-Boundary-적용하기)
- [https://www.timegambit.com/blog/digging/react-query/01](https://www.timegambit.com/blog/digging/react-query/01)
- [https://www.timegambit.com/blog/digging/react-query/02](https://www.timegambit.com/blog/digging/react-query/02)
- [https://www.timegambit.com/blog/digging/react-query/03](https://www.timegambit.com/blog/digging/react-query/03)
