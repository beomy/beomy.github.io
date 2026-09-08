---
layout: post
title: '[React] TanStack Query v5으로 마이그레이션'
featured-img: react/tanstack-query-v5.png
category: [tech, react]
summary:
---

TanStack Query v5은 v4에 비해 20% 더 작고, 개발자 경험 향상을 위해 사용성을 통일하였습니다.

- isLoading -> isPending
- React 18이상 버전에서 사용 가능
- Typescript 4.7 이상에서 사용가능
- Typescript가 더 정교해짐
- cacheTime -> gcTime
- isInitialLoading -> isLoading
- keepPreviousData는 placeholderData로 지원 가능
- useMutaion의 Optimistic Update가 변경됨


##### 부록
- v4에서 v5로 마이그레이션

##### 참고
- [https://tanstack.com/query/v5/docs/react/overview](https://tanstack.com/query/v5/docs/react/overview)
- [https://tanstack.com/query/v4/docs/react/overview](https://tanstack.com/query/v4/docs/react/overview)
- [https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5](https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5)
