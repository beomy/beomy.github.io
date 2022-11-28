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
`NPM`은 `prepare`, `prepublish`, `prepublishOnly`, `prepack`, `postpack`, `dependencies` 6개의 라이프 사이클 스크립트가 있습니다. 하나씩 살펴보도록 하겠습니다.

## `prepare`
`prepare` 스크립트는 패키지가 패킹 되기 전에 실행되는 스크립트로 아래의 경우 호출됩니다.

- `npm publish`, `npm pack` 의 스크립트가 실행될 때 호출됩니다.
- 로컬에서 어떠한 인자 없지 `npm install` 스크립트가 실행될 때 호출됩니다.

## `prepublish` (DEPRECATED)

## `prepublishOnly`

## `prepack`

## `postpack`

## `dependencies`

# `Yarn 2+` 라이프 사이클 스크립트
## prepack
## postpack
## prepublish
## postintall

# 부록

## `NPM` 명령어별 라이프 사이클 실행 순서
- install
- publish
- ci
- diff
- pack
- rebuild
- restart
- start
- stop
- test
- version


#### 참고
- [https://docs.npmjs.com/cli/v8/using-npm/scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [https://yarnpkg.com/advanced/lifecycle-scripts](https://yarnpkg.com/advanced/lifecycle-scripts)
