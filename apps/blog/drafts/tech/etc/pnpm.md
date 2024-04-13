---
layout: post
title: '[ETC] PNPM'
featured-img: etc/pnpm.png
category: [tech, etc]
summary:
---

패키지 매니저로 NPM, Yarn, PNPM 등이 있습니다. 그 중 PNPM은 Performant Node Package Manager 약자로 고성능 노드 패키지 매니저라는 뜻을 가지고 있습니다. [Turborepo는 PNPM 사용을 권장](https://turbo.build/repo/docs/getting-started/create-new)하는 등 다른 서비스에서도 PNPM의 성능을 인정하고 있습니다.

## PNPM는 정말 빠른가?
개발자에서 좋은 성능을 만들어 준다는 것은 매우 매혹적인 이야기입니다. 패키지 매니저가 빠른 성능을 제공하면 패키지를 설치하는 속도를 단축시켜주어 개발 경험을 향상 시키고, CI에서 배포하는데 걸리는 시간을 단축시켜줍니다. 아래 표는 가장 유명한 3개의 패키지 매니저인 [NPM, Yarn, PNPM을 비교](https://pnpm.io/benchmarks)한 표로 [`package.json`에 나열된 패키지](https://github.com/pnpm/pnpm.io/blob/main/benchmarks/fixtures/alotta-files/package.json)를 설치/업데이트 하는데 걸리는 시간를 측정하였습니다.

|   행동    |                       조건                       |                         설명                          |                                 결과                                 |
|:-------:|:----------------------------------------------:|:---------------------------------------------------:|:------------------------------------------------------------------:|
| install | Cache: X<br />lockfile: X<br />node_modules: X |  lock 파일도, 캐시도, node_modules 폴더도 없는 완전히 새로 설치하는 경우  | npm: 30.3s<br />pnpm: 8.1s<br />Yarn: 7.3s<br />**Yarn Pnp: 3.6s** |
| install | Cache: O<br />lockfile: O<br />node_modules: O |     패키지 설치가 완료된 후 다시 설치 명령어를 실행하여 패키지를 설치하는 경우      |   npm: 1.5s<br />**pnpm: 1s**<br />Yarn: 5.2s<br />Yarn Pnp: n/a   |
| install | Cache: O<br />lockfile: O<br />node_modules: X |          개발자가 레포지토리를 가져와서 처음 패키지를 설치하는 경우           | npm: 8.1s<br />pnpm: 2.6s<br />Yarn: 5.4s<br />**Yarn Pnp: 1.4s**  |
| install | Cache: O<br />lockfile: X<br />node_modules: X |     개발자가 레포지토리를 가져와서 lock 파일 없이 처음 패키지를 설치하는 경우     |   npm: 13s<br />pnpm: 5.7s<br />Yarn: 7.3s<br />**Yarn Pnp: 3s**   |
| install | Cache: X<br />lockfile: O<br />node_modules: X |                CI 서버에서 패키지를 설치하는 경우                 | npm: 11.8s<br />pnpm: 5.2s<br />Yarn: 5.4s<br />**Yarn Pnp: 1.4s** |
| install | Cache: O<br />lockfile: X<br />node_modules: O |            lock 파일 삭제 후 다시 패키지를 설치하는 경우             |  **npm: 1.7s**<br />pnpm: 2.4s<br />Yarn: 6.9s<br />Yarn Pnp: n/a  |
| install | Cache: X<br />lockfile: O<br />node_modules: O |              캐시를 삭제하고 패키지를 다시 설치하는 경우               |   npm: 1.4s<br />**pnpm: 1s**<br />Yarn: 5.2s<br />Yarn Pnp: n/a   |
| install | Cache: X<br />lockfile: X<br />node_modules: O |          캐시와 lock 파일 삭제 후 다시 패키지를 설치하는 경우           |  **npm: 1.7s**<br />pnpm: 5.3s<br />Yarn: 6.9s<br />Yarn Pnp: n/a  |
| update  |                                                | package.json에서 버전을 변경하고 패키지를 다시 설치하여 종속성을 업데이트 한 경우 |  npm: 6.6s<br />pnpm: 3.5s<br />Yarn: 5.8s<br />**Yarn Pnp: 3s**   |

Yarn Pnp는 `node_modules` 폴더가 존재하지 않기 때문에 `node_modules` 폴더가 있는 조건은 모두 `n/a`입니다. 가장 빠른 성능을 보인 패키지 매니저는 굵은 글씨로 표시했습니다. 아래 그림은 위의 표의 결과를 그래프로 나타낸 그림입니다.

![NPM, PNPM, Yarn, Yarn Pnp 성능 비교](/assets/img/posts/etc/npm_pnpm_yarn_yarn_pnp.svg)

### PNPM 성능에 대한 고찰
Yarn Pnp는 `node_modules` 폴더 없이 `.yarn/cache`에 압축 파일 형태로 저장된 패키지와 종속성 정보를 담고 있는 `.pnp.cjs` 파일로 종속성을 관리하는 메커니즘을 가지고 있습니다. 그렇기 때문에 패키지를 설치

가장 중여한 것은 개발자가 레파지토리를 클론 받고 패키지를 설치하는 경우, 패키지를 업데이트 하는 경우, CI 서버를 통해 배포하는 경우

## PNPM 컨샙
PNPM이 어떻게 `node_modules`를 구성하는지 이해하면 PNPM이 왜 고성능이라고 자랑하는지 이해할 수 있습니다.

### 디스크 공간 절약

> ##### Hard Link와 Symbolic(Soft) Link, inode
> - Symbolic(Soft) Link:
> - Hard Link:
> - inode:

### 설치 속도 향상

### 플랫 하지 않은 `node_modules`
- 유령 종속성 해결

## PNPM CLI
- 패키지 설치 & 삭제

##### 참고
- [https://jeonghwan-kim.github.io/2023/10/20/pnpm](https://jeonghwan-kim.github.io/2023/10/20/pnpm)
- [https://pnpm.io/](https://pnpm.io/)
- [http://www.metalpen.net/blog/?p=439](http://www.metalpen.net/blog/?p=439)
- [https://yarnpkg.com/features/pnp](https://yarnpkg.com/features/pnp)
