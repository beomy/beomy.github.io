---
layout: post
title: '[ETC] package.json 톺아보기'
featured-img: etc/package_json.png
category: [tech, etc]
summary: package.json에는 프로젝트에 대한 설명, 패키지, 실행 스크립트 등의 정보를 담는 매니페이스(Manifest) 파일입니다. 이번 포스트에서는 package.json에서 설정할 수 있는 필드 값들을 하나씩 살펴보도록 하겠습니다.
---

`package.json`에는 프로젝트에 대한 설명, 종속성 패키지, 실행 스크립트 등의 정보를 담는 매니페이스(Manifest) 파일입니다. 이번 포스트에서는 `package.json`에서 설정할 수 있는 필드 값들을 하나씩 살펴보도록 하겠습니다.

사용하는 패키지 매니저(NPM, Yarn, PNPM 과 같은)에 따라 설정 가능한 필드들이 다를 수 있기 때문에 사용하는 패키지 매니저의 공식 홈페이지([NPM](https://docs.npmjs.com/cli/v8/configuring-npm/package-json), [Yarn 2+](https://yarnpkg.com/configuration/manifest), [PNPM](https://pnpm.io/package_json))에서 설정 가능한 필드를 확인하는 것이 좋습니다.

eslint나 prettier 등의 라이브러리 설정(eslint의 경우 `eslintConfig` 필드)도 `package.json`에서 가능하기 때문에 이러한 설정 역시 사용하는 라이브러리의 공식 홈페이지에서 확인하고 사용하는 것이 좋습니다.

`package.json`에 설정 가능한 필드를 하나씩 살펴보도록 하겠습니다. 필드 이름 옆 괄호로 어떠한 환경에서 설정 가능한 필드인지 나타내었습니다.

## `name`
`name` 필드는 프로젝트의 이름을 나타냅니다. 아래와 같이 `name` 필드를 작성할 수 있습니다.

```json
{
  "name": "@beomy/blog"
}
```

`@beomy/`처럼 `name` 필드는 `@`로 시작하여 스코프를 지정할 수도 있습니다.

## `version`
`version` 필드는 프로젝트의 버전을 나타냅니다. 아래와 같이 `version` 필드를 작성할 수 있습니다.

```json
{
  "version": "1.2.3"
}
```

> ##### NPM 패키지에서 `name`과 `version`
> 프로젝트가 NPM에 배포(Publish) 될 때 `name`와 `version` 필드는 필수 값입니다. `name`와 `version` 필드는 NPM 패키지의 식별자이기 때문에 `name`와 `version` 필드를 합친 값(예를 들어, `@beomy/blog@1.2.3`)은 유니크 한 값이여야 합니다.

> ##### 오픈소스의 버전 구분
> 버전은 아래 그림과 같이 Major, Minor, Patch로 구성되어 있습니다. 이런 형태의 버전 표시방법은 오픈소스 프로젝트에 일반적으로 사용됩니다.
>
> ![package.json version](/assets/img/posts/etc/package_version.png)
>
> - Major: API가 변경/삭제 되어 사용자가 Major 버전을 업데이트 할 경우 기존의 코드가 동작하지 않을 수 있을 때, Major 버전을 업데이트하여 배포합니다.
> - Minor: 이전 버전과 호환되는 방식으로 API가 추가/변경 되었을 때 Minor 버전을 업데이트하여 배포합니다.
> - Patch: 이전 버전과 호환되는 버그 수정을 할 경우 Patch 버전을 업데이트하여 배포합니다.

## `files`
`files` 필드는 패키지가 설치될 때 포함될 항목들을 저장하는 필드입니다. 아래와 같이 glob 패턴으로 작성할 수 있습니다.

```json
{
  "files": [
    "dist/**/*",
    "lib/**/*"
  ]
}
```

`files` 필드를 사용하지 않고 프로젝트 루프에 `.npmignore` 파일을 생성하여 NPM에 배포하지 않을 파일들을 지정할 수도 있습니다. `.npmignore` 파일이 없는 경우 `.gitignore` 파일에 작성된 목록들이 NPM에 배포되지 않습니다.

## `main`
`main` 필드는 패키지 사용자가 패키지를 사용할 때 진입 되는 경로입니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "main": "./sources/index.js"
}
```

아래 `package.json`과 같이 작성된 패키지가 있다면,

```json
{
  "name": "beomy-lib",
  "main": "lib/index.js"
}
```

`import BeomyLib from 'beomy-lib'`으로 패키지를 가져오면 `beomy-lib`의 `lib/index.js`를 가져오는 것과 동일합니다.

```js
import BeomyLib from 'beomy-lib'
// Loads ./node_modules/beomy-lib/lib/index.js
```

## `module` (Yarn 2+)
`module` 필드는 `main` 필드와 유사한 목적으로 사용 되는 필드입니다. ES6 호환 환경에서 패키지를 사용할 때 진입 되는 경로입니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "module": "./sources/index.mjs"
}
```

## `browser`
`browser` 필드는 패키지가 클라이언트 사이드(Client side), 브라우저에서 사용되는 패키지라면 `main` 필드 대신 사용되는 필드입니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "browser": "./sources/index.js"
}
```

`browser` 필드를 사용하면 클라이언트 사이드에서 동작하는 패키지라는 것을 명시하는 것이기 때문에, `window` 객체와 같이 Node.js에서 사용이 불가능한 요소에 대한 힌트를 사용자에게 제공하게 됩니다.

## `type` (Node)
`type` 필드는 `commonjs`(기본 값)와 `module` 중 하나를 사용할 수 있습니다. `type` 필드가 정의되어 있지 않다면 `commonjs`로 처리됩니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "type": "module"
}
```

