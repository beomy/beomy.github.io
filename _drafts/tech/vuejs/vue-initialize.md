---
layout: post
title: '[Inside Vue] 4. Vue 초기화'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

# `_init` 함수 살펴보기
```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

위의 코드는 코드 함수 코어 입니다. 이번 포스트에서는 `this._init` 함수를 살펴 보도록 하겠습니다.

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

Vue를 사용할 때, 위의 코드처럼 Vue 인스턴스를 생성합니다. 위의 코드와 같이 Vue 인스턴스를 생성하는 것은

```js
options = {
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

위의 코드와 같은 값을 가진 `options`로 `this._init(options)`를 호출 한다는 것과 동일합니다.

`_init` 함수는 이전 포스트. [Mixin Layer]({{ site.url }}/tech/vuejs/mixin-layer/)에서 살펴본 `src/core/instance/init.js` 파일에 `initMixin` 함수 안에 있습니다.

```js
export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
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
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

`_init` 함수가 하는 일들은

- `_uid` 값을 세팅합니다.
- 퍼포먼스 확인을 위한 `startTag`가 mark 됩니다.
- `_isVue` 값을 세팅합니다.
- option들을 세팅합니다.
- `_renderProxy`를 세팅합니다. Proxy는 개발모드일 때 랜더 정보를 보여줍니다.
- `_self`를 세팅합니다.
- init 함수들을 호출합니다.
- 퍼포먼스 확인을 위한 `endTag`가 mark 됩니다.
- `$mount` 함수가 호출되어 DOM을 업데이트 합니다.

```js
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

위의 init 함수들에 대해 이야기 하도록 하겠습니다. `callHook` 함수는 간단하게 Vue의 lifecycle 훅을 호출하는 함수로 이해 할 수 있습니다.

## `initLifecycle` 함수
`initLifecycle` 함수는 `src/core/instance/lifecycle.js`에 정의되어 있습니다.

```js
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
```

`initLifecycle` 함수는 현재 컴포넌트를 부모와 연결 시키는 역할을 합니다. 그리고 lifecycle 메소드에 필요한 몇몇 변수들을 초기화 합니다.

## `initEvents` 함수
`initEvents` 함수는 `src/core/instance/events.js`에 정의되어 있습니다.

```js
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
```

`initEvents` 함수는 몇몇의 변수들을 초기화 하고, 부모의 리스너를 초기화 합니다.

## `initRender` 함수
`initRender` 함수는 `src/core/instance/render.js`에 정의되어 있습니다.



## `initInjections` 함수

### `defineReactive` 함수

## `initState` 함수

### `initProps` 함수

### `initMethods` 함수

### `initData` 함수

### `initComputed` 함수

### `initWatch` 함수

## `initProvider` 함수

# 요약

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/03-init-introduction.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/03-init-introduction.md)
