---
layout: post
title: '[Inside Vue] 3. Vue 초기화'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이번 포스트에서는 [이전 포스트]({{ site.url }}/tech/vuejs/dig-into-the-core/)에서 이야기 했던 `src/core/instance/index.js` 파일의 `this._init` 함수와 5개의 mixin, `var app = new Vue({ ... })`와 같이 Vue를 사용 하는데, 그 안에서는 어떤 일들이 발생하는지 알아보도록 하겠습니다.

# mixin 함수 살펴보기

`src/core/instance/index.js` 파일부터 코드를 따라가도록 하겠습니다.

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

위의 `src/core/instance/index.js` 파일에서 호출하는 5개의 mixin이 각각 어떤 일들 하는지 알아보도록 하겠습니다.

## `initMixin`
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

`src/core/instance/init.js` 파일 내용입니다. 코드가 조금 길어서, 지금 이야기 할 내용을 제외하고 많이 생략하였습니다.

- `initMixin` 함수를 정의 합니다. 이 함수 안에서 `Vue.prototype._init` 함수를 정의합니다. 이 함수가 `src/core/instance/index.js` 파일에 Core 함수에서 이야기 한 `this._init` 함수 입니다. 밑에서 더 자세히 이야기 될 테니 기억해 주세요.
- `initInternalComponent` 함수를 정의 합니다. (`initMixin` 함수에 적힌 주석에 따르면..) 동적으로 option을 머지 하는 것은 매우 느리기 때문에 internal component 인스턴스화를 최적화 하기 위해 사용되었다고 합니다.
- `resolveConstructorOptions` 함수를 정의 합니다. option들을 모으는 함수 입니다.
- `resolveModifiedOptions` 함수를 정의 합니다. 이 함수는 `resolveConstructorOptions` 함수에서 사용되고, (`resolveConstructorOptions` 함수에 적힌 주석에 따르면..) [#4976 hot-reload](https://github.com/vuejs/vue/issues/4976) 버그와 연관 되어 있다고 합니다.

## `stateMixin`
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

## `eventsMixin`

## `lifecycleMixin`

## `rendeMixin`

# `_init` 함수 살펴보기

## `initLifecyle`

## `initEvents`

## `initRender`

## `initInjections`

### `defineReactive`

## `initState`

### `initProps`

### `initMethods`

### `initData`

### `initComputed`

### `initWatch`

## `initProvider`

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/03-init-introduction.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/03-init-introduction.md)
