---
layout: post
title: '[ETC] package.json 톺아보기'
featured-img: etc/package_json.png
category: [tech, etc]
summary: package.json에는 프로젝트에 대한 설명, 패키지, 실행 스크립트 등의 정보를 담는 매니페이스(Manifest) 파일입니다. 이번 포스트에서는 package.json에서 설정할 수 있는 필드 값들을 하나씩 살펴보도록 하겠습니다.
---

`package.json`에는 프로젝트에 대한 설명, 종속성 패키지, 실행 스크립트 등의 정보를 담는 매니페이스(Manifest) 파일입니다. 이번 포스트에서는 `package.json`에서 설정할 수 있는 필드 값들을 하나씩 살펴보도록 하겠습니다.

사용하는 패키지 매니저(npm, yarn, pnpm 과 같은)에 따라 설정 가능한 필드들이 다를 수 있기 때문에 사용하는 패키지 매니저의 공식 홈페이지([npm](https://docs.npmjs.com/cli/v8/configuring-npm/package-json), [yarn 2+](https://yarnpkg.com/configuration/manifest), [pnpm](https://pnpm.io/package_json))에서 설정 가능한 필드를 확인하는 것이 좋습니다.

eslint나 prettier 등의 라이브러리 설정(eslint의 경우 `eslintConfig` 필드)도 `package.json`에서 가능하기 때문에 이러한 설정 역시 사용하는 라이브러리의 공식 홈페이지에서 확인하고 사용하는 것이 좋습니다.

`package.json`에 설정 가능한 필드를 하나씩 살펴보도록 하겠습니다. 필드 이름 옆 괄호로 어떠한 환경에서 설정 가능한 필드인지 나타내었습니다.

# `name`
`name` 필드는 프로젝트의 이름을 나타냅니다. 아래와 같이 `name` 필드를 작성할 수 있습니다.

```json
{
  "name": "@beomy/blog"
}
```

`@beomy/` 같이 `name` 필드는 `@`로 시작하여 스코프를 지정할 수도 있습니다.

# `version`
`version` 필드는 프로젝트의 버전을 나타냅니다. 아래와 같이 `version` 필드를 작성할 수 있습니다.

```json
{
  "version": "1.2.3"
}
```

> **NPM 패키지에서 `name`과 `verion`**
>
> 프로젝트가 NPM에 배포 될 때 `name`와 `version` 필드는 필수 값입니다. `name`와 `version` 필드는 NPM 패키지의 식별자이기 때문에 `name`와 `version` 필드를 합친 값(예를 들어 `@beomy/blog@1.2.3`)은 유니크한 값이여야 합니다.

> **오픈소스의 버전 구분**
>
> 버전은 아래 그림과 같이 Major, Minor, Patch로 구성되어 있습니다. 이런 형태의 버전 표시방법은 오픈소스 프로젝트에 일반적으로 사용됩니다.
>
> ![package.json version](/assets/img/posts/etc/package_version.png)
>
> - Major: API가 변경/삭제 되어 사용자가 Major 버전을 업데이트 할 경우 기존의 코드가 동작하지 않을 수 있을 때, Major 버전을 업데이트하여 배포합니다.
> - Minor: 이전 버전과 호환되는 방식으로 API가 추가/변경 되었을 때 Minor 버전을 업데이트하여 배포합니다.
> - Patch: 이전 버전과 호환되는 버그 수정을 할 경우 Patch 버전을 업데이트하여 배포합니다.

# `files`
`files` 필드는 패키지가 설치될 때 포함될 항목들을 저장하는 필드입니다. 아래와 같이 glob 형태로 작성할 수 있습니다.

```json
{
  "files": [
    "dist/**/*",
    "lib/**/*"
  ]
}
```

`files` 필드를 사용하지 않고 프로젝트 루프에 `.npmignore` 파일을 생성하여 NPM에 배포하지 않을 파일들을 지정할 수도 있습니다. `.npmignore` 파일이 없는 경우 `.gitignore` 파일에 작성된 목록들이 NPM에 배포되지 않습니다.

# `main`
`main` 필드는 패키지를 사용할 때 진입되는 경로입니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "main": "./sources/index.js"
}
```

아래 package.json과 같이 작성된 패키지가 있다면,

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

# `module` (Yarn 2+)
`module` 필드는 `main` 필드와 유사한 목적으로 사용 되는 필드입니다. ES6 호환 환경에서 패키지를 사용할 때 진입되는 경로입니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "module": "./sources/index.mjs"
}
```

# `browser` (NPM)
`browser` 필드는 패키지가 클라이언트 사이드(Client side), 브라우저에서 사용되는 패키지라면 `main` 필드 대신 사용되는 필드입니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "browser": "./sources/index.js"
}
```

`browser` 필드를 사용하면 클라이언트 사이드에서 동작하는 패키지라는 것을 명시하는 것이기 때문에, `window` 객체와 같이 Node.js에서 사용이 불가능한 요소에 대한 힌트를 사용자에게 제공하게 됩니다.

# `type` (Node)
`type` 필드는 `commonjs`(기본 값)와 `module` 중 하나를 사용할 수 있습니다. `type` 필드가 정의되어 있지 않다면 `commonjs`로 처리됩니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "type": "module"
}
```