파일의 확장자가 `.mjs`이거나 `type` 필드가 `module`일 경우 패키지는 ES Module를 사용하여 `import`나 `import()` 함수를 사용할 수 있게 됩니다. 파일 확장자가 `.cjs`이거나 `type` 필드가 `commonjs`일 경우(혹은 생략) `import`, `import()` 함수, `require()` 함수를 사용할 수 있습니다.

## `packageManager` (Node)
`packageManager` 필드는 패키지가 특정 패키지 매니저를 사용해야 할 경우 특정 패키지와 버전을 지정할 수 있는 필드입니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "packageManager": "yarn@3.2.4"
}
```

## `exports` (Node)
`main` 필드와 `exports` 필드를 사용하면 패키지의 진입점을 설정할 수 있습니다. `exports` 필드는 `main` 필드와 다르게 여러 개의 진입점을 설정할 수 있습니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./feature": "./feature/index.js"
  }
}
```

Node 10 버전 이하에서는 `main` 필드를 사용해야 하고,  11 버전 이상에서는 `exports` 필드와 `main` 필드가 모두 정의되어 있는 경우 `exports` 필드가 우선합니다.

```json
{
  "name": "beomy-lib",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./feature": "./feature/index.js"
  }
}
```

위의 코드에서는 `./feature/utils.js`가 `exports` 필드에 명시 되어있지 않기 때문에 `import util from 'beomy-lib/feature/utils.js'`가 불가능합니다. 이러한 경우 다른 파일들과 동일하게 `./feature/utils.js`를 `exports` 필드에 추가하거나 아래와 같이 작성하여 해결 할 수 있습니다.

```json
{
  "name": "beomy-lib",
  "exports": {
    ".": "./lib/index.js",
    "./lib": "./lib/index.js",
    "./feature": "./feature/index.js",
    "./feature/*.js": "./feature/*.js"
  }
}
```

```js
import BeomyLib from 'beomy-lib'
// Loads ./node_modules/beomy-lib/lib/index.js

import BeomyLib from 'beomy-lib/lib'
// Loads ./node_modules/beomy-lib/lib/index.js

import BeomyLib from 'beomy-lib/feature'
// Loads ./node_modules/beomy-lib/feature/index.js

import BeomyLib from 'beomy-lib/feature/utils.js'
// Loads ./node_modules/beomy-lib/feature/utils.js
```

