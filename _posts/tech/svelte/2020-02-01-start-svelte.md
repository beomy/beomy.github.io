---
layout: post
title: '[Svelte] Svelte 시작하기'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
---
{% include toc.html %}

이번 포스트에서는 rollup + sass + typescript와 webpack + sass + typescript를 사용할 수 있도록 Svelte 프로젝트를 구성하는 방법을 이야기합니다. 현재 Svelte(v3.18.0)는 typescript를 공식 지원을 하지 않습니다.

# Quick Start Guide
Svelte 공식 문서에서 Svelte 프로젝트를 빠르게 만들 수 있는 2가지 방법(REPL과 digit)을 이야기합니다. REPL, digit으로 프로젝트를 만들수 있는 방법을 이야기하도록 하겠습니다. 자세한 내용은 [quickstart guide](https://svelte.dev/blog/the-easiest-way-to-get-started)를 참고 바랍니다.

## REPL 사용
[REPL(Real Eval Print Loop)](https://ko.wikipedia.org/wiki/REPL)이란 사용자의 입력을 받아 실행하고 결과를 사용자에게 보여주는 프로그래밍 환경을 말합니다.

[Svelte 소개](/tech/svelte/introduction-svelte)에서 이야기한 것처럼 Svelte는 빌드 타임에 반응형이 결정됩니다. 이런 특징은 런타임 동안에 변경사항을 찾아야 하는 오버헤드를 줄여 속도를 개선하는 장점이 있지만, CDN 등으로 Svelte를 사용할 수 없는 단점도 있습니다. CDN으로 Svelte를 사용할 수 없어서 CodePen 등의 웹 IDE를 사용할 수 없습니다. Svelte는 이런 단점을 보완하기 위해 자체적으로 REPL을 제공하는 것으로 보입니다.

[Svelte REPL](https://svelte.dev/repl/hello-world?version=3.18.1)에서 코딩한 후 코딩한 프로젝트를 다운로드할 수 있습니다. `svelte-app.zip`으로 다운로드되는데, 파일의 압축을 풀고 아래와 같이 프로젝트를 실행할 수 있습니다.

```bash
cd /path/to/svelte-app
npm install
npm run dev
```

이 방법을 사용하면 rollup 번들러(bundler)를 사용한 프로젝트가 만들어집니다.

## digit 사용
digit를 사용하여 프로젝트를 만들 수 있습니다. Svelte는 template와 template-webpack 두 가지 템플릿 프로젝트를 제공합니다.

### template
[sveltejs/template](https://github.com/sveltejs/template)은  rollup 번들러를 사용하는 템플릿입니다. 템플릿을 다운로드 하는 방법은,

```bash
npx degit sveltejs/template my-svelte-project
# or download and extract this .zip file
cd my-svelte-project

npm install
npm run dev
```

위의 코드와 같이 rollup 번들러를 사용하는 템플릿을 다운로드할 수 있습니다. 이 방법을 사용하면 [sveltejs/template](https://github.com/sveltejs/template)에 올라와 있는 프로젝트가 만들어집니다.

### webpack template
[sveltejs/template-webpack](https://github.com/sveltejs/template-webpack)은 webpack을 사용하는 템플릿입니다. 템플릿을 다운로드하는 방법은,

```bash
npx degit sveltejs/template-webpack my-svelte-project
# or download and extract this .zip file
cd my-svelte-project

npm install
npm run dev
```

위의 코드와 같이 webpack 번들러를 사용하는 템플릿을 다운로드할 수 있습니다. 이 방법을 사용하면 [sveltejs/template-webpack](https://github.com/sveltejs/template-webpack)에 올라와 있는 프로젝트가 만들어집니다.

### 프로젝트 구성 커스터마이징
[sveltejs/template](https://github.com/sveltejs/template)(혹은 [sveltejs/template-webpack](https://github.com/sveltejs/template-webpack))의 깃허브(github) 레파지토리(repository)를 포크(fork) 하여 커스터마이징 한다면,

```bash
npx degit your-name/template my-new-project
```

위의 코드로 커스터마이징한 프로젝트 구성으로 손 쉽게 프로젝트를 만들 수 있습니다.

# svelte-preprocess
Svelte의 `svelte.preprocess`를 사용하면 sass, typescript 등의 전처리기를 사용할 수 있습니다. `svelte-preprocess`는 sass, typescript를 사용할 수 있게 `svelte.preprocess` 설정을 미리 해 놓은 오픈 소스입니다. `svelte-preprocess`를 사용하여 sass와 typescript 설정을 해보도록 하겠습니다.

## rollup
rollup 번들러를 사용하는 [sveltejs/template](https://github.com/sveltejs/template) 템플릿에 sass와 typescript를 사용하기 위한 설정 방법을 이야기하도록 하겠습니다.

### template 다운로드
템플릿 프로젝트를 다운로드합니다.

```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
```

### `svelte-preprocess` 다운로드
그 후에 사용할 `svelte-preprocess`를 다운로드합니다.

```bash
npm install -D svelte-preprocess
```

### sass 다운로드
sass 전처리기를 아래 코드와 같이 다운로드합니다.

```bash
npm install -D node-sass
# or npm install -D sass
```

### typescript 다운로드
typescript 전처리기를 아래 코드와 같이 다운로드합니다.

```bash
npm install -D typescript
```

### svelte-preprocess 설정
rollup 번들러에서 `svelte-preprocess`를 설정하는 방법은 아래와 같습니다.

```js
// rollup.config.js
import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess'
import { scss, coffeescript, pug } from 'svelte-preprocess'
 
export default {
  ...,
  plugins: [
    svelte({
      /**
       * Auto preprocess supported languages with
       * '<template>'/'external src files' support
       **/
      preprocess: autoPreprocess({ /* options */ })
      /**
       * It is also possible to manually enqueue
       * stand-alone processors
       * */
      preprocess: [
        pug({ /* pug options */ }),
        scss({ /* scss options */ }),
        coffeescript({ /* coffeescript options */ })
      ]
    })
  ]
}
```

### VS Code 설정
지금까지 이야기한 방법으로 sass와 typescript를 설정하고 VS Code로 프로젝트를 열어보면,

![sass 에러](/assets/img/posts/svelte/sass_typescript_error.png)

위의 코드와 같이 에러가 표시됩니다. VS Code에서 typescript, sass 에러를 없애려면 프로젝트의 루트에 `svelte.config.js`를 만들어줘야 합니다.

```js
// svelte.config.js
const sveltePreprocess = require('svelte-preprocess');
 
module.exports = {
  preprocess: sveltePreprocess({
    // ...svelte-preprocess options
  }),
  // ...other svelte options
};
```

프로젝트의 루트에 위의 코드와 같은 `svelte.config.js` 파일을 추가해 줍니다.

### sass, typescript 사용
지금까지 내용으로 sass와 typescript 설정이 끝났습니다. 이번에는 sass와 typescript를 사용하는 방법을 이야기하도록 하겠습니다.

```html
<script lang="ts">
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
  }
</style>
```

위의 코드와 같이 `<script>`, `<style>` 태그에 `lang`을 정의하여 typescript와 sass를 사용할 수 있습니다.

### beomy/template
[sveltejs/template](https://github.com/sveltejs/template)에 sass와 typescript를 추가하여 커스터마이징한 프로젝트 구성을 [beomy/template](https://github.com/beomy/template)에 업로드하였습니다. 쉽게 프로젝트를 구성하는 방법은,

```bash
npx degit beomy/template my-svelte-project
```

위의 코드를 사용하여 rollup + sass + typescript의 프로젝트를 쉽게 구성할 수 있습니다.

## webpack
webpack 번들러를 사용하는 [sveltejs/template-webpack](https://github.com/sveltejs/template-webpack) 템플릿에 sass와 typescript를 사용하기 위한 설정 방법을 이야기하도록 하겠습니다.

### template-webpack 다운로드
템플릿 프로젝트를 다운로드합니다.

```bash
npx degit sveltejs/template-webpack my-svelte-project
cd my-svelte-project
```

### `svelte-preprocess` 다운로드
그 후에 사용 할 `svelte-preprocess`를 다운로드합니다.

```bash
npm install -D svelte-preprocess
```

### sass 다운로드
sass 다운로드는 template와 동일합니다.

```bash
npm install -D node-sass
# or npm install -D sass
```

### typescript 다운로드
typescript 다운로드는 template와 동일합니다.

```bash
npm install -D typescript
```

### svelte-preprocess 설정
webpack 번들러에서 `svelte-preprocess`를 설정하는 방법은 아래와 같습니다.

```js
// webpack.config.js
  ...
  module: {
    rules: [
      ...
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: require('svelte-preprocess')({ /* options */ })
          },
        },
      },
      ...
    ]
  }
  ...
```

### VS Code 설정
VS Code에서 사용하기 위한 설정 방법은 rollup 번들러와 동일합니다. 프로젝트의 루트에 `svelte.config.js`를 만들고 해당 파일에 설정들을 선언해야 합니다.

### sass, typescript 사용
sass와 typescript를 사용하는 방법도 rollup 번들러와 동일합니다.

### beomy/template-webpack
[sveltejs/template-webpack](https://github.com/sveltejs/template-webpack)에 sass와 typescript를 추가하여 커스터마이징한 프로젝트 구성을 [beomy/template-webpack](https://github.com/beomy/template-webpack)에 업로드하였습니다. 쉽게 프로젝트를 구성하는 방법은,

```bash
npx degit beomy/template-webpack my-svelte-project
```

위의 코드를 사용하여 webpack + sass + typescript의 프로젝트를 쉽게 구성할 수 있습니다.

# 개선사항
지금까지 sass와 typescript를 사용할 수 있도록 프로젝트를 구성하면서 몇 가지 추가되었으면 좋겠다 생각이 드는 부분이 있었습니다.

- `d.ts` 사용
- `<scirpt>` 태그 외에 typescirpt 사용
- 정적 코드분석(lint와 같은..) 툴 사용

~~방법을 아직 찾지 못했지만~~ 먼저 `d.ts`를 사용하여 커스텀 타입을 만드는 방법을 추가하면 좋겠다는 생각이 들었습니다. 이 이슈는 Svelte가 공식적으로 typescript를 지원하지 않아서 `<script>` 태그 내부 외에는 typescript를 사용하지 못한다는 한계로 발생하는 문제인 듯 보입니다. ([https://www.npmjs.com/package/svelte-preprocess#typescript](https://www.npmjs.com/package/svelte-preprocess#typescript) 참고)

lint와 같은 정적 코드 분석 툴을 사용(혹은 개선) 하면 좋겠다는 생각이 들었습니다. typescript를 사용하면 자동으로 문법 에러를 잡아내는데, `$:` 문법과 같은 Svelte만의 독특한 문법들도 에러로 잡아냅니다.

![lint 에러](/assets/img/posts/svelte/lint_error.png)

#### 참고
- [https://www.npmjs.com/package/svelte-preprocess](https://www.npmjs.com/package/svelte-preprocess)
- [https://svelte.dev/blog/the-easiest-way-to-get-started](https://svelte.dev/blog/the-easiest-way-to-get-started)