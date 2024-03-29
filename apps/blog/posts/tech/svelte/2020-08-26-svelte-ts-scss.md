---
layout: post
title: '[Svelte] Svelte + TS + SCSS + α'
featured-img: svelte/svelte.png
height-img: 200px
category: [tech, svelte]
summary: Svelte + TS + SCSS 구조의 프로젝트를 만들어보도록 하겠습니다.
---

전처리를 해주는 `svelte-preprocess`가 Svelte 공식 지원 라이브러리로 편입되면서, Svelte가 TypeScript를 공식 지원하게 되었습니다. 이번 포스트에서는 Rollup, Webpack 번들러에서 `svelte-preprocess`를 사용해서 Svelte에 TypeScript와 SCSS, autoprefixer, alias 가능을 적용한 프로젝트를 생성하는 방법을 살펴보도록 하겠습니다.

## Rollup
Rollup 번들러를 사용해서 Svelte에 TypeScript와 SCSS, autoprefixer, alias를 사용할 수 있도록 설정해 보도록 하겠습니다. 아래 코드와 같이 Svelte에서 제공하는 [sveltejs/template](https://github.com/sveltejs/template) 템플릿을 다운로드하고 `setupTypeScript` 파일을 실행 후 패키지를 다운로드합니다.

```bash
npx degit sveltejs/template svelte-typescript-app
cd svelte-typescript-app
node scripts/setupTypeScript.js
npm install
```

### `svelte.config.js` 생성
VS Code를 사용할 경우 프로젝트 루트에 `svelte.config.js` 파일을 생성해 주지 않으면 아래 그림과 같은 에러가 발생합니다.

![VS Code Error](/assets/img/posts/svelte/vs_code_ts_error.png)

`rollup.config.js`의 svelte 옵션을 `svelte.config.js` 파일을 만들고 해당 파일에 아래와 같이 옮겨 적어 줍니다.

```js
// svelte.config.js
const sveltePreprocess = require('svelte-preprocess');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  preprocess: sveltePreprocess({ sourceMap: !production }),
  compilerOptions: {
    // enable run-time checks when not in production
    dev: !production
  }
};
```

`rollup.config.js`는 svelte 옵션을 아래와 같이 가져와 사용합니다.

```js
// rollup.config.js
//...
export default {
  //...
  plugins: [
    svelte(require('./svelte.config')),
    //...
  ],
  //...
};
```

### TypeScript 설정
`node scripts/setupTypeScript.js`를 실행하면 TypeScript가 적용된 템플릿으로 변경됩니다.

#### TypeScript 사용
위의 코드와 같이 설정이 끝나면 아래와 같이 TypeScript 사용이 가능해집니다.

```html
<!-- App.svelte -->
<script lang="ts"> // lang="ts"를 선언한 <script>에서 TypeScript를 사용할 수 있습니다.
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
```

### SCSS 설정
scss를 사용할 수 있도록 아래 코드와 같이 패키지를 다운로드합니다.

```bash
npm i -D sass rollup-plugin-scss
```

#### 컴포넌트 스타일 태그에서 SCSS 사용하기
`sass` 패키지를 다운로드하면 아래 코드와 같이 컴포넌트의 스타일 태그 안에서 SCSS를 사용할 수 있습니다.

```html
<script lang="ts">
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
  main {
    /* ... */
    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
  }
  /* ... */
</style>
```

#### 소스코드에서 SCSS 파일 `import`하기
`sass` 패키지를 다운로드 한 후 `svelte-preprocess`를 사용하면 Svelte 컴포넌트에서 `<style lang="scss">`를 사용해서 SCSS를 사용할 수 있지만, `.scss` 파일을 `import`하여 스타일을 적용할 수는 없습니다. 소스코드에서 SCSS 파일을 `import`할 수 있도록 설정해 보도록 하겠습니다. `rollup.config.js`를 아래와 같이 수정합니다.

```js
// rollup.config.js
//...
import scss from 'rollup-plugin-scss';

export default {
  plugins: [
    //...
    scss({
      output: 'public/build/assets.css'
    }),
    //...
  ]
};
```

`import`된 SCSS 파일은 `public/build/assets.css` 파일로 번들 되는데, `public/index.html` 파일에서 아래와 같이 번들 된 CSS 파일을 가져와야 합니다.

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width,initial-scale=1'>

  <title>Svelte app</title>

  <link rel='icon' type='image/png' href='/favicon.png'>
  <link rel='stylesheet' href='/global.css'>
  <link rel='stylesheet' href='/build/assets.css'> <!-- CSS 우선순위에 유의해서 선언 위치를 정해줍니다. -->
  <link rel='stylesheet' href='/build/bundle.css'>

  <script defer src='/build/bundle.js'></script>
</head>

<body>
</body>
</html>
```

위에 코드와 같이 설정이 끝나면 아래와 같이 `main.ts`에서 SCSS 파일 `import`가 가능해집니다.

```scss
// src/assets/scss/common.scss
main {
  p {
    font-size: 2em;
  }
}
```

```ts
// src/main.ts
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

#### `prependData` 설정
SCSS 파일에 정의된 스타일이나 변수들을 컴포넌트의 `<style>`에서 `@import` 해서 사용해야 할 때, `prependData`를 사용하면 컴포넌트의 `<style>`에서 `@import`를 사용하지 않고 SCSS 변수를 가져와 사용할 수 있습니다. 아래와 같이 `svelte.config.js` 파일에서 `prependData`를 정의할 수 있습니다.

```js
// svelte.config.js
//...
module.exports = {
  //...
  preprocess: sveltePreprocess({
    //...
    scss: {
      prependData: `@import "src/assets/scss/variables.scss";`
    }
  }),
}
```

위의 설정이 끝나면, 아래와 같이 SCSS 변수 사용이 가능합니다.

```scss
/* src/assets/scss/variables.scss */
$primary-color: #ff3e00;
```

```html
<!-- App.svelte -->
<script lang="ts">
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
  /* ... */
  main {
    /* ... */
    h1 {
      color: $primary-color; /* SCSS 변수 사용이 가능해집니다. */
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
  }
  /* ... */
</style>
```

### PostCSS 설정
자동 접두사를 사용하기 위해서 PostCSS를 사용해야 합니다. 아래 코드와 같이 `postcss`와 `autoprefixer` 패키지를 다운로드합니다.

```bash
npm i -D postcss autoprefixer
```

#### 컴포넌트의 스타일에 `autoprefixer` 설정
`svelte.config.js` 파일에서 아래와 같이 `autoprefixer`를 설정해 줍니다.

```js
// svelte.config.js
const sveltePreprocess = require('svelte-preprocess');
const autoprefixer = require('autoprefixer');

//...
module.exports = {
  preprocess: sveltePreprocess({
    //...
    postcss: {
      plugins: [autoprefixer()]
    }
  }),
  //...
};
```

위의 설정이 끝나면 아래 코드와 같이 정의된 스타일이,

```html
<script lang="ts">
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
  /* ... */
  main {
    /* ... */
    h1 {
      user-select: none;
      /* ... */
    }
  }
  /* ... */
</style>
```

아래 그림처럼 `-webkit-`, `-moz-`, `-ms-` 등, 브라우저 밴더 접두사가 추가됩니다.

![autoprefixer](/assets/img/posts/svelte/autoprefixer.png)

#### SCSS 파일에 `autoprefixer` 설정
`rollup.config.js`에 아래 코드와 같이 `scss`에 `processor` 옵션을 사용해 줍니다.

```js
// rollup.config.js
//...
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    //...
    scss({
      output: 'public/build/assets.css',
      processor: css => postcss([autoprefixer])
        .process(css)
        .then(result => result.css)
    }),
    //...
  ]
};
```

위의 설정이 끝나면 아래 코드와 같이 정의된 스타일이,

```scss
main {
  p {
    font-size: 2em;
    user-select: none;
  }
}
```

아래 그림처럼 `-webkit-`, `-moz-`, `-ms-` 등, 브라우저 밴더 접두사가 추가됩니다.

![autoprefixer](/assets/img/posts/svelte/autoprefixer_scss.png)

### Alias 설정
컴포넌트를 만들고 사용하다 보면 `import comp from '../../components/Item.svelte'` 와 같이 상대 경로로 `import`하게 됩니다. `import`를 사용하는 컴포넌트 파일의 경로가 변경되면 `import`한 경로를 모두 바꿔줘야 하는데, 이런 귀찮은 작업을 Alias를 사용하면 최소화할 수 있습니다.

아래 코드와 같이 패키지를 다운로드합니다.

```bash
npm i -D @rollup/plugin-alias
```

패키지 다운로드가 끝나면,`rollup.config.js` 파일을 아래 코드와 같이 수정합니다.

```js
// rollup.config.js
//...
import alias from '@rollup/plugin-alias';
import path from 'path';
//...

export default {
  //...
  plugins: [
    //...
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    }),
    //...
};
```

Alias를 사용해서 TypeScript 파일에서 TypeScript 파일을 `import` 하기 위해서는 아래 코드와 같이 `tsconfig.json` 파일을 수정해야 합니다.

```json
// tsconfig.json
{
  //...
  "compilerOptions": {
    "baseUrl": "./",
    "paths": { "@/*": ["src/*"] }
  }
}
```

위의 설정이 끝나면, 아래 코드와 같이 alias를 사용할 수 있습니다. `src` 디렉토리 위치를 `@`로 대체한 예제입니다.

```ts
// main.ts
import '@/assets/scss/common.scss';
import App from '@/App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

export default app;
```

## Webpack
Webpack 번들러를 사용해서 Svelte에 TypeScript와 SCSS, autoprefixer, alias를 사용할 수 있도록 설정해 보도록 하겠습니다. 아래 코드와 같이 Svelte에서 제공하는 [sveltejs/template-webpack](https://github.com/sveltejs/template-webpack) 템플릿을 다운로드하고 패키지를 다운로드하고 `setupTypeScript` 파일을 실행 후 패키지를 다운로드합니다.

```bash
npx degit sveltejs/template svelte-typescript-app
cd svelte-typescript-app
node scripts/setupTypeScript.js
npm install
```

### `svelte.config.js` 생성
Rollup 번들러와 동일한 이유로 파일을 프로젝트 루트에 `svelte.config.js` 파일을 만들고, `webpack.config.js`의 `svelte-loader` 옵션을 옮겨 적어 줍니다.

```js
// svelte.config.js
const sveltePreprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  compilerOptions: {
    dev: !prod
  },
  emitCss: prod,
  hotReload: !prod,
  preprocess: sveltePreprocess({ sourceMap: !prod })
}
```

`webpack.config.js`는 svelte 옵션을 아래와 같이 가져와 사용합니다.

```js
// webpack.config.js
//...
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: require('./svelte.config')
        }
      },
      //...
    ]
  },
  //...
};
```

### TypeScript 설정
`node scripts/setupTypeScript.js`를 실행하면 TypeScript가 적용된 템플릿으로 변경됩니다.

#### TypeScript 사용
위의 코드와 같이 설정이 끝나면 아래와 같이 TypeScript 사용이 가능해집니다.

```html
<!-- App.svelte -->
<script lang="ts"> // lang="ts"를 선언한 <script>에서 TypeScript를 사용할 수 있습니다.
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
```

### SCSS 설정
scss를 사용할 수 있도록 아래 코드와 같이 패키지를 다운로드합니다.

```bash
npm i -D sass sass-loader
```

#### 컴포넌트 스타일 태그에서 SCSS 사용하기
`sass` 패키지를 다운로드하면 아래 코드와 같이 컴포넌트의 스타일 태그 안에서 SCSS를 사용할 수 있습니다.

```html
<script lang="ts">
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
  main {
    /* ... */
    h1 {
      color: #ff3e00;
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
  }
  /* ... */
</style>
```

#### 소스코드에서 SCSS 파일 `import`하기
Webpack 번들러에서도 소스코드에서 SCSS 파일을 `import`할 수 있도록 설정해 보도록 하겠습니다. `webpack.config.js`에서 `css-loader`를 사용하는 부분을 아래와 같이 수정합니다.

```js
// webpack.config.js
//...

module.exports = {
  //...
  module: {
    rules: [
      //...
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      //...

    ]
  },
  //...
};
```

위의 코드와 같이 설정이 끝나면 아래와 같이 `main.ts`에서 SCSS 파일 `import`가 가능해집니다.

```scss
// src/assets/scss/common.scss
main {
  p {
    font-size: 2em;
  }
}
```

```ts
// src/main.ts
import './global.css';
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

#### `prependData` 설정
`prependData`를 설정하는 방법은 Rollup과 동일합니다. `svelte.config.js` 파일을 아래와 같이 수정합니다.

```js
// svelte.config.js
//...
module.exports = {
  //...
  preprocess: sveltePreprocess({
    //...
    scss: {
      prependData: `@import "src/assets/scss/variables.scss";`
    },
    //...
  })
}
```

위의 설정이 끝나면, 아래와 같이 SCSS 변수 사용이 가능합니다.

```scss
/* src/assets/scss/variables.scss */
$primary-color: #ff3e00;
```

```html
<!-- App.svelte -->
<script lang="ts">
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
  /* ... */
  main {
    /* ... */
    h1 {
      color: $primary-color; /* SCSS 변수 사용이 가능해집니다. */
      text-transform: uppercase;
      font-size: 4em;
      font-weight: 100;
    }
  }
  /* ... */
</style>
```

### PostCSS 설정
`postcss`와 `autoprefixer`, `postcss-loader` 패키지를 다운로드합니다.

```bash
npm i -D postcss autoprefixer postcss-loader
```

#### 컴포넌트의 스타일에 `autoprefixer` 설정
`svelte.config.js` 파일에서 아래와 같이 `autoprefixer`를 설정해 줍니다.

```js
// svelte.config.js
//...
const autoprefixer = require('autoprefixer');
//...
module.exports = {
  //...
  preprocess: sveltePreprocess({
    //...
    postcss: {
      plugins: [autoprefixer()]
    }
  })
}
```

위의 설정이 끝나면 아래 코드와 같이 정의된 스타일이,

```html
<script lang="ts">
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
  /* ... */
  main {
    /* ... */
    h1 {
      user-select: none;
      /* ... */
    }
  }
  /* ... */
</style>
```

아래 그림처럼 `-webkit-`, `-moz-`, `-ms-` 등, 브라우저 밴더 접두사가 추가됩니다.

![autoprefixer](/assets/img/posts/svelte/autoprefixer.png)

#### SCSS 파일에 `autoprefixer` 설정
`webpack.config.js`에 아래 코드와 같이 `postcss-loader`를 사용해 줍니다.

```js
// webpack.config.js
//...

module.exports = {
  //...
  module: {
    rules: [
      //...
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer'
                ]
              }
            }
          }
        ]
      },
      //...

    ]
  },
  //...
};
```

위의 설정이 끝나면 아래 코드와 같이 정의된 스타일이,

```scss
main {
  p {
    font-size: 2em;
    user-select: none;
  }
}
```

아래 그림처럼 `-webkit-`, `-moz-`, `-ms-` 등, 브라우저 밴더 접두사가 추가됩니다.

![autoprefixer](/assets/img/posts/svelte/autoprefixer_scss.png)

### Alias 설정
Alias를 사용하기 위해 `webpack.config.js` 파일을 아래 코드와 같이 수정합니다.

```js
// webpack.config.js
//...
module.exports = {
  //...
  resolve: {
    alias: {
      //...
      '@': path.resolve(__dirname, 'src')
    },
    //...
  },
  //...
};
```

Rollup과 동일하게 `tsconfig.json` 파일을 아래와 같이 수정해야 합니다.

```json
// tsconfig.json
{
  //...
  "compilerOptions": {
    "baseUrl": "./",
    "paths": { "@/*": ["src/*"] }
  }
}
```

위의 설정이 끝나면, 아래 코드와 같이 alias를 사용할 수 있습니다. `src` 디렉토리 위치를 `@`로 대체한 예제입니다.

```ts
// main.ts
import '@/global.css';
import '@/assets/scss/common.scss';