## `imports` (Node)
`exports` 필드가 패키지 사용자에게 패키지를 진입할 수 있는 진입점을 제공하는 필드라면, `imports` 필드는 패키지를 개발하는 패키지 생성자에게 진입점을 제공하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  "dependencies": {
    "dep-node-native": "^1.0.0"
  }
}
```

외부 패키지와 구분될 수 있도록 `#`으로 시작해야 합니다. 위의 코드와 같이 조건 별로 진입점을 다르게 제공할 수 있습니다. 패키지 생성자는 `import #dep`로 가져와 사용할 수 있습니다.

## `types` (Typescript)
`types` 필드는 타입스크립트의 `d.ts` 타입 정의 파일의 경로를 저장하는 필드입니다. `types` 필드 대신 `typings` 필드를 사용할 수 있습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "types": "./lib/index.d.ts"
}
```

타입 정의 파일의 이름이 `index.d.ts`이고 패키지 루트(`index.js`의 위치)에 있으면 생략 가능합니다.

## `bin`
`bin` 필드는 실행 가능한 자바스크립트 파일을 상위 패키지에 노출하는데 사용되는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "bin": {
    "my-bin": "./dist/my-bin.js"
  }
}
```

`bin` 필드의 사용 방법은 글로벌로 설치되어 많이 사용되는 패키지를 살펴보면 쉽게 이해 할 수 있습니다. [create-react-app](https://github.com/facebook/create-react-app/blob/main/packages/create-react-app/package.json) 패키지의 `bin` 필드는 아래 코드와 같이 되어 있습니다.

```json
{
  "bin": {
    "create-react-app": "./index.js"
  }
}
```

## `scripts`
`scripts` 필드는 실행 명령어를 저장하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "scripts": {
    "test": "jest",
    "build": "webpack-cli --config ./webpack.config.js",
    "count-words": "echo \"$@\" | wc -w"
  }
}
```

NPM의 경우 `npm run test`와 같이 `npm run <scripts 필드에 작성한 명령어>` 형태로 사용할 수 있습니다. Yarn의 경우도 비슷하게 `yarn run <scripts 필드에 작성한 명령어>` 형태로 사용할 수 있는데, `run`을 생략하여 `yarn <scripts 필드에 작성한 명령어>` 형태로도 사용할 수 있습니다.

## `engines` (NPM, PNPM)
`engines` 필드는 패키지가 동작하는 Node 버전이나, 패키지 매니저(NPM, PNPM) 버전을 지정하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "engines": {
    "node": ">=0.10.3 <15",
    "npm": "~1.0.20",
    "pnpm": ">=3" // PNPM을 사용한다면,
  }
}
```

패키지 사용자의 `.npmrc` 설정 중 `engine-strict`가 설정되어 있지 않다면 `engines` 필드는 권고 사항입니다. 해당 패키지가 `dependencies`에 작성되었다면 패키지가 설치될 때 경고가 발생합니다.

## `os`
`os` 필드는 허용되는 os 목록을 저장하는 필드입니다. 패키지를 설치할 때 `process.platform` 값과 비교하여 일치하는 값이 없을 경우 `dependencies`에 작성된 패키지였다면 `postinstall` 스크립트가 실행되지 않고, `optionalDependencies`에 작성된 패키지였다면 설치되지 않습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "os": ["linux", "darwin", "win32"]
}
```

아래 코드와 같이 `!`를 사용하여 차단할 os를 지정할 수도 있습니다.

```json
{
  "os": ["!win32"]
}
```

## `cpu`
`cpu` 필드는 허용되는 cpu 목록을 저장하는 필드입니다. 패키지를 설치할 때 `process.arch` 값과 비교하여 일치하는 값이 없을 경우 `dependencies`에 작성된 패키지였다면 `postinstall` 스크립트가 실행되지 않고, `optionalDependencies`에 작성된 패키지였다면 설치되지 않습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "cpu": ["x64", "ia32", "arm64"]
}
```

`os` 필드와 마찬가지로 `!`를 사용하여 차단할 cpu를 지정할 수도 있습니다.

