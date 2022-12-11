---
layout: post
title: '[ETC] package.json의 scripts'
featured-img: etc/package_json.png
category: [tech, etc]
summary: package.jon 파일의 scripts 필드는 빌드, 실행 등에 사용되는 명령어를 선언하거나 패키지의 install, publish 전/후에 실행되는 스크립트 명령어를 선언할 때 사용됩니다.
---

`package.jon` 파일의 `scripts` 필드는 빌드, 실행 등에 사용되는 명령어를 선언하거나 패키지의 `install`, `publish` 전/후에 실행되는 스크립트 명령어를 선언할 때 사용됩니다.

# 라이프 사이클 스크립트란
`scripts` 필드에는 개발자가 임의로 정의한 스크립트 뿐만 아니라, 정해진 몇가지 스크립트 명령어가 있습니다. 이런 스크립트를 라이프 사이클 스크립트라고 하는데 이 스크립트는 패키지의 `install` 혹은 `publish` 명령어가 실행되기 전/후에 호출됩니다.

## 주의사항
라이프 사이클 스크립트는 패키지 설치 전/후 배포 전/후에 특정 행동을 해야 할 때 유용하게 사용될 수 있지만 사용할 때 몇가지 주의사항이 있습니다.

### 패키지 매니저 확인
라이프 사이클 스크립트는 어떤 패키지 매니저(NPM, Yarn)를 사용하느냐에 따라 다르기 때문에 라이프 사이클 스크립트를 사용할 때 사용하는 패키지 매니저가 제공하는 라이프 사이클 스크립트인지 확인이 필요합니다.

예를 들어, [`husky`](https://typicode.github.io/husky/#/) 패키지는 설치된 후 `husky install` 이라는 명령어가 실행되어야 하기 때문에 패키지가 설치 된 후 실행되는 라이프 사이클 스크립트를 사용해야 합니다. `NPM`을 사용하는 경우 `prepare`라는 스크립트를 사용할 수 있지만 `Yarn 2+`은 `prepare` 스크립트를 지원하지 않기 때문에 `postinstall`이라는 스크립트를 사용해야 합니다.

### Pre와 Post 스크립트
`NPM`의 경우 커스텀 스크립트의 경우에도 사전, 사후 스크립트를 지원합니다. `pre<event>`, `post<event>`와 같이 스크립트 이름으로 작성하여 사용할 수 있습니다. 아래 코드와 같이 `package.json`의 `scripts` 필드를 작성하면,

```json
{
  "scripts": {
    "prebeomy": "echo pre beomy script",
    "beomy": "echo beomy script",
    "postbeomy": "echo beomy script"
  }
}
```

아래 코드와 같이 Pre, Post 스크립트가 실행됩니다.

![NPM Pre, Post 스크립트](/assets/img/posts/etc/pre_post_scripts_npm.png)

반면에 `Yarn 2+`의 경우 아래 코드와 같이 커스텀 스크립트의 Pre, Post 스크립트를 지원하지 않습니다.

![Yarn 2 Pre, Post 스크립트](/assets/img/posts/etc/pre_post_scripts_yarn.png)

# `NPM` 라이프 사이클 스크립트
`NPM`은 `prepare`, `prepublish`, `prepublishOnly`, `prepack`, `postpack`, `dependencies` 6개의 라이프 사이클 스크립트가 있습니다. 라이프 사이클 스크립트를 하나씩 살펴보도록 하겠습니다.

## `prepare`
`prepare` 스크립트는 패키지가 패킹 되기 전에 실행되는 스크립트로 `npm publish`, `npm pack` 의 스크립트가 실행될 때, 로컬에서 파라이터 없이 `npm install` 스크립트가 실행될 때 호출됩니다.

## `prepublish` (DEPRECATED)
`prepublish` 스크립트는 지원 중단 되었습니다. `npm publish` 스크립트가 실행될 때는 호출되지 않고, `npm ci`, `npm install` 스크립트가 실행될 때 호출됩니다.

## `prepublishOnly`
`prepublishOnly` 스크립트는 패키지가 준비(prepared), 압축(packed) 되기 전에 실행되는 스크립트로 `npm publish` 스크립트가 실행될 때만 호출됩니다.

## `prepack`
`prepack` 스크립트는 패키자가 압축되기 전에 호출되는 스크립트입니다. `npm pack`, `npm publish` 스크립트가 실행될 때 호출됩니다.

## `postpack`
`postpack` 스크립트는 압축 파일이 생성되고, 최종 목적지(예를 들어 NPM 배포)에 이동하기 전에 호출됩니다.

## `dependencies`
`dependencies` 스크립트는 `node_modules` 디렉토리가 수정되었을 때 호출됩니다.

# `Yarn 2+` 라이프 사이클 스크립트
`Yarn 2+`는 `NPM`과 달리 `prepack`, `postpack`, `prepublish`, `postintall` 4개의 라이프 사이클 스트립트만 존재합니다. 각각의 스크립트는 `NPM` 라이프 사이클 스크립트와 동일한 시점에 호출됩니다.

# 부록

## `NPM` 명령어별 라이프 사이클 실행 순서
스크립트 명령어 별로 라이프 사이클이 어떤 순서로 실행되는지 알면 `NPM` 패키지를 개발할 때 많은 도움이 될 수 있습니다. `NPM` 명령어 별로 실행 되는 라이프 사이클 스크립트 순서를 살펴보겠습니다.

### `npm cache add`
- `prepare`

### `npm ci`
- `preinstall`
- `install`
- `postinstall`
- `prepublish`
- `preprepare`
- `prepare`
- `postprepare`

### `npm diff`
- `prepare`

### `npm install`
- `preinstall`
- `install`
- `postinstall`
- `prepublish`
- `preprepare`
- `prepare`
- `postprepare`

`npm install -g <pkg-name>` 명령어로 패키지가 설치될 때도 마찬가지 위 목록의 라이프 사이클 스크립트가 순서대로 호출됩니다.

### `npm pack`
- `prepack`
- `prepare`
- `postpack`

### `npm publish`
- `prepublishOnly`
- `prepack`
- `prepare`
- `postpack`
- `publish`
- `postpublish`

`--dry-run` 파라미터를 주게되면 `prepare` 스크립트가 호출되지 않습니다.

### `npm rebuild`

## `Yarn` 명령어별 라이프 사이클 실행 순서

## `npm ci`와 `npm i`

#### 참고
- [https://docs.npmjs.com/cli/v9/using-npm/scripts](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [https://yarnpkg.com/advanced/lifecycle-scripts](https://yarnpkg.com/advanced/lifecycle-scripts)
