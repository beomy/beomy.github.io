---
layout: post
title: '[ETC] Vue에 Typescript 적용하기?'
featured-img: javascript/js.png
category: [tech, etc]
---

# `package.json`
타입스크립트 적용을 위한 패키지 변경 내용입니다.

## `scripts`
아래 코드처럼 `scripts` 블록에 `postinstall`를 추가합니다.

```
"scripts": {
  "postinstall": "admin-script",
},
```

어드민의 경우 `admin-script`를 사용했습니다. `admin-script`를 설치하면 아래의 5가지 설정들이 생성 됩니다.

- `.editorconfig`
- `.eslintignore`
- `.eslintrc.js`
- `jest.config.js`
- `webpack.config.js`
- `test.setup.js`

## `dependencies`
아래 코드는 변경된 내용들만 작성하였습니다.

```
"dependencies": {
  "@newbiz/vue-maintainer-libs": "1.6.0",
  "core-js": "^3.4.4",
  "vue-class-component": "^7.0.2",
  "vue-property-decorator": "^8.3.0"
},
```

- `vue-maintainer-libs`: 버전업 되어 상위 버전 지원을 아직 적용하지 않아서, 1.6.0 버전으로 고정했습니다. 추후 상위 버전 지원 작업이 팔요합니다.
- `core-js`: 어드민에서는 사용하지 않았던 패키지로 추가되었습니다.
- `vue-class-component`, `vue-property-decorator`: vue에서 타입스크립트를 지원하기 위한 패키지입니다.

## `devDependencies`
아래 코드는 변경된 내용들만 작성하였습니다.

```
"devDependencies": {
  "@newbiz/admin-script-libs": "^0.5.0",
  "@vue/cli-plugin-babel": "^4.1.0",
  "@vue/cli-plugin-eslint": "^4.1.0",
  "@vue/cli-plugin-router": "^4.1.0",
  "@vue/cli-plugin-typescript": "^4.1.0",
  "@vue/cli-plugin-vuex": "^4.1.0",
  "@vue/cli-service": "^4.1.2",
  "@vue/eslint-config-typescript": "^4.0.0",
  "lint-staged": "^9.5.0",
  "node-sass": "^4.13.1",
  "sass-loader": "^8.0.2",
  "typescript": "~3.5.3",
},
```

- admin-script-libs: 설정 파일을 받는 패키지입니다.
- 위에 작성된 그 외의 패키지들은 최신 버전으로 수정하였습니다.

## `eslintConfig`, `jest`
`admin-script-libs`를 사용하면 몇가지 설정 파일이 생성되기 때문에, `package.json`에서 있는 `eslintConfig`, `jest`는 제거하였습니다.

# `tsconfig.js`
아래 코드와 같이 작성하였습니다. vue typescript 버전의 설정을 거의 그대로 가져왔습니다. 동일하게 다른 프로젝트에서 사용되어야 될 것으로 보입니다.

```
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "allowJs": true,
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "baseUrl": ".",
    "typeRoots": [
      "./node_modules/@types",
      "./src/@types"
    ],
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "public",
    "dist",
    ".git",
    ".idea"
  ]
}
```

- `allowJs`: 자바스크립트를 사용하도록 허용합니다. 기존의 프로젝트는 자바스크립트로 개발되었기 때문에 기존 프로젝트에 타입스크립트를 사용하기 위해서는 `true`로 설정되어야 합니다.
- `typeRoots`: 아래 코드와 같이 설정했습니다. `./node_modules/@types`의 기본 타입과, `./src/@types` 커스텀 정의 타입을 사용하기 위한 설정입니다.
```
"typeRoots": [
  "./node_modules/@types",
  "./src/@types"
],
```

# `vue.config.js`
최신 패키지를 적용하면서 `vue.config.js`가 많은 부분이 변경되었습니다. 중요한 내용만 작성하고 세부 변경 내용은 어드민 코드를 참조하는 것이 좋습니다.

## `css`
`@vue/cli-service`를 최신으로 설치하였다면, 아래와 코드와 같이 css 설정을 해야 합니다.

```
css: {
  loaderOptions: {
    css: {
      // css-loader
      sourceMap: false,
    },
    postcss: {
      // postcss-loader
      sourceMap: false,
    },
    sass: {
      // sass-loader
      sourceMap: false,
      prependData: `
        @import "@/assets/scss/composition/variables.scss";
      `.trim(),
    },
  },
},
```