```json
{
  "cpu": ["!arm", "!mips"]
}
```

## `libc` (Yarn 2+)
`libc` 필드는 허용하는 표준 C 라이브러리 목록을 저장하는 필드입니다. 패키지를 설치할 때 호스트의 표준 C 라이브러리와 비교하여 일치하는 값이 없을 경우 `dependencies`에 작성된 패키지였다면 `postinstall` 스크립트가 실행되지 않고, `optionalDependencies`에 작성된 패키지였다면 설치되지 않습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "libc": [
    "glibc",
    "musl"
  ]
}
```

## `dependencies`
`dependencies` 필드는 패키지에서 사용되는 종속성들을 나열하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl"
  }
}
```

NPM을 사용할 경우 `npm install <종속 패키지 이름>`, Yarn을 사용할 경우 `yarn add <종속 패키지 이름>`, PNPM을 사용할 경우 `pnpm install <종속 패키지 이름>` 명령어를 사용하면 패키지를 설치하고 `dependencies` 필드에 설치 된 종속 패키지가 버전 정보와 함께 저장됩니다.

> ##### 패키지 버전 표시 방법
> 패키지에 종속 패키지를 추가할 경우 `dependencies` 필드에 `<패키지 이름>: "<패키지 버전 정보>"` 형태로 저장됩니다. 패키지를 설치할 때 `<패키지 버전 정보>`와 매칭되는 패키지가 설치됩니다. `<패키지 버전 정보>`의 형태는 아래와 같습니다.
>
> - `version`: 정확한 `version`의 패키지와 매칭됩니다.
> - `1.2.x`: `1.2.0`, `1.2.1`와 같이 `1.2` 버전 대역의 패키지와 매칭됩니다.
> - `>version`: `version`보다 큰 버전의 패키지와 매칭됩니다.
> - `>=version`: `version`보다 크거나 같은 버전의 패키지와 매칭됩니다.
> - `<version`: `version`보다 작은 버전의 패키지와 매칭됩니다.
> - `<=version`: `version`보다 작거나 같은 버전의 패키지와 매칭됩니다.
> - `~version`: `version`과 가장 동일한 버전의 패키지와 매칭됩니다. 예를 들어,
>   - `~1.2.3`은 `>=1.2.3 <1.3.0-0`과 동일한 의미입니다.
>   - `~1.2`는 `>=1.2.0 <1.3.0-0`과 `1.2.x`와 동일한 의미입니다.
>   - `~1`은 `>=1.0.0 <2.0.0-0`과 `1.x`와 동일한 의미입니다.
> - `^version`: `version`과 호환 가능한 버전의 패키지와 매칭됩니다. 예를 들어,
>   - `^1.2.3`은 `>=1.2.3 <2.0.0-0`과 동일한 의미입니다.
>   - `^0.2.3`은 `>=0.2.3 <0.3.0-0`과 동일한 의미입니다.
>   - `^0.0.3`은 `>=0.0.3 <0.0.4-0`과 동일한 의미입니다.
> - `*`: 모든 버전의 패키지와 매칭됩니다.
> - `""`(공백 문자): `*`와 동일합니다.
> - `version1 - version2`: `>=version1 <=version2`와 동일합니다.
> - `range1 || range2`: `range1` 또는 `range2`에 만족하는 버전의 패키지와 매칭됩니다.
> - `path/path/path`: `path/path/path` 로컬 경로에 해당하는 패키지와 매칭됩니다.

## `devDependencies`
`devDependencies` 필드는 개발 종속성들을 나열하는 필드입니다. `dependencies` 필드와 동일하게 작성합니다. `devDependencies` 필드에 나열된 종속성들은 패키지 개발자의 로컬에는 설치되지만, 패키지를 사용하는 사용자에게는 설치되지 않습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "devDependencies": {
    "webpack": "^5.0.0"
  }
}
```

## `peerDependencies`
`peerDependencies` 종속성은 상속 받아야 하는 종속성을 나열하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "peerDependencies": {
    "react": "*",
    "react-dom": "*"
  }
}
```

