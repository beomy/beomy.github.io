---
layout: post
title: '[ETC] package.json 톺아보기'
featured-img: javascript/js.png
category: [tech, etc]
summary: package.json에는 프로젝트에 대한 설명, 패키지, 실행 스크립트 등의 정보를 담는 매니페이스(Manifest) 파일입니다. 이번 포스트에서는 package.json에 작성할 수 있는 필드를 살펴보도록 하겠습니다.
---

`package.json`에는 프로젝트에 대한 설명, 패키지, 실행 스크립트 등의 정보를 담는 매니페이스(Manifest) 파일입니다. 사용하는 패키지 매니저(npm, yarn 과 같은)에 따라 설정 가능한 필드들이 다를 수 있기 때문에 사용하는 패키지 매니저의 공식 홈페이지에서 설정 가능한 필드를 확인하는 것이 좋습니다. 또한 eslint나 prettier 등의 라이브러리 설정(eslint의 경우 `eslintConfig` 필드)도 `package.json`에서 가능하기 때문에 이러한 설정 역시 사용하는 라이브러리의 공식 홈페이지에서 확인하고 사용하는 것이 좋습니다.

`package.json`에서 설정할 수 있는 필드 값들을 하나씩 살펴보도록 하겠습니다.

# `name`
`name` 필드는 프로젝트의 이름을 나타냅니다. 아래와 같이 `name` 필드를 작성할 수 있습니다.

```
"name": "@beomy/blog"
```

`@beomy/blog`의 `@beomy/` 같이 `@`로 시작하여, 프로젝트의 스코프를 지정할 수도 있습니다.

# `version`
`version` 필드는 프로젝트의 버전을 나타냅니다. 아래와 같이 `version` 필드를 작성할 수 있습니다.

```
"version": "1.2.3"
```

프로젝트가 NPM에 배포된다면 `name`와 `version` 필드는 필수 값입니다. `name`와 `version` 필드는 NPM 패키지의 식별자이기 때문에 `name`와 `version` 필드를 합친 값(예를 들어 `@beomy/blog@1.2.3`)은 유니크한 값이여야 합니다.

> **버전 구분**
>
> - patch
> - minor
> - major

# files

# main

# module

# browser

# exports

# bin
- [serve 패키지](https://github.com/vercel/serve/blob/main/package.json)

# scripts
- 라이프 사이클

# dependencies

> **패키지 버전 표시 방법**
>
> - `version`: Must match version exactly
> - `>version`: Must be greater than version
> - `>=version`: etc
> - `<version`:
> - `<=version`:
> - `~version`: "Approximately equivalent to version" See semver
> - `^version`: "Compatible with version" See semver
> - `1.2.x`: 1.2.0, 1.2.1, etc., but not 1.3.0
> - `http://...`: See 'URLs as Dependencies' below
> - `*`: Matches any version
> - `""`: (just an empty string) Same as *
> - `version1 - version2`: Same as >=version1 <=version2.
> - `range1 || range2`: Passes if either range1 or range2 are satisfied.
> - `git...`: See 'Git URLs as Dependencies' below
> - `user/repo`: See 'GitHub URLs' below
> - `tag`: A specific version tagged and published as tag See npm dist-tag
> - `path/path/path`: See Local Paths below
> 
> ```json
> {
>   "dependencies": {
>     "foo": "1.0.0 - 2.9999.9999",
>     "bar": ">=1.0.2 <2.1.2",
>     "baz": ">1.0.2 <=2.3.4",
>     "boo": "2.0.1",
>     "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
>     "asd": "http://asdf.com/asdf.tar.gz",
>     "til": "~1.2",
>     "elf": "~1.2.3",
>     "two": "2.x",
>     "thr": "3.3.x",
>     "lat": "latest",
>     "dyl": "file:../dyl"
>   }
> }
> ```

# devDependencies

# peerDependencies
- require(import) 하지 않지만 특정 라이브러리나 툴에 호환성이 필요할 경우 사용되는 dependencies

# peerDependenciesMeta

# bundleDependencies(bundledDependencies)

# optionalDependencies

# overrides

# private
```
"private": true
```

# publishConfig
- types 안됨 
- exports 됨
- main 됨

# types - 못찾겠다.

# 기타 필드
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
- type(node): `commonjs`(기본 값)와 `module` 중 하나를 사용할 수 있습니다.
- packageManager(node)
- imports(node)

# 외부 라이브러리 연동
- eslint
- prettier
- lint-staged

#### 참고
- [https://flaviocopes.com/npm-peer-dependencies/](https://flaviocopes.com/npm-peer-dependencies/)
- [https://yceffort.kr/2021/10/debt-of-package-json](https://yceffort.kr/2021/10/debt-of-package-json)
- [https://gigibean.tistory.com/m/73](https://gigibean.tistory.com/m/73)
- [https://docs.npmjs.com/cli/v8/configuring-npm/package-json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)
- [https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions](https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions)
- [https://yarnpkg.com/configuration/manifest](https://yarnpkg.com/configuration/manifest)
- [https://heropy.blog/2019/01/31/node-js-npm-module-publish/](https://heropy.blog/2019/01/31/node-js-npm-module-publish/)