import App from '@/App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

export default app;
```

## 부록: 템플릿
지금까지 이야기했던 설정을 추가해서 Rollup 템플릿과 Webpack 템플릿을 만들었습니다.

### `beomy/template`
아래 명령어를 사용하여 Svelte + TS + SCSS + α(`rollup`, `autoprefixer`, `alias`)를 사용할 수 있는 프로젝트 보일러 플레이트를 만들 수 있습니다.

```bash
npx degit beomy/template my-svelte-project
```

### `beomy/template-webpack`
아래 명령어를 사용하여 Svelte + TS + SCSS + α(`webpack`, `autoprefixer`, `alias`)를 사용할 수 있는 프로젝트 보일러 플레이트를 만들 수 있습니다.

```bash
npx degit beomy/template-webpack my-svelte-project
```

##### 참고
- [https://svelte.dev/blog/svelte-and-typescript](https://svelte.dev/blog/svelte-and-typescript)
- [https://github.com/sveltejs/svelte-preprocess](https://github.com/sveltejs/svelte-preprocess)
- [https://github.com/sveltejs/svelte-preprocess/blob/master/docs/getting-started.md](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/getting-started.md)
- [https://github.com/sveltejs/svelte-preprocess/blob/master/docs/preprocessing.md](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/preprocessing.md)
- [https://github.com/sveltejs/svelte-preprocess/blob/master/docs/usage.md](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/usage.md)
- [https://github.com/sveltejs/svelte-preprocess/blob/master/docs/migration-guide.md](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/migration-guide.md)