상속 받아야 하는 종속성이란 패키지 개발에 필요한 종속성을 peer(해석하면 또래)에게 제공받는 종속성입니다.

예를 들어 react와 emotion을 사용하여 UI 컴포넌트를 패키지로 만든다고 하면, react나 emotion은 UI 컴포넌트 패키지 입장에서는 패키지 사용자에게서 제공받아야 합니다. 별도의 react와 emotion을 사용하면 사용자와 생성자가 각각의 react, emotion을 가지고 있기 때문에 react, emotion 패키지 내부의 데이터(예를 들면 emotion의 테마 정보)를 공유해 사용할 수 없게 됩니다.

## `bundleDependencies` (NPM)
`bundleDependencies` 필드는 `bundledDependencies` 이름으로 사용될 수 있습니다. `bundleDependencies` 이름 그대로 패키지를 배포(publish) 할 때 번들로 제공할 패키지를 배열로 정의합니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "bundleDependencies": [
    "renderized",
    "super-streams"
  ]
}
```

## `optionalDependencies`
`optionalDependencies` 필드는 이름 그대로 선택적 종속성 패키지를 나열하는 필드입니다. 종속성이 사용되지만 패키지를 찾을 수 없거나 설치에 실패한 경우에도 패키지 설치를 계속 진행하기 위해 사용하는 필드 입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "optionalDependencies": {
    "fsevents": "^5.0.0"
  }
}
```

## `dependenciesMeta` (Yarn 2+, PNPM)
`dependenciesMeta` 필드는 `dependencies` 필드와 `devDependencies` 필드에 나열된 패키지들의 추가 설정을 할 수 있는 필드입니다. 프로젝트가 모노레포로 구성되어 여러 개의 workspace가 있는 경우 프로젝트 루트의 `package.json`에 정의되어야 합니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "dependenciesMeta": {
    "fsevents": {
      "built": false,
      "optional": false,
      "unplugged": false
    }
  }
}
```

설정 할 패키지 이름을 키로 하고 값으로 오는 객체에 Yarn 2+에서는 `build`, `optional`, `unplugged`, PNPM에는 `injected` 설정을 추가할 수 있습니다. 각각의 설정의 내용은 아래와 같습니다.

- `built`(Yarn 2+): 빌드 스크립트를 실행할지 실행하지 않을지 결정하는 플래그입니다. `false`를 지정하면 빌드 스크립트를 실행하지 않습니다. `.yarnrc.yml` 파일에 `enableScripts: false`를 저장하면 모든 패키지의 빌드 스크립트를 실행하지 않게 됩니다.
- `optional`(Yarn 2+): 단어 그대로 옵셔널을 설정 할 수 있는 플래그입니다. `true`를 지정하면 설치가 성공한 것으로 판단되어 `os`, `cpu`, `libc` 등의 패키지 제약을 설정하는 필드들을 무시하게 됩니다. 이 옵션이 `true`로 설정된 패키지는 패키지가 컴파일 될 때 `optionalDependencies` 필드에 작성되어 집니다.
- `unplugged`(Yarn 2+): 자바스크립트가 아닌 다른 언어로 된 스크립트를 포함하는 패키지에만 필요한 설정입니다. `true`인 경우 설치 시 패키지가 `.yarn/unplugged` 디렉토리(`.yarnrc.yml` 설정에서 디렉토리 이름 변경 가능)로 분리되어 설치됩니다.
- `injected`(PNPM): `true`로 설정하면 패키지가 심볼릭 링크가 아닌 하드 링크됩니다.

## `peerDependenciesMeta`
`peerDependenciesMeta` 필드는 `peerDependencies` 필드에 나열된 패키지들의 추가 설정을 할 수 있는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "peerDependenciesMeta": {
    "react-dom": {
      "optional": true
    }
  }
}
```

패키지의 optional을 설정할 수 있는데, `optional` 값을 `true`로 설정할 경우 패키지 사용자쪽에서 `peerDependencies`로 패키지를 추가하지 않아도 에러가 발생하지 않게 됩니다.

