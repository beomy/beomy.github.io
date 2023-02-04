---
layout: post
title: '[ETC] Yarn Berry'
featured-img: etc/yarn_berry.png
category: [tech, etc]
summary: Yarn은 NPM과 동일한 Node Package Manager입니다. Yarn의 1 버전을 Yarn Classic이라고 하고 Yarn의 2 버전 이상을 Yarn Berry라고 합니다. 이번 포스트에서는 Yarn Berry가 무엇인지 살펴보도록 하겠습니다.
---

`Yarn`은 `NPM`과 동일한 Node Package Manager입니다. `Yarn`의 1 버전을 `Yarn Classic`이라고 하고 `Yarn`의 2 버전 이상을 `Yarn Berry`라고 합니다. 이번 포스트에서는 `Yarn Berry`가 무엇인지 살펴보도록 하겠습니다.

## `Yarn Classic`
`Yarn`의 1 버전을 `Yarn Classic` 이라고 합니다. [Yarn Classic 저장소](https://github.com/yarnpkg/yarn)에 프로젝트 설명을 보면, 1.x 버전의 유지보수를 중단하고 새로운 기능이나 버그 픽스는 `Yarn Berry`에서 이루어 진다고 명시되어 있습니다.

![동결된 Yarn Classic](/assets/img/posts/etc/yarn_classic_frozen.png)

### `Yarn Classic`의 문제점
`Yarn Classic`은 `NPM`과 동일하게 `node_modules` 디렉토리를 이용하여 의존성 관리를 합니다. `node_modules`를 이용한 의존성 관리는 몇가지 문제점이 있습니다.

#### 의존성 탐색 알고리즘의 비효율
패키지를 찾기 위해서 아래 그림과 같이 상위 디렉토리의 `node_modules` 디렉토리를 탐색합니다.

![node_modules 검색 과정](/assets/img/posts/etc/node_modules_search.png)

디렉토리를 읽기 위해 느린 메모리 I/O 호출을 반복하게 됩니다.

#### 저장 공간과 설치 시간
`node_modules` 디렉토리에 사용되는 모든 의존성 패키지들이 설치되기 때문에 `node_modules` 디렉토리는 매우 큰 공간을 차지하게 됩니다. 또한 `node_modules` 디렉토리 구조를 만들기 위해 많은 메모리 I/O 호출이 필요합니다.

#### 유령 의존성(phantom dependency)
`Yarn Classic`은 `node_modules`의 의존성 탐색, 저장 공간과 설치 시간의 비효율을 줄이기 위해 호이스팅(Hoisting)을 사용합니다. 호이스팅은 아래 그림과 같이 의존성 트리를 만듭니다.

![yarn 호이스팅](/assets/img/posts/etc/monorepo_yarn_hoist.png)

호이스팅이 되면서 `Package-1`에서는 설치하지 않았던 `B (1.0)` 의존성이 설치되어 `B (1.0)`를 `import`하여 사용할 수 있는 유령 의존성이 생기게 됩니다. 이런 유령 의존성은 `A (1.0)`와 `C (1.0)` 의존성이 제거 되면 함께 제거되고, 또 `A (1.0)`이 업데이트 되어 `B (1.0)`를 사용하지 않게 된다면 소리 소문 없이 제거되기 때문에 어떤 사이드 이팩트가 발생 할 지 예상하기 어렵게 합니다.

## `Yarn Berry`
`Yarn`의 2 버전 이상을 `Yarn Berry` 이라고 합니다. `Yarn Berry`에는 Pnp와 Zero Install 두가지 중요한 개념이 있습니다.

### PnP(Plug'n'Play)
PnP는 Plug And Play의 줄임말로 해석하면 '꼽기만 하면 사용할 수 있다.'로 해석할 수 있습니다. `Yarn Berry`는 성능 개선을 위해 `node_modules`를 읽는 느린 메모리 I/O 대신 `.yarn/cache`에 종속 패키지들을 zip 형태로 저장하고, `.pnp.cjs` 파일에 의존성 패키지의 의존성 정보를 저장하여 의존성 정보를 알 수 있게 만들었습니다. `Yarn Berry`는 PnP 방식을 사용하여 아래의 3가지 개선점을 만들었습니다.

> **`.yarn/cache`와 `.pnp.cjs`**
>
> - `.yarn/cache`: 디렉토리로 하위에 의존성 패키지들이 zip 형태로 포함되어 있습니다.
> - `.pnp.cjs`: 어떠한 패키지가 어떠한 패키지에 의존성이 있는지 저장하고 있는 파일입니다. 예를 들어 A 패키지를 실행해야 한다면, `.pnp.cjs` 파일에서 A 패키지의 의존성 정보를 읽어와서 A 패키지의 의존성 패키지를 `.yarn/cache`에서 찾아 A 패키지를 실행할 수 있습니다.

#### 의존성 탐색 시간의 단축
기존의 `node_modules`에 저장되던 의존성은 또 그 하위 `node_modules`에 의존성을 저장하여 수직적으로 의존성을 관리하였다면, 하지만 `Yarn Berry`는 `.yarn/cache`에 모든 의존성을 담아 수평적으로 의존성이 존재하기 때문에 모든 패키지의 접근 시간이 O(1)이 되었습니다. 따라서 `require` 등으로 패키지를 가져오는데 사용되는 시간이 단축되었습니다.

#### 의존성 파일 크기 감소
`Yarn Berry`는 `.yarn/cache`에 압축 파일 단위로 의존성을 관리하기 때문에 파일의 수와 크기가 감소하였습니다.

#### 유령 의존성 해결
`Yarn Berry`는 호이스팅을 사용하지 않기 때문에 의도하지 않은 의존성 사용으로 발생하는 사이드 이팩트를 막았습니다.

### Zero Install
`Yarn Berry`를 좀 더 PnP스럽게 사용하려면 Zero Install을 사용하면 됩니다. Zero Install이란 단어 그대로 설치 없이(`yarn install` 명령어 없이) 바로 프로젝트를 실행할 수 있도록 하는 설정을 이야기합니다.

`.yarn/cache`에 저장되어 있는 의존성 패키지와 `.pnp.cjs`에 저장되어 있는 패키지 의존성 정보를 Git이 관리할 수 있도록 해서 구현할 수 있습니다. Zero Install을 사용하려면 아래 코드와 같이 `.gitignore` 파일을 설정하면 됩니다.

```
# Zero Install 사용할 경우
```

```
# Zero Install 사용하지 않을 경우
```

#### CI/CD 시간 감소

#### 브랜치 변경시 바로 프로젝트 실행 가능

- `.yarn/cache`에 저장되어 있는 패키지와 `.pnp.cjs`에 저장되어 있는 패키지의 의존성 정보를 Git으로 관리하면 Zero-Install을 사용할 수 있습니다.
  - 패키지와 패키지의 의존성 정보를 Git을 통해 관리하면 패키지를 설치하지 않아고 프로젝트를 실행/빌드 할 수 있게 됩니다. 또한 브랜치를 바꾸더라도 `yarn install`을 통해 패키지를 새로 설치하지 않아도 됩니다.
  - Zero-Install을 사용하면 프로젝트를 빌드하기 위한 패키지 설치가 필요없이 Git Clone 만으로 프로젝트가 바로 빌드 가능한 상태가 되어 CI에서 의존성을 설치하는 시간을 절약할 수 있습니다.

## `Yarn Berry`로 모노레포 만들기

## 부록

### `.yarnrc.yml` 설정

#### `pnpMode: "loose"`
- loose는 fallback pool을 만들어 종속된 패키지가 패키지를 찾지 못할 경우 fallback pool에서 패키지를 찾아 실행하게 한다.

#### `enableScripts: false`
- zero-install인데 왜 yarn install을 해야 하느냐 -> pnpMode loose가 아닌 이유는 .yarn/unplugged 폴더 때문입니다.
  - unplugged 폴더가 뭐냐? zero-install은 패키지를 zip으로 관리하여 읽기 전용으로 동작하는데, 쉘스크립트 실행등의 실행 파일.. 같이 읽기 전용으로 패키지가 동작하기 어려운 경우 unplugged 폴더를 만들어 그곳에 zip 파일을 압축해제 해야 합니다.
- zero-install에서 yarn install이 필요한 이유는 unplugged 폴더를 만들기 위해서 입니다.
- yarn install 없이 바로 실행하려면?? .yanrc.yml에 enableScripts: false를 추가하면 됩니다.
  - enableScripts는 뭐냐? postInstall 스크립트 실행을 막아 unplugged 폴더를 생성하지 않는다.

### 오프라인 캐시
- `.yarn/release/yarn-<version>.cjs`

### Yarn Pnp 단점
- node_modules에 디펜던시가 있는 라이브러리 사용 불가.
- peerDependency가 있는 경우 핫리로딩 이슈.

### Yarn의 Unplugged
- [https://imch.dev/posts/commitizen-with-yarn-pnp/](https://imch.dev/posts/commitizen-with-yarn-pnp/)
- [https://yarnpkg.com/getting-started/qa](https://yarnpkg.com/getting-started/qa)
- [https://yarnpkg.com/configuration/yarnrc#enableScripts](https://yarnpkg.com/configuration/yarnrc#enableScripts)
- [https://yarnpkg.com/advanced/lexicon#unplugged-package](https://yarnpkg.com/advanced/lexicon#unplugged-package)


##### 참고
- [https://d2.naver.com/helloworld/7553804](https://d2.naver.com/helloworld/7553804)
- [https://toss.tech/article/node-modules-and-yarn-berry](https://toss.tech/article/node-modules-and-yarn-berry)
- [https://velog.io/@oimne/yarn-berry](https://velog.io/@oimne/yarn-berry)