파일의 확장자가 `.mjs`이거나 `type` 필드가 `module`일 경우 패키지는 ES Module를 사용하여 `import`나 `import()` 함수를 사용할 수 있게 됩니다. 파일 확장자가 `.cjs`이거나 `type` 필드가 `commonjs`일 경우(혹은 생략) `import`, `import()` 함수, `require()` 함수를 사용할 수 있습니다.

# `packageManager` (Node)
`packageManager` 필드는 패키지가 특정 패키지 매니저를 사용해야 할 경우 특정 패키지와 버전을 지정할 수 있는 필드입니다. 아래와 같이 작성할 수 있습니다.

```json
{
  "packageManager": "yarn@3.2.3"
}
```

# `exports` (Node)
`main` 필드와 `exports` 필드를 사용하면 패키지의 진입점을 설정할 수 있습니다. `exports` 필드는 `main` 필드와 다르게 여러개의 진입점을 설정할 수 있습니다. 아래와 같이 작성할 수 있습니다.

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

# `types` (Typescript)
`types` 필드는 타입스크립트의 `d.ts` 타입 정의 파일의 경로를 저장하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "types": "./lib/index.d.ts"
}
```

타입 정의 파일의 이름이 `index.d.ts`이고 패키지 루트(`index.js`의 위치)에 있으면 생략 가능합니다.

# `bin`
`bin` 필드는 실행 가능한 자바스크립트 파일을 상위 패키지에 노출하는데 사용되는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "bin": {
    "my-bin": "./dist/my-bin.js"
  }
}
```

`bin` 필드의 사용 방법은 글로벌로 설치되어 많이 사용되는 패키지를 살펴보면 쉽게 이해 할 수 있습니다. `create-react-app` 패키지의 `bin` 필드는 아래 코드와 같이 되어 있습니다.

```json
{
  "bin": {
    "create-react-app": "./index.js"
  }
}
```

# `scripts`
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

# `dependencies`
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

NPM을 사용할 경우 `npm install <종속 패키지 이름>`, Yarn을 사용할 경우 `yarn add <종속 패키지 이름>` 명령어를 사용하면 패키지를 다운로드 받고 `dependencies` 필드에 다운로드 된 종속 패키지가 버전 정보와 함께 저장됩니다.

> **패키지 버전 표시 방법**
>
> 패키지에 종속 패키지를 추가할 경우 `dependencies` 필드에 `<패키지 이름>: "<패키지 버전 정보>"` 형태로 저장됩니다. 패키지를 다운로드 받을 때 `<패키지 버전 정보>`와 매칭되는 패키지를 다운로드 받습니다. `<패키지 버전 정보>`의 형태는 아래와 같습니다.
>
> - `version`: 정확한 `version`의 패키지와 매칭됩니다.
> - `1.2.x`: `1.2.0`, `1.2.1`와 깉이 `1.2` 버전 대역의 패키지와 매칭됩니다.
> - `>version`: `version`보다 큰 버전의 패키지와 매칭됩니다.
> - `>=version`: `version`보다 크거나 같은 버전의 패키지와 매칭됩니다.
> - `<version`: `version`보다 작은 버전의 패키지와 매칭됩니다.
> - `<=version`: `version`보다 작거나 같은 버전의 패키지와 매칭됩니다.
> - `~version`: `verison`과 가장 동일한 버전의 패키지와 매칭됩니다. 예를 들어,
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
> - `path/path/path`: `pathe/path/path` 로컬 경로에 해당하는 패키지와 매칭됩니다.