## `overrides` (NPM)
NPM에서 `overrides` 필드는 종속성의 종속성 버전을 바꾸기 위해서 사용됩니다. 아래 코드와 같이 사용할 수 있습니다.

```json
{
  "overrides": {
    "foo": "1.0.0", // `dependencies`에 의해 설치된 버전과 상관없이 항상 1.0.0버전의 foo 패키지가 설치됩니다.
    "bar": {
      ".": "1.0.0", // `dependencies`에 의해 설치된 버전과 상관없이 항상 1.0.0버전의 bar 패키지가 설치됩니다.
      "baz": "1.0.0" // bar 패키지의 baz 종속 패키지의 버전을 1.0.0으로 설치합니다.
    },
    "boo": {
      "qux": {
        "til": "1.0.0" // boo 패키지의 qux 종속 패키지의 til 종속 패키지의 버전을 1.0.0으로 설치합니다.
      }
    },
    "elf@2.0.0": {
      "two": "1.0.0" // 2.0.0 버전의 elf 패키지의 two 종속 패키지의 버전을 1.0.0으로 설치합니다.
    }
  }
}
```

위의 코드와 같이 특정할 종속 패키지의 깊이를 조절할 수 있으며, 특정 버전의 패키지 종속성만 버전을 수정할 수도 있습니다.

PNPM의 경우 `pnpm.overrides`, `resolutions` 필드가, Yarn 2+의 경우 `resolutions` 필드가 NPM의 `overrides` 필드와 동일한 기능을 합니다.

## `resolutions` (Yarn 2+, PNPM)
`resolutions` 필드는 NPM의 `overrides` 필드와 동일한 기능을 하지만 사용 방법이 조금 다릅니다. `resolutions` 필드는 아래와 같이 사용할 수 있습니다.

```json
{
  "resolutions": {
    "relay-compiler": "3.0.0",
    "webpack/memory-fs": "0.4.1",
    "@babel/core/json5": "2.1.0",
    "@babel/core/@babel/generator": "7.3.4",
    "@babel/core@npm:7.0.0/@babel/generator": "7.3.4"
  }
}
```

## `private`
`private` 필드의 값을 `true`로 설정하면 패키지 배포(publish)가 되지 않습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "private": true
}
```

## `publishConfig`
`publishConfig` 필드를 사용하면 패키지를 배포(publish) 할 때 몇가지 설정들을 오버라이드 할 수 있습니다. 패키지 매니저에 따라 오버라이드 할 수 있는 값들이 다르기 때문에 패키지 매니저의 공식 문서에서 오버라이드 되는 필드들을 확인하는 것이 좋습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "publishConfig": {
    "access": "public",
    "bin": "./build/bin.js",
    "browser": "./build/browser.js",
    "executableFiles": [
      "./dist/shim.js"
    ],
    "main": "./build/index.js",
    "exports": {
      ".": "./build/index.js",
      "./lib": "./build/index.js",
      "./feature": "./build/feature/index.js"
    },
    "module": "./build/index.mjs",
    "registry": "https://npm.pkg.github.com"
  }
}
```

Yarn 2+에서는 `bin`, `browser`, `main`, `module`, `exports` 필드를 오버라이드 할 수 있고, `access`, `executableFiles`, `registry` 필드를 추가로 설정할 수 있습니다.

- `access`: NPM에 패키지를 공개할지 공개하지 않을지 결정하는 필드입니다. `public`, `restricted` 두 개의 값 중 하나를 설정해야 하는데, `restricted`을 설정하면 패키지가 비공개 됩니다.
- `executableFiles`: 기본적으로 `bin` 필드에 나열된 파일 외에는 실행 가능한 파일로 표시되지 않습니다. `executableFiles` 필드를 사용하면 `bin` 필드를 통해 직접 실행할 수 없는 파일의 경우에도 실행가능 플래그(파일 권한 r(read), w(write), x(execute) 중 x)가 설정됩니다.
- `registry`: 패키지의 레지스토리 경로를 저장하는 필드입니다.

