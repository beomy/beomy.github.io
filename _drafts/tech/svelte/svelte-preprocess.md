---
layout: post
title: '[Svelte] Svelte 전처리기 사용하기'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: svelte-preprocess가 Svelte 공식 지원으로 편입되었습니다.
---
{% include toc.html %}

전처리를 해주는 `svelte-preprocess`가 Svelte 공식 지원 라이브러리로 편입되면서, Svelte가 TypeScript를 공식 지원하게 되었습니다. 이번 포스트에서는 Rollup, Webpack 번들러에서 `svelte-preprocess`를 사용해서 Svelte에 TypeScript와 SCSS, 몇가지 유용한 가능을 적용하는 방법을 살펴보도록 하겠습니다.

# Rollup
Rollup 번들러를 사용해서 Svelte에 TypeScript와 SCSS를 사용할 수 있도록 설정해 보도록 하겠습니다. 아래 코드와 같이 Svelte에서 제공하는 [sveltejs/template](https://github.com/sveltejs/template) 템플릿을 다운로하고 `setupTypeScript` 파일을 실행 후 패키지를 다운로드합니다.

```bash
npx degit sveltejs/template svelte-typescript-app
cd svelte-typescript-app
node scripts/setupTypeScript.js
npm install
```

## `svelte.config.js` 생성
`node scripts/setupTypeScript.js`를 실행하면 TypeScript가 적용된 템플릿으로 변경됩니다.
~~~`rollup.config.js`의 svelte 옵션을 `svelte.config.js`로 이동~~~

## TypeScript 설정
`rollup.config.js` 파일의 `sveltePreprocess` 함수에 `sourceMap` 설정을 추가해서 디버깅에 용이하게 조금만 변경하도록 하겠습니다.

```js
//...
    svelte({
      //...
      preprocess: sveltePreprocess({
        sourceMap: !production
      }),
    }),
//...
};
```

## SCSS 설정
scss를 사용할 수 있도록 아래 코드와 같이 패키지를 다운로드합니다.

```bash
npm i -D sass rollup-plugin-scss
```

패키지 다운로드가 끝나면, `rollup.config.js`를 아래와 같이 변경합니다.

```js
//...
import scss from 'rollup-plugin-scss';

export default {
    //...
    typescript({ sourceMap: !production }),
    scss({
      output: 'public/build/assets.css'
    }),
    //...
};
```

위에 코드와 같이 설정이 끝나면 아래와 같이 `main.ts`에서 SCSS 파일 `import`가 가능해집니다.

```ts
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

이렇게 `import`된 SCSS 파일은 `public/build/assets.css` 파일로 번들되는데, `public/index.html` 파일에서 아래와 같이 번들된 CSS 파일을 가져와야 합니다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width,initial-scale=1'>

  <title>Svelte app</title>

  <link rel='icon' type='image/png' href='/favicon.png'>
  <link rel='stylesheet' href='/global.css'>
  <link rel='stylesheet' href='/build/assets.css'> <!-- 추가되야 합니다. -->
  <link rel='stylesheet' href='/build/bundle.css'>

  <script defer src='/build/bundle.js'></script>
</head>

<body>
</body>
</html>
```

### `prependData` 설정
SCSS 변수들을 `@import` 해서 사용해야 할 때, `prependData`를 사용하면 컴포넌트에서 `@import`를 사용하지 않아도 SCSS 변수를 가져와 사용할 수 있습니다. 아래와 같이 `prependData`를 사용할 수 있습니다.

## PostCSS 설정

### `autoprefixer` 설정

## Alias 설정

## TS, SCSS 사용하기

# Webpack

## `svelte.config.js` 생성

## TypeScript 설정

## SCSS 설정

### `prependData` 설정

## PostCSS 설정

### `autoprefixer` 설정

## Alias 설정

## TS, SCSS 사용하기

# 부록: 템플릿

`beomy/template`, `beomy/template-webpack`

#### 참고
- [https://svelte.dev/blog/svelte-and-typescript](https://svelte.dev/blog/svelte-and-typescript)
- [https://github.com/sveltejs/svelte-preprocess](https://github.com/sveltejs/svelte-preprocess)
- [https://github.com/sveltejs/svelte-preprocess/blob/master/docs/getting-started.md](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/getting-started.md)
- [https://github.com/sveltejs/svelte-preprocess/blob/master/docs/preprocessing.md](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/preprocessing.md)
- [https://github.com/sveltejs/svelte-preprocess/blob/master/docs/usage.md](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/usage.md)
- [https://github.com/sveltejs/svelte-preprocess/blob/master/docs/migration-guide.md](https://github.com/sveltejs/svelte-preprocess/blob/master/docs/migration-guide.md)