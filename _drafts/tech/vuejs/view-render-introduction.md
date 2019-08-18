---
layout: post
title: '[Inside Vue] 7. View Render - Introduction'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이번 포스트에서는 view를 DOM에 그릴 수 있도록 브라우저에서 실행되는 코드로 변환하는 컴파일러 함수를 만드는 과정을 이야기 할 것입니다.

# 랜더 함수 찾기
이전 포스트([Watcher가 업데이트 하는 3가지 방법(Lazy, Sync, Queue)]({{ site.url }}/tech/vuejs/lazy-sync-queue/#view-업데이트를-트리거하는-방법) - View 업데이트를 트리거하는 방법)에서 이야기 했던 `mountComponent` 함수를 시작으로 랜더링 과정을 살펴보도록 하겠습니다.

```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  ...
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    ...
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }
  ...
}
```

`mountComponent` 함수는 `_update`와 `_render` 함수를 사용하여 view를 업데이트 합니다. 먼저 `_update` 함수를 살펴보도록 하겠습니다.

## `_update` 함수
`_update` 함수는 `src/core/instance/lifecycle.js` 파일의 `lifecycleMixin` 함수에 정의되어 있습니다.

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el
  const prevVnode = vm._vnode
  const restoreActiveInstance = setActiveInstance(vm)
  vm._vnode = vnode
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  restoreActiveInstance()
  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }
  // updated hook is called by the scheduler to ensure that children are
  // updated in a parent's updated hook.
}
```

`_update` 함수는 `__patch__` 함수를 호출합니다. `__patch__` 함수는 업데이트가 필요한 부분을 계산하고 해당 DOM을 업데이트 하는 역할을 합니다.

## `_render` 함수
`_render` 함수는 `src/core/instance/render.js` 파일의 `renderMixin` 함수에 정의되어 있습니다.

```js
Vue.prototype._render = function (): VNode {
  const vm: Component = this
  const { render, _parentVnode } = vm.$options

  ...

  // set parent vnode. this allows render functions to have access
  // to the data on the placeholder node.
  vm.$vnode = _parentVnode
  // render self
  let vnode
  try {
    // There's no need to maintain a stack because all render fns are called
    // separately from one another. Nested component's render fns are called
    // when parent component is patched.
    currentRenderingInstance = vm
    vnode = render.call(vm._renderProxy, vm.$createElement)
  } catch (e) {
    ...
  } finally {
    currentRenderingInstance = null
  }
  ...
}
```

`_render` 함수는 `render` 함수를 호출합니다. `render` 함수는 `vm.$options`에서 추출된 함수입니다.

### `vm.$options` 객체

### `option.render` 함수

### `compileToFunctions` 함수

### `createCompiler` 함수

### `createCompilerCreator` 함수

# 랜더 구조

# 요약

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/06-view-render-introduction.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/06-view-render-introduction.md)