PNPM에서는 `bin`, `main`, `exports`, `types`(또는 `typings`), `module`, `browser`, `cpu`, `os` 필드 등을 오버라이드 할 수 있고, `executableFiles`, `directory`, `linkDirectory` 필드를 추가로 설정할 수 있습니다.

- `executableFiles`: Yarn 2+와 동일한 기능을 하는 필드입니다.
- `directory`: 현재 `package.json` 위치를 기준으로 배포(publish) 되는 디렉토리를 저장하는 필드입니다.
- `linkDirectory`: `true`로 설정할 경우 개발 중에 `publishConfig.directory` 위치에 심볼릭 링크가 생성됩니다.

## `workspaces` (NPM, Yarn 2+)
`workspaces` 필드는 프로젝트를 모노레포로 구성할 때 하위 프로젝트의 경로를 나열하는 필드입니다. glob 패턴으로 작성할 수 있습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

NPM과 Yarn의 경우 `package.json`의 `workspaces` 필드를 사용하여 모노레포를 구현할 수 있지만, PNPM의 경우 `pnpm-workspace.yaml` 파일에 하위 프로젝트를 저장하여 모노레포를 구현하게 됩니다.

## `description`
패키지에 대한 설명을 저장하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "description": "A packaged foo fooer for fooing foos"
}
```

## `keywords`
패키지의 키워드를 나열하는 필드입니다. `npm search`로 사용자들이 필요한 패키지를 검색할 때 사용되는 정보입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "keywords": ["xhr", "http", "ajax", "promise", "node"]
}
```

## `homepage`
패키지의 홈페이지 주소를 저장하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "homepage": "https://beomy.github.io"
}
```

## `bugs`
패키지의 이슈가 있을 경우 제보할 수 있는 이메일이나 url을 저장하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "bugs": {
    "url" : "https://github.com/owner/project/issues",
    "email" : "project@hostname.com"
  }
}
```
url만 제공하고 싶을 경우 아래와 같이 문자열을 저장하면 됩니다.

```json
{
  "bugs": "https://github.com/owner/project/issues"
}
```

## `license`
패키지의 라이센스를 표시하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "license" : "BSD-3-Clause",
  "license" : "(ISC OR GPL-3.0)", // 여러 개의 라이센스를 가지고 있을 때
  "license" : "SEE LICENSE IN <filename>" // 커스텀한 라이센스를 표시할 때
}
```

아래와 같은 방식은 더이상 사용되지 않습니다.

```json
// Not valid metadata
{
  "license" : {
    "type" : "ISC",
    "url" : "https://opensource.org/licenses/ISC"
  }
}
```

```json
// Not valid metadata
{
  "licenses" : [
    {
      "type": "MIT",
      "url": "https://www.opensource.org/licenses/mit-license.php"
    },
    {
      "type": "Apache-2.0",
      "url": "https://opensource.org/licenses/apache2.0.php"
    }
  ]
}
```

## `author`, `contributors`
`author`, `contributors` 두 개의 필드는 모두 패키지를 만드는데 기여한 사람들을 저장할 때 사용되는 필드입니다.

`author` 필드는 한 사람을 표시할 수 있습니다. 아래와 같이 사용할 수 있습니다.
```json
{
  "author": {
    "name": "Hyo Bum lee",
    "email": "beomyh.lee@gmail.com",
    "url": "https://beomy.github.io"
  },
  "author": "Hyo Bum lee <beomyh.lee@gmail.com> (https://beomy.github.io)" // 한 줄로 표시할 수 있습니다.
}
```

`contributors` 필드는 여러 사람을 배열로 표시할 수 있습니다.
```json
{
  "contributors": [
    {
      "name": "Hyo Bum lee",
      "email": "beomyh.lee@gmail.com",
      "url": "https://beomy.github.io"
    },
    {
      "name": "Beomy",
      "email": "beomyh.lee@gmail.com",
      "url": "https://beomy.github.io"
    }
  ]
}
```

## `funding`
패키지 개발자에게 펀딩 할 수 있는 경로를 표시하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "funding": {
    "type" : "individual",
    "url" : "http://example.com/donate"
  },
  "funding": {
    "type" : "patreon",
    "url" : "https://www.patreon.com/my-account"
  },
  "funding": "http://example.com/donate",
  "funding": [
    {
      "type" : "individual",
      "url" : "http://example.com/donate"
    },
    "http://example.com/donateAlso",
    {
      "type" : "patreon",
      "url" : "https://www.patreon.com/my-account"
    }
  ]
}
```

