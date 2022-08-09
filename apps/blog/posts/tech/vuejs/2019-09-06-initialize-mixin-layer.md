---
layout: post
title: '[Inside Vue] 3. Initialize - Mixin Layer'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
summary: Vue 코어 함수의 mixin 레이어를 이야기할 것입니다.
---

이번 포스트에서는 [2. Initialize - Vue 코어 함수](/tech/vuejs/initialize-vue-core-function/)에서 이야기 했던 `src/core/instance/index.js` 파일의  5개의 mixin에 대해 알아보도록 하겠습니다.

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

`src/core/instance/index.js` 파일부터 코드를 따라가도록 하겠습니다.

# `initMixin` 함수
`initMixin` 함수는 `src/core/instance/init.js`에 정의되어 있습니다.

```js
/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    ...
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    ...
  }
}

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  ...
}

export function resolveConstructorOptions (Ctor: Class<Component>) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  ...
}
```

`src/core/instance/init.js` 파일 내용입니다. 코드가 조금 길어서, 이야기 할 내용을 제외하고 많이 생략하였습니다.

- `initMixin` 함수를 정의 합니다. 이 함수 안에서 `Vue.prototype._init` 함수를 정의합니다. 이 함수가 `src/core/instance/index.js` 파일에 코어 함수에서 이야기 한 `this._init` 함수 입니다. 밑에서 더 자세히 이야기 될 테니 기억해 주세요.
- `initInternalComponent` 함수를 정의 합니다. `initMixin` 함수에 적힌 주석에 따르면, 동적으로 option을 merge 하는 것은 매우 느리기 때문에 internal component 인스턴스화를 최적화 하기 위해 사용되었다고 합니다.
- `resolveConstructorOptions` 함수를 정의 합니다. option들을 모으는 함수 입니다.
- `resolveModifiedOptions` 함수를 정의 합니다. 이 함수는 `resolveConstructorOptions` 함수에서 사용되고, `resolveConstructorOptions` 함수에 적힌 주석에 따르면, [#4976 hot-reload](https://github.com/vuejs/vue/issues/4976) 버그와 연관 되어 있다고 합니다.

# `stateMixin` 함수
`stateMixin` 함수는 `src/core/instance/state.js`에 정의되어 있습니다.

```js
export function stateMixin (Vue: Class<Component>) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }
}
```

`stateMixin` 함수 코드입니다.

- `dataDef`의 getter를 정의합니다.
- `propsDef`의 getter를 정의 합니다.
- production 모드가 아닐 경우에만 `dataDef`와 `propsDef`의 setter를 정의 합니다. setter의 역할을 경고 로그를 출력하는 역할만 합니다.
- `Vue.prototype.$data`에 `dataDef`를 저장합니다.
- `Vue.prototype.$props`에 `propsDef`를 저장합니다.
- `Vue.prototype.$set`를 정의합니다.
- `Vue.prototype.$delete`를 정의합니다.
- `Vue.prototype.$watch`를 정의합니다.

`$data`, `$props`, `$set`, `$delete`, `$watch`는 Vue를 사용하면서 한번쯤 보았던 이름들입니다.<br />
`Watcher`가 사용되는 것을 볼 수 있습니다. `Watcher`는 data와 view의 동기를 맞춰주는 역할을 합니다.

# `eventsMixin` 함수
`eventsMixin` 함수는 `src/core/instance/events.js`에 정의되어 있습니다.

```js
export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    ...
  }

  Vue.prototype.$once = function (event: string, fn: Function): Component {
    ...
  }

  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    ...
  }

  Vue.prototype.$emit = function (event: string): Component {
    ...
  }
}
```

`eventsMixin` 함수 코드입니다. 세부 내용은 생략하였습니다.

- `Vue.prototype.$on`을 정의합니다.
- `Vue.prototype.$once`을 정의합니다.
- `Vue.prototype.$off`을 정의합니다.
- `Vue.prototype.$emit`을 정의합니다.

Vue를 사용하면서 익숙하게 보아온 이벤트 함수들의 정의가 이 곳에서 일어납니다.

# `lifecycleMixin` 함수
`lifecycleMixin` 함수는 `src/core/instance/lifecycle.js`에 정의되어 있습니다.

```js
...

export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    ...
  }

  Vue.prototype.$forceUpdate = function () {
    ...
  }

  Vue.prototype.$destroy = function () {
    ...
  }
}

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  ...
}

...
```

`src/core/instance/lifecycle.js` 코드 부분입니다. 이야기할 부분을 제외하고 모두 생략하였습니다.

`lifecycleMixin` 함수는

- `Vue.prototype._update`를 정의합니다. DOM 업데이트가 이곳에서 일어 납니다. [9. View Render - Patch](/tech/vuejs/view-render-patch/)에서 자세히 이야기 하도록 하겠습니다.
- `Vue.prototype.$forceUpdate`를 정의합니다.
- `Vue.prototype.$destroy`를 정의합니다.

`lifecycleMixin` 함수 바로 아래 `mountComponent` 함수가 있습니다. 이 함수는 [2. Initialize - Vue 코어 함수](/tech/vuejs/initialize-vue-core-function/#srcplatformswebruntimeindexjs-파일)에서 잠깐 언급 된 적이 있습니다. `Vue.prototype.$mount`는 `mountComponent` 함수 호출 값을 리턴합니다. 이전 포스트에서 2번 캡슐화 된다고 이야기 했습니다. 결국 `$mount`는 `mountComponent`를 2번 캡슐화 한 함수입니다. `mountComponent` 함수는 [9. View Render - Patch](/tech/vuejs/view-render-patch/)에서 자세히 이야기 할 것입니다.

`src/core/instance/lifecycle.js` 파일에는 이외의 몇개의 함수가 존재합니다. 이 함수들은 DOM을 업데이트 하는데 사용됩니다.

# `renderMixin` 함수
`renderMixin` 함수는 `src/core/instance/render.js`에 정의되어 있습니다.

```js
export function renderMixin (Vue: Class<Component>) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: Function) {
    ...
  }

  Vue.prototype._render = function (): VNode {
    ...
  }
}
```

`renderMixin` 함수 코드입니다. 이 코드 역시 많이 생략하였습니다.

- `Vue.prototype.$nextTick` 함수를 정의합니다.
- `Vue.prototype._render` 함수를 정의합니다.

# 요약
Mixin 레이어에서는 `Vue.prototype`안에 몇가지 함수와 객체들을 정의합니다.<br />
아래 그림은 Mixin들이 정의하는 함수, 객체들의 목록을 나타낸 그림입니다.

![Vue Mixin](/assets/img/posts/vuejs/vue_mixin.png)

- **initMixin**: `_init()`를 정의합니다.
- **stateMixin**: `$data`, `$props`, `$set()`, `$delete()`, `$watch()`를 정의합니다.
- **eventsMixin**: `$on()`, `$once()`, `$off()`, `$emit()`를 정의합니다.
- **lifecycleMixin**: `_update()`, `$forceUpdate()`, `$destroy()`를 정의합니다.
- **renderMixin**: `_render()`를 정의합니다.

# 다음으로 볼 것
`src/core/instance/index.js`의 코어 함수에서 호출하는 `this._init(options)`를 살펴보도록 하겠습니다. [4. Initialize - _init 함수](/tech/vuejs/initialize-_init-function/)에서 확인 할 수 있습니다.

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/03-init-introduction.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/03-init-introduction.md)
