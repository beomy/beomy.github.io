---
layout: post
title: '[ETC] package.json의 scripts'
featured-img: etc/package_json.png
category: [tech, etc]
summary:
---

# Life Cycle Scripts
- 라이프 사이클
- yarn에서는 pre post 라이프 사이클 불가능 [https://yarnpkg.com/advanced/lifecycle-scripts](https://yarnpkg.com/advanced/lifecycle-scripts)

## Pre와 Post 스크립트

## 특별한 라이프 사이클 스크립트

### NPM
- prepare: 패키지가 패킹되기 전, `npm publish` 혹은 `npm pack` 중에 실행되는 스크립트입니다.
- prepublish (DEPRECATED):
- prepublishOnly
- prepack
- postpack
- dependencies

### Yarn 2+
- prepack
- postpack
- prepublish
- postintall

# 라이프 사이클 실행 순서

# 부록
## npm ci (npm clean-install)

#### 참고
- [https://docs.npmjs.com/cli/v8/using-npm/scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [https://yarnpkg.com/advanced/lifecycle-scripts](https://yarnpkg.com/advanced/lifecycle-scripts)