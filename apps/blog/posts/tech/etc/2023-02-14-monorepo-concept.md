---
layout: post
title: '[ETC] Monorepo - 개념'
featured-img: etc/monorepo.png
category: [tech, etc]
summary: 하나의 저장소(Repository)에서 여러개의 프로젝트를 관리하는 방식을 모노레포라고 합니다. 이번 포스트에서는 모노레포가 무엇인지 모노레포가 등장하기까지 어떻게 프로젝트 구성이 발전되어 왔는지 살펴보도록 하겠습니다.
---

하나의 저장소(Repository)에서 여러개의 프로젝트를 관리하는 방식을 모노레포라고 합니다. 이번 포스트에서는 모노레포가 무엇인지 모노레포가 등장하기까지 어떻게 프로젝트 구성이 발전되어 왔는지 살펴보도록 하겠습니다.

> ##### TL;DR
> - 모놀로식 애플리케이션: 서비스에 필요한 모든 기능들을 포함하고 있어 소수의 개발자가 빠르게 개발할 수 있으나, 모듈화가 어렵고 유지보수가 어려워 질 수 있어 큰 프로젝트에 적합한 구조는 아닙니다.
> - 멀티레포: 다른 프로젝트와 의존성을 가지지 않아 유지보수가 쉬워지고 강한 오너쉽을 가질 수 있으나, 프로젝트 별 코드 공유가 어려워 중복 코드가 만들어질 가능성이 높습니다.
> - 모노레포: 프로젝트 사이의 코드 공유가 가능하여 중복 코드가 만들어질 가능성이 적고, NPM에 배포할 필요가 없어 의존성 관리가 쉽지만, 프로젝트가 많아질 수록 CI 속도가 느려질 수 있습니다. 프로젝트를 넘나드는 리팩토링이 가능하여 무분별한 리팩토링이 발생할 가능성이 있습니다.

## 프로젝트 구성의 발전
아래 그림을 보면 프로젝트를 구성하는 방법의 발전을 한눈에 확인 할 수 있습니다.

![프로젝트 구성 발전 과정](/assets/img/posts/etc/monorepo_concept.png)

프로젝트 구성하는 방법은 모든 기능들을 담고 있는 모놀리식 애플리케이션에서, 기능들을 분리하여 각각의 저장소에서 관리하는 멀티레포, 하나의 저장소에서 여러개의 프로젝트를 관리하는 모노레포 형태로 발전해 갔습니다. 프로젝트를 구성하는 방법인 모놀리식 애플리케이션, 멀티레포, 모노레포를 하나씩 살펴보도록 하겠습니다.

### 모놀리식 애플리케이션 (Monolithic application)
모놀리식 애플리케이션은 모듈화 없이 모든 구성 요소가 한 프로젝트 안에 통합된 소프트웨어 애플리케이션을 이야기합니다. DB 커넥션을 맺고, 데이터를 요청하며, 화면을 그리는 로직이 한 프로젝트 안에 구현된 초기 웹 서비스를 모놀리식 애플리션으로 볼 수 있습니다.

#### 장점
- 소수의 개발자가 빠르게 개발할 수 있음

#### 단점
- 관심사 분리가 어려워서 설계, 리팩토링이 어려움
- 매번 거대한 프로젝트를 배포해야 함
- 일부분의 에러가 전체 서비스에 영향을 줄 수 있음

### 멀티레포 (Multirepo)
멀티레포는 폴리레포(Polyrepo)라고도 불립니다. 모놀리식 애플리케이션을 모듈화하여 별도의 저장소에서 관리하는 구조입니다. 이렇게 분리된 프로젝트는 서로 독립적이기 때문에 개발, 테스트, 빌드 배포 등이 각각 존재하게 됩니다. 현재 보편적으로 사용되는 방법으로 하나의 서비스는 하나의 저장소에서 관리하는 형태입니다.

#### 장점
- 다른 프로젝트와 의존성을 가고 있지 않아 독립적으로 개발이 가능
- 모듈화하여 관심사 분리가 쉬움
- 강한 오너쉽

#### 단점
- 각 프로젝트의 코드 컨벤션 통일이 어려움
- 코드 재사용이 어려워 중복 코드가 만들어질 가능성이 높음
- 관리 포인트 증가

### 모노레포 (Monorepo)
하나의 저장소에 여러 프로젝트를 관리하는 구조입니다. NPM 배포 없이 프로젝트 간에 코드 공유가 가능합니다.

#### 장점
- 코드 재사용이 용이함
- NPM에 배포할 필요가 없어 의존성 관리가 쉬움

#### 단점
- CI 속도 저하 가능성이 있음
- 무분별한 리펙토링의 가능성이 있음

