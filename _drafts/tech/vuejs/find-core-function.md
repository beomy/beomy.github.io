---
layout: post
title: '[Inside Vue] 2. 코어 함수 찾기'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이번 포스트를 읽기 전 [이전 포스트]({{ site.url }}/tech/vuejs/start-read-vue-code/)를 읽어 보시지 않았다면, 이전 포스트를 읽고 현재 포스트를 읽는 것을 추천드립니다.

# Vue 코어 살펴보기
[이전 포스트]({{ site.url }}/tech/vuejs/start-read-vue-code/)에서 `src/platforms/web/entry-runtime-with-compiler.js` 파일이 `import Vue from './runtime/index'`로 Vue를 import 하는 것을 확인 했습니다. 이번 포스트에서는 이 것을 힌트로 `src/platforms/web/runtime/index.js` 파일을 시작으로 Vue 코어를 살펴보도록 하겠습니다.

## `src/platforms/web/runtime/index.js`
```js
/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(() => {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue)
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        )
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        `You are running Vue in development mode.\n` +
        `Make sure to turn on production mode when deploying for production.\n` +
        `See more tips at https://vuejs.org/guide/deployment.html`
      )
    }
  }, 0)
}

export default Vue
```

`src/platforms/web/runtime/index.js`에서 하는 일들을 살펴보도록 하겠습니다.

- `Vue`를 import 합니다. `Vue`를 또 다시 import 하는 것에 주목합시다.
- `config`를 import 합니다.
- 유틸 함수들을 import 합니다.
- `patch`, `mountComponent`를 import 합니다.
- `platformDirectives`(directive들..), `platformComponents`(component 들..)을 import 합니다.
- 특정한 플랫폼 유틸들을 install 합니다.(`// install platform specific utils` 주석으로 기록된 부분)
- 플랫폼 directive와 component를 install 합니다.(`// install platform runtime directives & components` 주석으로 기록된 부분)
- `patch` 함수를 install 합니다.(`// install platform patch function` 주석으로 기록된 부분)
- `mount` 메소드를 정의 합니다.(`// public mount method` 주석으로 기록된 부분)
- Vue Devtools와 개발 모드에서의 경고 메시지를 `console.log`로 출력 합니다.

코드를 통해 볼 수 있 듯이 이 파일은 Vue에 몇가지 플랫동 동작들을 추가하는 일들을 합니다.

2가지 내용을 집중해야 합니다.

1. `Vue.prototype.__patch__ = inBrowser ? patch : noop`은 웹페이지를 업데이트 하는 역할을 합니다. DOM을 조작하는 역할을 합니다. 이후에 자세히 다루어 보도록 하겠습니다.
2. `Vue.prototype.$mount`는 `mountComponent`를 호출하는 역할을 합니다. `$mount`는 이전 포스트에서 몇가지 검증을 추가하여 캡슐화 된다고 이야기 했습니다. 이 파일에서 한번더 캡슐화 되어 2번 캡슐화 됩니다.

`import Vue from 'core/index'`에서 Vue 파일라고 정의 되어 있는 `src/core/index.js` 파일을 따라가 보도록 하겠습니다.

## `src/core/index.js`
```js
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
```

이 파일에서는 전역 api들을 설정합니다. `import Vue from './instance/index'`를 보고 `src/core/instance/index.js` 파일을 따라가 보도록 하겠습니다.

## `src/core/instance/index.js`
```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

`function Vue (option)` 드디어 찾던 Vue의 코어입니다. Vue 코어 부분은 `this._init`만 호출할 뿐 굉장히 짧은 코드입니다.

`src/core/instance/index.js`에서 하는 일들을 살펴보도록 하겠습니다.

- 5개의 mixin을 import 합니다.
- Vue 인스턴스를 생성하는 함수를 정의 합니다.
- Vue에 5개의 mixin을 install 합니다.

# Vue의 Layer
Vue는 큰 프로젝트입니다. 그래서 Vue는 많은 Layer와 part들로 나누어져 있습니다. Vue는 크게 4가지로 Layer로 구성됩니다.

![Vue layer](/assets/img/posts/vuejs/vue_layer.png){:.aligncenter}

- Core: Vue 함수입니다. `this._init()`을 호출합니다. `src/core/instance/index.js`에서 살펴 볼 수 있습니다.
- Mixins: init, state, events, lifecycle, render, 5개의 mixin 함수를 Core에 추가 합니다. `src/core/instance/index.js`에서 살펴 볼 수 있습니다.
- Platform: 몇가지 동작들을 Core에 추가합니다. patch와 public mount 메소드를 추가합니다. `src/platforms/web/runtime/index.js`에서 살펴 볼 수 있습니다.
- Entry: config와 캡슐화 된 $mount의 가장 바깥쪽 $mount를 Core에 추가합니다. `src/platforms/web/entry-runtime-with-compiler.js`에서 살펴 볼 수 있습니다.

이렇게 여러개의 layer로 구성한다면 몇가지 장점이 있습니다.

1. 관심사를 분리 할 수 있습니다. 각각의 layer는 서로 다른 일들을 하게 됩니다.
2. 캡슐화 할 수 있습니다. 각각의 layer는 각자의 일에만 집중하면 됩니다.
3. 재사용 할 수 있습니다. Core에 가까울수록 일반적(generic)을 코드가 됩니다. 이로 인해 다른 플랫폼에 쉽게 호환이 되고, 다른 환경에서 쉽게 구축할 수 있습니다.

# 다음으로 볼 것
다음 포스트에는 Core 함수에서 호출한 `this._init` 함수와 5개의 mixin을 좀 더 자세히 살펴 볼 것입니다.

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/02-dig-into-the-core.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/02-dig-into-the-core.md)
