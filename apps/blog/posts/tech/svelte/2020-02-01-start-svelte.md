---
layout: post
title: '[Svelte] Svelte 시작하기'
featured-img: svelte/svelte.png
height-img: 200px
category: [tech, svelte]
summary: rollup + sass + typescript와 webpack + sass + typescript를 사용할 수 있도록 Svelte 프로젝트를 구성하는 방법을 이야기합니다.
---

**Outdate 되었습니다. 최신 내용은 [[Svelte] Svelte + TS + SCSS + α](/tech/svelte/svelte-ts-scss/)에 포스팅 되었습니다.**

이번 포스트에서는 rollup + sass + typescript와 webpack + sass + typescript를 사용할 수 있도록 Svelte 프로젝트를 구성하는 방법을 이야기합니다. 현재 Svelte(v3.18.0)는 typescript를 공식 지원을 하지 않습니다.

## Quick Start Guide
Svelte 공식 문서에서 Svelte 프로젝트를 빠르게 만들 수 있는 2가지 방법(REPL과 digit)을 이야기합니다. REPL, digit으로 프로젝트를 만들수 있는 방법을 이야기하도록 하겠습니다. 자세한 내용은 [quickstart guide](https://svelte.dev/blog/the-easiest-way-to-get-started)를 참고 바랍니다.

### REPL 사용
[REPL(Real Eval Print Loop)](https://ko.wikipedia.org/wiki/REPL)이란 사용자의 입력을 받아 실행하고 결과를 사용자에게 보여주는 프로그래밍 환경을 말합니다.

[Svelte 소개](/tech/svelte/introduction-svelte)에서 이야기한 것처럼 Svelte는 빌드 타임에 반응형이 결정됩니다. 이런 특징은 런타임 동안에 변경사항을 찾아야 하는 오버헤드를 줄여 속도를 개선하는 장점이 있지만, CDN 등으로 Svelte를 사용할 수 없는 단점도 있습니다. CDN으로 Svelte를 사용할 수 없어서 CodePen 등의 웹 IDE를 사용할 수 없습니다. Svelte는 이런 단점을 보완하기 위해 자체적으로 REPL을 제공하는 것으로 보입니다.

[Svelte REPL](https://svelte.dev/repl/hello-world?version=3.18.1)에서 코딩한 후 코딩한 프로젝트를 다운로드할 수 있습니다. `svelte-app.zip`으로 다운로드되는데, 파일의 압축을 풀고 아래와 같이 프로젝트를 실행할 수 있습니다.

```bash
cd /path/to/svelte-app
npm install
npm run dev
```

이 방법을 사용하면 rollup 번들러(bundler)를 사용한 프로젝트가 만들어집니다.

### digit 사용
digit를 사용하여 프로젝트를 만들 수 있습니다. Svelte는 template와 template-webpack 두 가지 템플릿 프로젝트를 제공합니다.

#### template
[sveltejs/template](https://github.com/sveltejs/template)은  rollup 번들러를 사용하는 템플릿입니다. 템플릿을 다운로드 하는 방법은,

```bash
npx degit sveltejs/template my-svelte-project
## or download and extract this .zip file
cd my-svelte-project

npm install
npm run dev
```

위의 코드와 같이 rollup 번들러를 사용하는 템플릿을 다운로드할 수 있습니다. 이 방법을 사용하면 [sveltejs/template](https://github.com/sveltejs/template)에 올라와 있는 프로젝트가 만들어집니다.

#### webpack template
[sveltejs/template-webpack](https://github.com/sveltejs/template-webpack)은 webpack을 사용하는 템플릿입니다. 템플릿을 다운로드하는 방법은,

```bash
npx degit sveltejs/template-webpack my-svelte-project
## or download and extract this .zip file
cd my-svelte-project

npm install
npm run dev
```

위의 코드와 같이 webpack 번들러를 사용하는 템플릿을 다운로드할 수 있습니다. 이 방법을 사용하면 [sveltejs/template-webpack](https://github.com/sveltejs/template-webpack)에 올라와 있는 프로젝트가 만들어집니다.

#### 프로젝트 구성 커스터마이징
[sveltejs/template](https://github.com/sveltejs/template)(혹은 [sveltejs/template-webpack](https://github.com/sveltejs/template-webpack))의 깃허브(github) 레파지토리(repository)를 포크(fork) 하여 커스터마이징 한다면,

```bash
npx degit your-name/template my-new-project
```

위의 코드로 커스터마이징한 프로젝트 구성으로 손 쉽게 프로젝트를 만들 수 있습니다.

## svelte-preprocess
Svelte의 `svelte.preprocess`를 사용하면 sass, typescript 등의 전처리기를 사용할 수 있습니다. `svelte-preprocess`는 sass, typescript를 사용할 수 있게 `svelte.preprocess` 설정을 미리 해 놓은 오픈 소스입니다. `svelte-preprocess`를 사용하여 sass와 typescript 설정을 해보도록 하겠습니다.

### rollup
rollup 번들러를 사용하는 [sveltejs/template](https://github.com/sveltejs/template) 템플릿에 sass와 typescript를 사용하기 위한 설정 방법을 이야기하도록 하겠습니다.

#### 모듈 다운로드

##### 1. template 다운로드
템플릿 프로젝트를 다운로드합니다.

```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
```

##### 2. `svelte-preprocess` 다운로드
그 후에 사용할 `svelte-preprocess`를 다운로드합니다.

```bash
npm install -D svelte-preprocess
```

##### 3. sass 다운로드
sass 전처리기를 아래 코드와 같이 다운로드합니다.

```bash
npm install -D node-sass
## or npm install -D sass
```

##### 4. typescript 다운로드
typescript 전처리기를 아래 코드와 같이 다운로드합니다.

```bash
npm install -D typescript
```

#### 설정

##### 1. svelte-preprocess 설정
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

##### 2. VS Code 설정
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

#### sass, typescript 사용 방법
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

### webpack
webpack 번들러를 사용하는 [sveltejs/template-webpack](https://github.com/sveltejs/template-webpack) 템플릿에 sass와 typescript를 사용하기 위한 설정 방법을 이야기하도록 하겠습니다.

#### 모듈 다운로드

##### 1. template-webpack 다운로드
템플릿 프로젝트를 다운로드합니다.

```bash
npx degit sveltejs/template-webpack my-svelte-project
cd my-svelte-project
```

##### 2. `svelte-preprocess` 다운로드
그 후에 사용 할 `svelte-preprocess`를 다운로드합니다.

```bash
npm install -D svelte-preprocess
```

##### 3. sass 다운로드
sass 다운로드는 template와 동일합니다.

```bash
npm install -D node-sass
## or npm install -D sass
```

##### 4. typescript 다운로드
typescript 다운로드는 template와 동일합니다.

```bash
npm install -D typescript
```

#### 설정

##### 1. svelte-preprocess 설정
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

##### 2. VS Code 설정
VS Code에서 사용하기 위한 설정 방법은 rollup 번들러와 동일합니다. 프로젝트의 루트에 `svelte.config.js`를 만들고 해당 파일에 설정들을 선언해야 합니다.

#### sass, typescript 사용 방법
sass와 typescript를 사용하는 방법도 rollup 번들러와 동일합니다.

## SASS
`svelte-preprecess`를 사용하면 `.svelte` 파일 내에 `<style lang="scss">`와 같이 사용할 수 있습니다. 이번에는 `.svelte` 파일 외의 파일에서 `.scss` 파일을 `import` 하는 방법을 살펴보도록 하겠습니다.

### rollup
rollup에서 sass를 `import` 하는 방법을 살펴보도록 하겠습니다.

#### 모듈 다운로드

##### 1. rollup-plugin-scss 다운로드
scss 파일을 `import` 할 수 있게 하는 플러그인을 다운로드합니다.

```bash
npm install -D rollup-plugin-scss
```

#### 설정

##### 1. rollup.config.js 설정
아래와 같이 rollup.config.js를 수정합니다.

```js
// rollup.config.js
//....
import scss from 'rollup-plugin-scss';
// ...

export default {
  // ...
  plugins: [
    // ...
    scss(),
    // ...
  ],
  // ...
};
// ...
```

#### sass `import` 하기
위의 설정이 끝났다면, 아래와 같이 scss 파일을 `import` 할 수 있습니다.

```js
// main.js
import './assets/scss/common.scss';
import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

export default app;
```

### webpack
webpack에서 sass를 `import` 하는 방법을 살펴보도록 하겠습니다.

#### 모듈 다운로드

##### 1. sass-loader 다운로드
scss 파일을 `import` 할 수 있게 하는 로더를 다운로드합니다.

```bash
npm install -D sass-loader
```

#### 설정

##### 1. webpack.config.js 설정
아래와 같이 webpack.config.js을 수정합니다.

```js
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // ...
    ]
  },
  // ...
};
```

#### sass `import` 하기
scss 파일을 `import` 하는 방법은 rollup과 같습니다.

## TypeScript
`svelte-preprecess`를 사용하면 `.svelte` 파일 내에 `<script lang="ts">`와 같이 사용할 수 있습니다. 이번에는 타입스크립트 파일을 만들어 타입스크립트를 사용하는 방법을 살펴보도록 하겠습니다.

### rollup
rollup에서 타입스크립트 파일을 사용하는 방법을 살펴보도록 하겠습니다.

#### 모듈 다운로드

##### 1. rollup-plugin-typescript 다운로드
타입스크립트를 사용할 수 있게 하는 플러그인을 다운로드합니다.

```bash
npm install -D rollup-plugin-typescript
```

혹시 타입스크립트를 다운로드 하지 않았다면 아래와 같이 타입스크립트를 다운로드합니다.

```bash
npm install -D typescript
```

#### 설정

##### 1. rollup.config.js 설정
아래와 같이 rollup.config.js를 수정합니다.

```js
// rollup.config.js
//....
import typescript from 'rollup-plugin-typescript';
// ...

export default {
  // ...
  plugins: [
    // ...
    typescript(),
    // ...
  ],
  // ...
};
// ...
```

##### 2. svelte.config.js 설정
아래와 같이 svelte.config.js를 수정합니다.

```js
// ...
export default {
  preprocess: sveltePreprocess({
    // ...svelte-preprocess options
    typescript: {
      tsconfigFile: './tsconfig.json'
    }
  }),
  // ...
};
```

위와 같이 설정하지 않아도 정상 동작을 합니다. 혹시 `.svelte` 파일 내에 사용하는 타입스크립트와 `.ts` 파일 간의 설정에 차이가 존재할 수 있어 같은 설정 파일을 참고하도록 설정하였습니다.

##### 3. tsconfig.json 설정
타입스크립트 설정을 담고 있는 `tsconfig.json`를 프로젝트 루트에 생성합니다.

```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules/*"],
  "compilerOptions": {
    "outDir": "./dist/",
    "target": "ESNEXT",
    "module": "ESNEXT",
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

##### 4. main.js -> main.ts로 변경
`main.js` 파일을 `main.ts`로 이름을 변경합니다. 코드 에러가 발생한다면 `main.js` 내의 자바스크립트 코드를 타입스크립트로 변경해야 합니다.

##### 5. svelte.d.ts 생성
`.svelte` 파일을 `import` 할 때, 타입스크립트 에러가 발생하기 때문에 아래와 같이 `src/@types` 위치에 `svelte.d.ts`를 만들어줍니다.

```ts
// src/@types/svelte.d.ts
declare module "*.svelte" {
  interface ComponentOptions {
    target: HTMLElement;
    anchor?: HTMLElement | null;
    props?: {};
    hydrate?: boolean;
    intro?: boolean;
  }

  interface Component {
    new (options: ComponentOptions): any;
    // client-side methods
    $set(props: {}): void;
    $on(event: string, callback: (event: CustomEvent) => void): void;
    $destroy(): void;

    // server-side methods
    render(props?: {}): {
      html: string;
      css: { code: string; map: string | null };
      head?: string;
    };
  }

  const component: Component;
  export default component;
}
```

### webpack
webpack에서 타입스크립트 파일을 사용하는 방법을 살펴보도록 하겠습니다.

#### 모듈 다운로드

##### 1. ts-loader 다운로드
타입스크립트를 사용할 수 있게 하는 로더를 다운로드합니다.

```bash
npm install -D ts-loader
```

혹시 타입스크립트를 다운로드 하지 않았다면 아래와 같이 타입스크립트를 다운로드합니다.

```bash
npm install -D typescript
```

#### 설정

##### 1. webpack.config.js 설정
아래와 같이 webpack.config.js를 수정합니다.

```js
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // ...
    ]
  },
  // ...
};
```

##### 2. svelte.config.js 설정
rollup과 설정이 동일합니다.

```js
// ...
export default {
  preprocess: sveltePreprocess({
    // ...svelte-preprocess options
    typescript: {
      tsconfigFile: './tsconfig.json'
    }
  }),
  // ...
};
```

##### 3. tsconfig.json 설정
rollup과 설정이 같습니다.
```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules/*"],
  "compilerOptions": {
    "outDir": "./dist/",
    "target": "ESNEXT",
    "module": "ESNEXT",
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

##### 4. main.js -> main.ts로 변경
rollup과 설정이 같습니다.

##### 5. svelte.d.ts 생성
rollup과 설정이 같습니다.

```ts
// src/@types/svelte.d.ts
declare module "*.svelte" {
  interface ComponentOptions {
    target: HTMLElement;
    anchor?: HTMLElement | null;
    props?: {};
    hydrate?: boolean;
    intro?: boolean;
  }

  interface Component {
    new (options: ComponentOptions): any;
    // client-side methods
    $set(props: {}): void;
    $on(event: string, callback: (event: CustomEvent) => void): void;
    $destroy(): void;

    // server-side methods
    render(props?: {}): {
      html: string;
      css: { code: string; map: string | null };
      head?: string;
    };
  }

  const component: Component;
  export default component;
}
```

## beomy/template
[sveltejs/template](https://github.com/sveltejs/template)에 sass와 typescript를 추가하여 커스터마이징한 프로젝트 구성을 [beomy/template](https://github.com/beomy/template)에 업로드하였습니다. 쉽게 프로젝트를 구성하는 방법은,

```bash
npx degit beomy/template my-svelte-project
```

위의 코드를 사용하여 rollup + sass + typescript의 프로젝트를 쉽게 구성할 수 있습니다.

## beomy/template-webpack
[sveltejs/template-webpack](https://github.com/sveltejs/template-webpack)에 sass와 typescript를 추가하여 커스터마이징한 프로젝트 구성을 [beomy/template-webpack](https://github.com/beomy/template-webpack)에 업로드하였습니다. 쉽게 프로젝트를 구성하는 방법은,

```bash
npx degit beomy/template-webpack my-svelte-project
```

위의 코드를 사용하여 webpack + sass + typescript의 프로젝트를 쉽게 구성할 수 있습니다.

## 개선사항
지금까지 sass와 typescript를 사용할 수 있도록 프로젝트를 구성하면서 몇 가지 추가되었으면 좋겠다 생각이 드는 부분이 있습니다.

- `d.ts`로 타입을 만든 후 `.svelte` 내에서 생성한 타입을 사용하면 타입스크립트 에러가 발생합니다. 생성한 타입을 `.ts` 파일에서 사용하면 에러가 발생하지 않습니다. Svelte에서 타입스크립트를 지원하지 않아 발생한 문제인지, 다른 원인으로 발생하는지 파악하지 못했습니다.
- `$: 변수 = ...`나 `svelte/store`의 `$스토어명`과 같은 Svelte만의 독특한 문법이 있습니다. 타입스크립트에서 이런 문법은 에러로 잡아내는 문제가 있습니다.
- Svelte의 템플릿 프로젝트 구조에는 eslint와 같은 정적 코드 분석 툴이 빠져 있습니다. 템플릿 프로젝트에 eslint가 추가되면 좋을 것 같습니다.

![lint 에러](/assets/img/posts/svelte/lint_error.png)

##### 참고
- [https://www.npmjs.com/package/svelte-preprocess](https://www.npmjs.com/package/svelte-preprocess)
- [https://svelte.dev/blog/the-easiest-way-to-get-started](https://svelte.dev/blog/the-easiest-way-to-get-started)
