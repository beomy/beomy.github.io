---
layout: post
title: '[ETC] Yarn Berry'
featured-img: etc/yarn_berry.png
category: [tech, etc]
summary: Yarn은 NPM과 동일한 Node Package Manager입니다. Yarn의 1 버전을 Yarn Classic이라고 하고 Yarn의 2 버전 이상을 Yarn Berry라고 합니다.
---

`Yarn`은 `NPM`과 같은 Node Package Manager입니다. `Yarn`의 1 버전을 `Yarn Classic`이라고 하고 `Yarn`의 2 버전 이상을 `Yarn Berry`라고 합니다.

## `Yarn Classic`
`Yarn`의 1 버전을 `Yarn Classic` 이라고 합니다. [Yarn Classic 저장소](https://github.com/yarnpkg/yarn)에 프로젝트 설명을 보면, 1.x 버전의 유지보수를 중단하고 새로운 기능이나 버그 픽스는 `Yarn Berry`에서 이루어 진다고 명시되어 있습니다.

![동결된 Yarn Classic](/assets/img/posts/etc/yarn_classic_frozen.png)

### `Yarn Classic`의 문제점
`Yarn Classic`은 `NPM`과 동일하게 `node_modules` 디렉토리를 이용하여 의존성 관리를 합니다. `node_modules`를 이용한 의존성 관리는 몇가지 문제점이 있습니다.

#### 의존성 탐색 알고리즘의 비효율
패키지를 찾기 위해서 아래 그림과 같이 상위 디렉토리의 `node_modules` 디렉토리를 탐색합니다.

![node_modules 검색 과정](/assets/img/posts/etc/node_modules_search.png)

`node_modules` 디렉토리를 읽기 위해 느린 메모리 I/O 호출을 반복하게 됩니다.

#### 저장 공간과 설치 시간
`node_modules` 디렉토리에 사용되는 모든 의존성 패키지들이 설치되기 때문에 `node_modules` 디렉토리는 매우 큰 공간을 차지하게 됩니다. 또한 `node_modules` 디렉토리 구조를 만들기 위해 많은 메모리 I/O 호출이 필요합니다.

#### 유령 의존성(phantom dependency)
`Yarn Classic`은 `node_modules`의 의존성 탐색, 저장 공간과 설치 시간의 비효율을 줄이기 위해 호이스팅(Hoisting)을 사용합니다. 호이스팅은 아래 그림과 같이 의존성 트리를 만듭니다.

![yarn 호이스팅](/assets/img/posts/etc/monorepo_yarn_hoist.png)

호이스팅이 되면서 `Package-1`에서는 설치하지 않았던 `B (1.0)` 의존성이 설치되어 `B (1.0)`를 `import`하여 사용할 수 있는 유령 의존성이 생기게 됩니다. 이런 유령 의존성은 `A (1.0)`와 `C (1.0)` 의존성이 제거 되면 함께 제거되고, 또 `A (1.0)`이 업데이트 되어 `B (1.0)`를 사용하지 않게 된다면 소리 소문 없이 제거되기 때문에 어떤 사이드 이팩트가 발생 할 지 예상하기 어렵게 합니다.

## `Yarn Berry`
`Yarn`의 2 버전 이상을 `Yarn Berry` 이라고 합니다. `Yarn Berry`에는 PnP와 Zero Install 두가지 중요한 개념이 있습니다.

### PnP(Plug'n'Play)
PnP는 Plug And Play의 줄임말로 해석하면 '꼽기만 하면 사용할 수 있다.'로 해석할 수 있습니다. `Yarn Berry`는 성능 개선을 위해 `node_modules`를 읽는 느린 메모리 I/O 대신 `.yarn/cache`에 종속 패키지들을 zip 형태로 저장하고, `.pnp.cjs` 파일에 의존성 패키지의 의존성 정보를 저장하여 의존성 정보를 알 수 있게 만들었습니다. `Yarn Berry`는 PnP 방식을 사용하여 아래의 3가지 개선점을 만들었습니다.

> **`.yarn/cache`와 `.pnp.cjs`**
>
> - `.yarn/cache`: 디렉토리로 하위에 의존성 패키지들이 zip 형태로 포함되어 있습니다.
> - `.pnp.cjs`: 어떠한 패키지가 어떠한 패키지에 의존성이 있는지 저장하고 있는 파일입니다. 예를 들어 A 패키지를 실행해야 한다면, `.pnp.cjs` 파일에서 A 패키지의 의존성 정보를 읽어와서 A 패키지의 의존성 패키지를 `.yarn/cache`에서 찾아 A 패키지를 실행할 수 있습니다.

#### 의존성 탐색 시간의 단축
기존의 `node_modules`에 저장되던 의존성은 또 그 하위 `node_modules`에 의존성을 저장하여 수직적으로 의존성을 관리하였다면, 하지만 `Yarn Berry`는 `.yarn/cache`에 모든 의존성을 담아 수평적으로 의존성을 관리하기 때문에 모든 패키지의 접근 시간이 O(1)이 되었습니다. 수평적 의존성 관리는 `require` 등으로 패키지를 가져오는데 사용되는 시간을 단축하였습니다.

#### 의존성 파일 크기 감소
`Yarn Berry`는 `.yarn/cache`에 압축 파일 단위로 의존성을 관리하기 때문에 파일의 수와 크기가 감소됩니다.

#### 유령 의존성 해결
`Yarn Berry`는 호이스팅을 사용하지 않기 때문에 의도하지 않은 의존성 사용으로 발생하는 사이드 이팩트를 막았습니다.

### Zero Install
`Yarn Berry`를 좀 더 PnP스럽게 사용하려면 Zero Install을 사용하면 됩니다. Zero Install이란 단어 그대로 설치 없이(`yarn install` 명령어 없이) 바로 프로젝트를 실행할 수 있도록 하는 설정을 이야기합니다.

`.yarn/cache`에 저장되어 있는 의존성 패키지와 `.pnp.cjs`에 저장되어 있는 패키지 의존성 정보를 버전 관리 프로그램(Git 등..)이 관리할 수 있도록 해서 구현할 수 있습니다. 버전 관리 프로그램으로 Git을 사용한다면, Zero Install을 사용할 때와 사용하지 않을 때 `.gitignore` 파일을 아래 코드와 같이 설정하면 됩니다.

```
# Zero Install 사용할 경우
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

```
# Zero Install 사용하지 않을 경우
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
```

Zero Install을 사용하면 아래 2가지 장점이 있습니다.

#### CI 시간 감소
프로젝트마다 다르지만, 보통의 경우 아래와 같은 일련의 과정을 거쳐서 서비스가 배포됩니다.

```bash
git clone <project repository>
yarn install
yarn build
```

Zero Install을 사용할 경우 의존성을 설치할 필요가 없기 때문에 `yarn install` 명령어 없이 `git clone` 만으로 프로젝트가 바로 빌드 가능한 상태가 되어 의존성을 설치하는 시간을 절약할 수 있습니다.

#### 브랜치 변경시 바로 프로젝트 실행 가능
버전 관리 프로그램을 통해 의존성 패키지가 관리되기 때문에 브랜치를 변경할 경우 해당 브랜치에 필요한 의존성 패키지가 이미 존재하기 때문에 별도의 패키지 설치 없이 바로 프로젝트를 실행할 수 있습니다.

### `Yarn Berry` 설정
`.yarnrc.yml` 파일에서 `Yarn Berry` 설정을 할 수 있습니다. `.yarnrc.yml` 파일에 작성 할 수 있는 몇가지 `Yarn Berry` 설정을 살펴도록 하겠습니다. 자세한 `.yarnrc.yml` 설정 방법은 [공식 문서](https://yarnpkg.com/configuration/yarnrc)를 참고 부탁드립니다.

#### `nodeLinker`
```
nodeLinker: "pnp" | "pnpm" | "node-modules"
```

패키지를 설치하는데 사용하는 링커 선택할 수 있는 옵션입니다. 기본 값은 `pnp`입니다. `node-modules`로 설정할 경우 `Yarn Classic`이나 `NPM`처럼 `node_modules` 디렉토리에서 의존성 관리를하게 됩니다.

#### `pnpMode`
```
pnpMode: "strict" | "loose"
```

`strict`가 기본 값입니다. `Yarn Berry`의 PnP는 호이스팅을 사용하지 않기 때문에, `package.json`의 `dependencies`에 나열 된 의존성만 설치됩니다. 이런 동작은 유령 의존성을 없앨 수 있지만, 사용중인 패키지가 유령 의존성을 가지고 있다면 문제가 될 수 있습니다. 이런 경우 `loose`를 사용하여 문제를 해결 할 수 있습니다.

`pnpMode: "loose"`를 사용할 경우 `node-modules` 호이스터를 사용하여 호이스팅 되는 패키지 목록을 폴백 풀(fallback pool)로 만들어 의존성 패키지를 찾지 못할 경우 폴백 풀에서 패키지를 찾아 실행하게 됩니다. 폴백 폴 역시 `.pnp.cjs`에 기록됩니다.

#### `packageExtensions`
```
webpack@*:
  dependencies:
    lodash: "^4.15.0"
  peerDependencies:
    webpack-cli: "*"
  peerDependenciesMeta:
    webpack-cli:
      optional: true
```

일부 패키지는 의존성 정보가 잘못되었거나 누락이 있을 수 있습니다. `Yarn Berry`의 PnP는 의존성 관리에 엄격한 편인데, 이렇게 사용하는 패키지에 의존성 정보가 잘못되어 있다면 해당 패키지는 사용할 수 없습니다. 의존성 정보가 잘못 된 패키지를 사용하기 위해서 `packageExtensions`을 사용하여 의존성 정보를 확장할 수 있습니다.

위의 코드는 모든 버전에 해당하는 `webpack`의 `dependencies`에 `loash@^4.15.0`, `peerDependencies`에 `webpack-cli@*`, `peerDependenciesMeta`에 `webpack-cli` 옵션을 확장한 코드입니다.

#### `enableScripts`
```
enableScripts: true | false
```

`enableScripts`의 기본 값은 `true`입니다.

`clone` 된 프로젝트에 `.yarn/cache`와 `.pnp.cjs` 파일이 모두 존재하지만 `yarn install` 후에야 프로젝트를 실행할 수 있는 반쪽 자리 Zero Install이라면, `.yarn/unplugged` 디렉토리를 의심해 봐야 합니다.

`Yarn Berry`는 의존성 패키지를 모두 zip으로 관리하기 때문에 의존성 패키지는 모두 읽기 전용으로 동작할 수 밖에 없습니다. 하지만 의존성 패키지가 쓰여지거나(파일 쓰기) 실행(쉘 스크립트 실행 등..) 되어야 한다면, zip 파일은 압축 해제되어 `.yarn/unplugged` 디렉토리에 저장됩니다.

`yarn install` 과정 중에 의존성 패키지에 사후 설치(postinstall) 스크립트가 있다면 해당 패키지는 압축 해제 되어 `.yarn/unplugged` 디렉토리에 저장됩니다. 이런 이유로 Zero Install 설정을 했지만 `yarn install`을 해야 프로젝트가 실행되는 경우가 발생하게 됩니다. 

`yarn install` 없이 바로 프로젝트를 실행하기 위해서는 `enableScripts: false`로 설정해야 합니다. `enableScripts: false`는 사후 설치 스크립트를 막아 `.yarn/unplugged` 디렉토리를 생성하지 않도록 만듭니다.

##### 참고
- [https://d2.naver.com/helloworld/7553804](https://d2.naver.com/helloworld/7553804)
- [https://toss.tech/article/node-modules-and-yarn-berry](https://toss.tech/article/node-modules-and-yarn-berry)
- [https://velog.io/@oimne/yarn-berry](https://velog.io/@oimne/yarn-berry)
- [https://yarnpkg.com/features/pnp](https://yarnpkg.com/features/pnp)
- [https://yarnpkg.com/getting-started/qa](https://yarnpkg.com/getting-started/qa)
- [https://yarnpkg.com/configuration/yarnrc#enableScripts](https://yarnpkg.com/configuration/yarnrc#enableScripts)
- [https://yarnpkg.com/advanced/lexicon#unplugged-package](https://yarnpkg.com/advanced/lexicon#unplugged-package)
- [https://yarnpkg.com/features/offline-cache](https://yarnpkg.com/features/offline-cache)