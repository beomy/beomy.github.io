---
layout: post
title: '[ETC] package.json 톺아보기'
featured-img: javascript/js.png
category: [tech, etc]
---

Manifest

# name
```
"name": "@beomy/blog"
```

# version
```
"version": "1.2.3"
```

# files

# main

# module

# browser

# bin
- [serve 패키지](https://github.com/vercel/serve/blob/main/package.json)

# scripts
- 라이프 사이클

# dependencies
- `version`: Must match version exactly
- `>version`: Must be greater than version
- `>=version`: etc
- `<version`:
- `<=version`:
- `~version`: "Approximately equivalent to version" See semver
- `^version`: "Compatible with version" See semver
- `1.2.x`: 1.2.0, 1.2.1, etc., but not 1.3.0
- `http://...`: See 'URLs as Dependencies' below
- `*`: Matches any version
-  `""`: (just an empty string) Same as *
-  `version1 - version2`: Same as >=version1 <=version2.
-  `range1 || range2`: Passes if either range1 or range2 are satisfied.
-  `git...`: See 'Git URLs as Dependencies' below
-  `user/repo`: See 'GitHub URLs' below
- `tag`: A specific version tagged and published as tag See npm dist-tag
- `path/path/path`: See Local Paths below

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl"
  }
}
```

# devDependencies

# peerDependencies
require(import) 하지 않지만 특정 라이브러리나 툴에 호환성이 필요할 경우 사용되는 dependencies

# bundleDependencies(bundledDependencies)

# optionalDependencies

# overrides

# private
```
"private": true
```

# resolutions

# type
`commonjs`(기본 값)와 `module` 중 하나를 사용할 수 있습니다.

```
"type": "commonjs"
```

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
