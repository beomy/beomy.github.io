---
layout: post
title: '[ETC] Monorepo'
featured-img: etc/monorepo.png
category: [tech, etc]
summary: 모노레포를 사용하면 여러개의 프로젝트를 하나의 레파지토리(Repository)에서 관리 할 수 있습니다. 이번 포스트에서는 모노레포의 개념과 모노레포 프로젝트를 구현하는 방법들을 살펴보도록하겠습니다.
---

모노레포를 사용하면 여러개의 프로젝트를 하나의 레파지토리(Repository)에서 관리 할 수 있습니다. 이번 포스트에서는 모노레포의 개념과 모노레포 프로젝트를 구현하는 방법들을 살펴보도록하겠습니다.

# 모노레포의 등장 배경

## 모놀리식 어플리케이션
- 모놀리식 아키텍쳐?: BE도 포함된 옛날의 구조 형태?

## 멀티레포

# 모노레포를 사용해야 할 경우

# 모노레포 툴
- [stateofjs](https://2021.stateofjs.com/en-US/libraries/monorepo-tools) 참고

## Lerna
- 지원 중단: nx 개발사인 Nrwl에 넘김

## Nx
- 개발사: google
- cra-to-nx로 cra 프로젝트 생성 가능, 다른 생성 방법도 함께
- 단일 근원 원칙
- Lerna에서 마이그레이션 방법 (app 당 package.json 가능?)

## Turborepo
- 개발사: Vercel
- Vercel과 AWS, Micro, PayPal, Discord, LINE+에서 사용중
- yarn berry (yarn 3.x) 지원: pnp는 미지원

## Yarn berry(Yarn 3.*) workspace

### Yarn classic(Yarn 1.*)의 문제점
- Yarn 1 버전을 classic Yarn 2 이상의 버전을 berry라고 함
- 의존성 탐색 알고리즘의 비효율
- 저장 공간과 설치 시간
- 유령 의존성(phantom dependency)

### Pnp(Plug'n'Play)
- PnP(Plug'n'Play): node_modules를 사용하지 않고 `.yarn/cache`에 패키지들이 zip 형태로 저장되고, `.pnp.cjs`에 패키지의 의존성 정보를 저장하여 디스트 I/O 없이 `.pnp.cjs`를 사용하여 패키지가 어떤 라이브러리에 의존성을 가지는지 알 수 있습니다.

- 의존성이 .yarn/cache에 수평적으로 존재하므로 모든 패키지에 대한 접근 시간이 O(1)이 된다. 따라서 require()에 소요되는 시간이 크게 단축된다.
- 압축 파일 단위로 설치되기 때문에 의존성을 구성하는 파일의 수가 절대적으로 감소한다. 여기에 zero-install 전략을 사용하면 아예 설치 과정을 생략할 수 있다.
- 호이스팅을 사용하지 않기 때문에 의도하지 않은 의존성이 발생하지 않는다.

### Zero install
- `.yarn/cache`에 저장되어 있는 패키지와 `.pnp.cjs`에 저장되어 있는 패키지의 의존성 정보를 Git으로 관리하면 Zero-Install을 사용할 수 있습니다.
  - 패키지와 패키지의 의존성 정보를 Git을 통해 관리하면 패키지를 설치하지 않아고 프로젝트를 실행/빌드 할 수 있게 됩니다. 또한 브랜치를 바꾸더라도 `yarn install`을 통해 패키지를 새로 설치하지 않아도 됩니다.
  - Zero-Install을 사용하면 프로젝트를 빌드하기 위한 패키지 설치가 필요없이 Git Clone 만으로 프로젝트가 바로 빌드 가능한 상태가 되어 CI에서 의존성을 설치하는 시간을 절약할 수 있습니다.

### `pnpMode: "loose"`
- @emotion + storybook 지원 가능? -> pnpMode loose
  - loose는 fallback pool을 만들어 종속된 패키지가 패키지를 찾지 못할 경우 fallback pool에서 패키지를 찾아 실행하게 한다.

### `enableScripts: false`
- zero-install인데 왜 yarn install을 해야 하느냐 -> pnpMode loose가 아닌 이유는 .yarn/unplugged 폴더 때문입니다.
  - unplugged 폴더가 뭐냐? zero-install은 패키지를 zip으로 관리하여 읽기 전용으로 동작하는데, 쉘스크립트 실행등의 실행 파일.. 같이 읽기 전용으로 패키지가 동작하기 어려운 경우 unplugged 폴더를 만들어 그곳에 zip 파일을 압축해제 해야 합니다.
- zero-install에서 yarn install이 필요한 이유는 unplugged 폴더를 만들기 위해서 입니다.
- 진짜! yarn install 없이 바로 실행하려면?? .yanrc.yml에 enableScripts: false를 추가하면 됩니다.
  - enableScripts는 뭐냐? postInstall 스크립트 실행을 막아 unplugged 폴더를 생성하지 않는다.

### 오프라인 캐시
`.yarn/release/yarn-<version>.cjs`

### Yarn Pnp 단점
- node_modules에 디펜던시가 있는 라이브러리 사용 불가.

## NPM workspace

## PNPM
- vue3: pnpm
- next: Turborepo + pnpm

#### 참고
- [https://2021.stateofjs.com/en-US/libraries/monorepo-tools](https://2021.stateofjs.com/en-US/libraries/monorepo-tools)
- [https://velog.io/@sms8377/DevOps-MonoRepo린](https://velog.io/@sms8377/DevOps-MonoRepo린)
- [https://medium.com/myrealtrip-product/monorepo로-대규모-react-프로젝트-관리하기-d12b65340306](https://medium.com/myrealtrip-product/monorepo로-대규모-react-프로젝트-관리하기-d12b65340306)
- [https://d2.naver.com/helloworld/0923884](https://d2.naver.com/helloworld/0923884)
- [https://d2.naver.com/helloworld/7553804](https://d2.naver.com/helloworld/7553804)
- [https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo/](https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo/)
- [https://daaa0555.tistory.com/457](https://daaa0555.tistory.com/457)