# `devDependencies`
`devDependencies` 필드는 개발 종속성들을 나열하는 필드입니다. `dependencies` 필드와 동일하게 작성합니다. `devDependencies` 필드에 나열된 종속성들은 패키지 개발자의 로컬에는 설치되지만, 패키지를 소비하는 소비자에게는 설치되지 않습니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "devDependencies": {
    "webpack": "^5.0.0"
  }
}
```

# `peerDependencies`
`peerDependencies` 종속성은 상속되어야 하는 종속성을 나열하는 필드입니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "peerDependencies": {
    "react": "*",
    "react-dom": "*"
  }
}
```

상속되어야 하는 종속성이란 패키지 개발에 필요한 종속성을 peer(해석하면 또래)에게서 재공받는 종속성입니다.

예를 들어 react와 emotion을 사용하여 UI 컴포넌트를 패키지로 만든다고 하면, react나 emotion은 UI 컴포넌트 패키지 입장에서는 패키지 소비자에게서 제공받아야 합니다. 별도의 react와 emotion을 사용하면 소비자와 제공자가 각각의 react, emotion을 가지고 있기 때문에 react, emotion 패키지 내부의 데이터(예를 들면 emotion의 테마 정보)를 소비자와 제공자가 공유해 사용할 수 없게 됩니다.

# `bundleDependencies` (NPM)
`bundleDependencies` 필드는 `bundledDependencies` 이름으로 사용될 수 있습니다. `bundledDependencies` 이름 그대로 패키지를 배포(publish) 할 때 번들로 제공할 패키지를 배열로 정의합니다. 아래와 같이 사용할 수 있습니다.

```json
{
  "bundleDependencies": [
    "renderized",
    "super-streams"
  ]
}
```

# optionalDependencies

# `dependenciesMeta` (Yarn 2+, PNPM)
`dependenciesMeta` 필드는 `dependencies` 필드와 `devDependencies` 필드에 나열된 패키지들의 추가 설정을 할 수 있는 필드입니다. 프로젝트가 모노레포로 구성되어 여러개의 workspace가 있는 경우 프로젝트 루트의 `package.json`에 정의되어야 합니다. 아래와 같이 사용할 수 있습니다.

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

- `built`(Yarn 2+): Yarn 2+에서 사용하는 플래그로, 빌드 스크립트를 실행할지 실행하지 않을지 결정하는 플레그입니다. `false`를 지정하면 빌드 스크립트를 실행하지 않습니다. `.yarnrc.yml` 파일에 `enableScripts: false`를 저장하면 모든 패키지의 빌드 스크립트를 실행하지 않게 됩니다.
- `optional`(Yarn 2+): Yarn 2+에서 사용하는 플래그로, 단어 그대로 옵셔널을 설정활 수 있는 플래그입니다. `true`를 지정하면 성공한 것으로 판단되어 `os`, `cpu`, `libc` 등의 패키지 제약을 설정하는 필드들을 무시하게 됩니다. 이 옵션이 `true`로 설정된 패키지는 패키지가 컴파일 될 때 `optionalDependencies` 필드에 작성되어 집니다.
- `unplugged`(Yarn 2+): Yarn 2+에서 사용하는 플래그로, 자바스크립트가 아닌 다른 언어로 된 스크립트를 포함하는 패키지에만 필요한 설정입니다. `true`인 경우 설치시 `.yarn/unplugged` 디렉토리(`.yarnrc.yml` 설정에서 디렉토리 이름 변경 가능)로 분리됩니다.
- `injected`(PNPM): PNPM에서 사용하는 플래그로, `true`로 설정하면 패키지가 심볼릭 링크가 아닌 하드 링크됩니다.

# `peerDependenciesMeta`
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

`optional` 값을 `true`로 설정할 경우 패키지 소비자쪽에서 `peerDependencies`로 패키지를 추가하지 않아도 에러가 발생하지 않게 됩니다.

# overrides
pnpm의 경우 `pnpm.overrides`

# private
```json
{
  "private": true
}
```

# publishConfig
패키지 매니저에 따라 어떠한 값들이 오버라이드 되는지 다름

- exports 됨
- main 됨
- types 안됨

# 부록

## 기타 필드
- description
- keywords
- homepage
- bugs
- license
- author, contributors
- funding
- engines
- os
- cpu
- man
- directories: [npm package.json](https://github.com/npm/cli/blob/latest/package.json)
- repository
- resolutions(yarn)
- imports(node)

## script life cycle
- 라이프 사이클
- yarn에서는 pre post 라이프 사이클 불가능 [https://yarnpkg.com/advanced/lifecycle-scripts](https://yarnpkg.com/advanced/lifecycle-scripts)

## 외부 라이브러리 연동
- eslint
- prettier
- lint-staged

#### 참고
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