- `modules`, `sourceMap`가 설정되어 있다면, 최신 버전에서는 제거해야 합니다.

## `chainWebpack`
```
chainWebpack: (config) => {
  config.output.filename('js/[name].[hash:8].js')
  config.output.chunkFilename('js/[name].[hash:8].js')
},
```

`config.output.chunkFilename('js/[name].[hash:8].js')`를 사용해야 합니다. 사용하지 않으면 `vue-router`로 청크된 컴포넌트들에 해시가 붙지 않아 캐시 문제가 발생합니다.

## `configureWebpack`
저도 정확히 이해하지 못한 몇가지 부분들이 변경되었습니다.. 그냥 어디가 변경 되었는지만 말씀드릴께요.

### 엔트리 분리 제거
아래 코드가 제거되었습니다.

```
// 엔트리 분리
config.entry = {
  ...config.entry,
  vendors: Object.keys(dependencies).filter(item => dependenciesExceptList.indexOf(item) === -1),
}
```

### import 경로에 /src를 기본 경로로 포함 제거
아래 코드가 제거되었습니다.

```
config.resolve.modules.unshift(appPath.src)
```

### `dotenvPlugin` 제거
`dotenvPlugin`을 제거하였습니다. 이 부분 제거에 따른 몇가지 수정이 필요합니다.

#### `.env`
`.env.*` 파일에서 `NODE_ENV` 부분을 제외한 모든 부분에 `VUE_APP_` 프리픽스를 추가해야 합니다.(예를 들어 `API_URI`는 `VUE_APP_API_URI`로 변경) `VUE_APP_`를 추가하지 않으면 런타임 동안에 읽어올 수가 없습니다. `NODE_ENV`는 빌드 될 때에만 사용하여 프리픽스를 추가하지 않았습니다.

`.env.*`에 정의된 변수를 사용하는 파일들을 찾아 모두 `VUE_APP_`를 붙여줘야 합니다.

# `main.js`에서 `main.ts`로 변경
`main.ts`가 없으면 `vue-router`, `vuex`에서 타입에러가 발생합니다. 타입스크립트 문법에 맞게 `main.ts`로 변경합니다.

`.vue` 파일을 `import`하는 경우 `import App from '@/App.vue'`로 확장자를 명시해 주어야 합니다.

# 커스텀 타입 정의
몇가지 필수 커스텀 타입을 정의해야 합니다. `src/@types`에 타입을 정의했습니다.

## index.d.ts
어드민에서는 window를 확장해서 사용했기 때문에 아래와 같이 확장한 변수들을 정의합니다.

```
import Vue from 'vue'

declare global {
  interface Window {
    app: Record<never, any> & Vue;
    ga: any;
    gtm: any;
  }
}
```

## vue.d.ts
vue를 확장하기 위해서는 아래와 같이 확장한 변수들을 정의해야 합니다.

```
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $env: any,
    $utils: any,
    $DATE_FORMAT: string,
    $DATETIME_FORMAT: string,
    $TIME_FORMAT: string
  }
}
```

## shims-vue.d.ts
VS Code에서 타입스크립트 에러 없이 사용하기 위해 정의하기 위한 파일입니다.

```
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

# 타입스크립트 사용하기
[https://joshua1988.github.io/vue-camp/ts/with-vue.html](https://joshua1988.github.io/vue-camp/ts/with-vue.html), [https://kr.vuejs.org/v2/guide/typescript.html](https://kr.vuejs.org/v2/guide/typescript.html) 참고 바랍니다.

## 방법 1
기존 코드를 타입스크립트로 변경하려면 가장 간단한 방법 입니다.

1. `<script>`에서 `<script lang="ts">` 변경
2. `export default { ... }`에서 `export default Vue.extend({ ... })` 변경, `Vue`를 `import` 해야 합니다.

## 방법 2
```
<template>
  <div>
    <h1>TypeScript with Vue</h1>
    <button @click="sayHi">say hi</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

// 데코레이터를 이용한 컴포넌트 정의
@Component
export default class App extends Vue {
  // data 속성
  message = 'hello';

  // methods 속성
  sayHi() {
    console.log(this.message);
  }
}
</script>
```