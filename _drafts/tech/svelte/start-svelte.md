---
layout: post
title: '[Svelte] Svelte 시작하기'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 webpack, sass, typescript를 사용할 수 있도록 Svelte 프로젝트를 구성하는 방법에 대해 이야기합니다. 현재 Svelte(v3.18.0)는 typescript를 공식 지원을 하지 않습니다.

# Quick Start Guide
Svelte 공식 문서에서 Svelte 프로젝트를 만드는 2가지 방법을 이야기 합니다. Svelte 공식 문서에서 소개하는 REPL, digit로 프로젝트를 만들 수 있는 방법에 대해 이야기 하도록 하겠습니다. 자세한 내용은 [quickstart guide](https://svelte.dev/blog/the-easiest-way-to-get-started)를 참고 바랍니다.

## REPL 사용
[REPL(Real Eval Print Loop)](https://ko.wikipedia.org/wiki/REPL)란 사용자의 입력을 받아 실행하고 결과를 사용자에게 보여주는 프로그래밍 환경을 말합니다.

[Svelte 소개](/tech/svelte/introduction-svelte)에서 이야기 한 것 처럼 Svelte는 빌드 타임에 반응형이 결정됩니다. 이런 특징은 런타임 동안에 변경사항을 찾아야 하는 오버헤드를 줄이는 장점이 있지만 CDN 등으로 Svelte를 사용할 수 없는 단점도 있습니다. CDN으로 Svelte를 사용할 수 없기 때문에 CodePen 등의 웹 IDE를 사용할 수 없습니다. Svelte는 이런 단점을 보안하기 위해 자체적으로 REPL을 제공하는 것으로 보입니다.

[Svelte REPL](https://svelte.dev/repl/hello-world?version=3.18.1)에서 프로젝트를 개발한 후 다운로드 버튼으로 프로젝트를 다운로드할 수 있습니다. `svelte-app.zip`으로 다운로드되는데, 이 압축을 풀고 아래와 같이 프로젝트를 만들 수 있습니다.

```bash
cd /path/to/svelte-app
npm install
```

그 후에 실행하는 방법은,

```bash
npm run dev
```

위의 코드를 실행하여 프로젝트를 실행 할 수 있습니다. 이렇게 rollup 번들러를 사용한 프로젝트가 만들어집니다.

## digit 사용
digit를 사용하여 프로젝트를 만들 수 있습니다. digit을 사용하여 프로젝트를 만드는 방법은,

```bash
npx degit sveltejs/template my-svelte-project
# or download and extract this .zip file
cd my-svelte-project

npm install
npm run dev
```

위의 방법으로 프로젝트를 구성하면 [sveltejs/template](https://github.com/sveltejs/template)에 올라와 있는 프로젝트가 만들어집니다. 이렇게 만들어진 프로젝트 또한 rollup을 사용합니다.

### 프로젝트 구성 커스터마이징 방법
[sveltejs/template](https://github.com/sveltejs/template)의 깃허브(github) 레파지토리(repository)를 포크(fork)하여 커스터마이징 한다면,

```bash
npx degit your-name/template my-new-project
```

위의 코드와 같이 커스터마이징한 프로젝트 구성으로 손 쉽게 프로젝트를 만들 수 있습니다.

# webpack template

# svelte-preprocess

## sass 설정

## typescript 설정

## VS Code 설정
VS Code에서 typescript, sass 에러를 없애려면 svelte.config.js를 빼야 함

# 개선사항
- `d.ts` 사용방법
- lint

#### 참고
- [https://www.npmjs.com/package/svelte-preprocess](https://www.npmjs.com/package/svelte-preprocess)