## `man`
manual 프로그램이 읽을 수 있는 파일 혹은 파일 배열을 저장하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "man": "./man/doc.1",
  "man": [
    "./man/foo.1",
    "./man/bar.1"
  ]
}
```

## `directories`
CommonJS 패키지 스펙에서는 `directories` 필드를 사용하여 패키지 구성을 나타낼 수 있습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "directories": {
    "bin": "./bin",
    "doc": "./doc",
    "lib": "./lib",
    "man": "./man"
  }
}
```

- `directories.bin`: `bin` 필드와 동일한 기능을 하는 필드입니다. `directories.bin`와 `bin` 하나의 필드만 설정되어야 합니다.
- `directories.doc`: 패키지의 문서, 마크다운 파일들의 위치를 표시하는 필드입니다.
- `directories.lib`: 패키지의 라이브러리의 위치를 표시하는 필드입니다.
- `directories.man`: `man` 필드와 동일한 기능을 하는 필드입니다. 매뉴얼 페이지의 경로를 저장합니다. `man` 필드에 배열 형태로 저장하는 것을 간단(Sugar)하게 만들 수 있게 제공되는 필드입니다.

[npm-cli](https://github.com/npm/cli/blob/latest/package.json)에서 `directories` 필드가 설정되어 있는 것을 확인할 수 있습니다.

## `repository`
코드가 있는 위치를 저장하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/npm/cli.git"
  },
  "repository": "npm/npm",
  "repository": "github:user/repo",
  "repository": "gist:11081aaa281",
  "repository": "bitbucket:user/repo",
  "repository": "gitlab:user/repo",
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git",
    "directory": "packages/react-dom" // 모노레포로 구성되어 루트에 패키지가 없는 경우 경로를 지정할 수 있습니다.
  }
}
```

##### 참고
- [https://flaviocopes.com/npm-peer-dependencies/](https://flaviocopes.com/npm-peer-dependencies/)
- [https://yceffort.kr/2021/10/debt-of-package-json](https://yceffort.kr/2021/10/debt-of-package-json)
- [https://gigibean.tistory.com/m/73](https://gigibean.tistory.com/m/73)
- [https://docs.npmjs.com/cli/v8/configuring-npm/package-json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
- [https://nodejs.org/api/packages.html](https://nodejs.org/api/packages.html)
- [https://yarnpkg.com/configuration/manifest](https://yarnpkg.com/configuration/manifest)
- [https://heropy.blog/2019/01/31/node-js-npm-module-publish/](https://heropy.blog/2019/01/31/node-js-npm-module-publish/)
- [https://velog.io/@slaslaya/Semantic-Versioning-2.0.0-MAJOR-MINOR-PATCH와-명세에-관하여](https://velog.io/@slaslaya/Semantic-Versioning-2.0.0-MAJOR-MINOR-PATCH와-명세에-관하여)
- [https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- [https://docs.npmjs.com/cli/v8/using-npm/scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [https://yarnpkg.com/advanced/lifecycle-scripts](https://yarnpkg.com/advanced/lifecycle-scripts)
- [https://github.com/npm/node-semver#versions](https://github.com/npm/node-semver#versions)
- [https://pnpm.io/package_json](https://pnpm.io/package_json)
- [https://dev.to/arcanis/introducing-yarn-2-4eh1](https://dev.to/arcanis/introducing-yarn-2-4eh1)
- [https://programmingsummaries.tistory.com/385](https://programmingsummaries.tistory.com/385)