## 언제 모노레포를 사용해야 하나?
모노레포의 최고의 장점은 프로젝트 사이의 코드 공유가 간편하다는 것입니다. 이 장점을 최대한 활용할 수 있는 상황에서 모노레포를 사용하는 것이 좋습니다. 아래의 경우가 모노레포를 사용하기 적절한 상황입니다.

- **유사한 서비스들을 만들 때**: 한 서비스의 모바일 페이지, PC 페이지를 만들어야 할 경우 공통 기능들이 존재할 수 있기 때문에 모노레포로 구성하는 것이 좋습니다.
- **여러 프로젝트를 한 눈에 파악해야 할 때**: 하나의 저장소에 여러 프로젝트를 구성할 수 있기 때문에 어떤 프로젝트들이 있는지 한 눈에 파악해야 할 때에도 모노레포를 사용하는 것이 좋습니다.
- **동일한 개발자 경험을 느껴야 할 때**: 하나의 저장소에서 동일한 린트, 프리티어를 설정하여 동일한 개발자 경험을 줄 수 있습니다.

## 모노레포 구성을 도와주는 도구
`Yarn`, `Lerna`, `Turborepo`, `Nx`, `Npm`, `Pnpm`은 모노레포를 간편하게 만들 수 있는 도구들 입니다. [2022 state of js](https://2022.stateofjs.com/en-US/libraries/monorepo-tools/)에서 2022년에 사람들이 어떠한 모노레포 도구들에 관심을 가지고 사용하고 있는지 확인 할 수 있습니다.

아래는 각각의 모노레포 도구들을 사용하는 프로젝트 목록입니다.

- `Yarn`: [React](https://github.com/facebook/react/blob/main/package.json#L3-L5), [React-router](https://github.com/remix-run/react-router/blob/main/package.json#L4-L12), [Babel 7.20](https://github.com/babel/babel/blob/main/package.json#L78-L85)
- `Lerna` + `Yarn`: [Next 12](https://github.com/vercel/next.js/blob/21994ce591be70b03176a2512c7304381d52e629/lerna.json#L2), [Babel 7.12](https://github.com/babel/babel/blob/v7.12.12/lerna.json), [Jest](https://github.com/facebook/jest/blob/main/lerna.json#L5), [Create React App](https://github.com/facebook/create-react-app/blob/main/lerna.json#L3), [Vue-cli](https://github.com/vuejs/vue-cli/blob/dev/lerna.json#L2), [Webpack-cli](https://github.com/webpack/webpack-cli/blob/master/lerna.json#L5), [Storybook](https://github.com/storybookjs/storybook/blob/next/code/lerna.json#L2)
- `Turborepo`: [Next 13](https://github.com/vercel/next.js/blob/canary/turbo.json)(+ `Pnpm`), [그 외 모든 레포 링크](https://github.com/vercel/turbo/discussions/103)
- `Nx`: [FluentUI](https://github.com/microsoft/fluentui/blob/master/nx.json), [NgRx](https://github.com/ngrx/platform/blob/master/nx.json)
- `Npm`: [Apollo-server](https://github.com/apollographql/apollo-server/blob/main/package.json#L32-L38)
- `Pnpm`: [Nuxt](https://github.com/nuxt/nuxt/blob/main/pnpm-workspace.yaml), [Vue 3](https://github.com/vuejs/core/blob/main/pnpm-workspace.yaml), [Vue 2.7](https://github.com/vuejs/vue/blob/main/pnpm-workspace.yaml), [그 외 모든 레포 링크](https://pnpm.io/users)

##### 참고
- [https://d2.naver.com/helloworld/0923884](https://d2.naver.com/helloworld/0923884)
- [https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo](https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo)
- [https://blog.mathpresso.com/팀워크-향상을-위한-모노레포-monorepo-시스템-구축-3ae1b0112f1b](https://blog.mathpresso.com/팀워크-향상을-위한-모노레포-monorepo-시스템-구축-3ae1b0112f1b)
- [https://medium.com/hcleedev/dev-monorepo-개념-알아보기-33fd3ce2b767](https://medium.com/hcleedev/dev-monorepo-개념-알아보기-33fd3ce2b767)
- [https://levelup.gitconnected.com/moving-from-multiple-repositories-to-a-lerna-js-mono-repo-faa97aeee35b](https://levelup.gitconnected.com/moving-from-multiple-repositories-to-a-lerna-js-mono-repo-faa97aeee35b)
- [https://tech.buzzvil.com/handbook/multirepo-vs-monorepo/](https://tech.buzzvil.com/handbook/multirepo-vs-monorepo/)
- [https://daaa0555.tistory.com/457](https://daaa0555.tistory.com/457)
