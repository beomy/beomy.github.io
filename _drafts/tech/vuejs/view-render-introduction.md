---
layout: post
title: '[Inside Vue] 7. View Render - 컴파일러 찾기'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이번 포스트에서는 view를 DOM에 그릴 수 있도록 브라우저에서 실행되는 코드로 변환하는 컴파일러 함수를 만드는 과정을 이야기 할 것입니다.

# 랜더링 함수
이전 포스트([Watcher가 업데이트 하는 3가지 방법(Lazy, Sync, Queue)]({{ site.url }}/tech/vuejs/lazy-sync-queue/#view-업데이트를-트리거하는-방법) - View 업데이트를 트리거하는 방법)에서 이야기 했던 `mountComponent` 함수를 시작으로 랜더링하는 함수들을 살펴보도록 하겠습니다.

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

`_render` 함수는 `render` 함수를 호출합니다. `render` 함수는 `vm.$options`에서 추출된 함수입니다. `vm.$options` 객체를 살펴보도록 하겠습니다.

### `vm.$options` 객체
`vm.$options` 객체는 `src/core/instance/init.js` 파일의 `initMixin` 함수에 정의 되어 있습니다.

```js
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)
```

위의 코드의 `options`는 `new Vew({...})`를 통해 전달되는 값(`{...}`)입니다. `options.render`를 키워드로 전역 검색을 하여 정의하는 부분을 찾아 보도록 하겠습니다.

![options render](/assets/img/posts/vuejs/options_render.png)

### `options.render` 함수
`src/platforms/web/entry-runtime-with-compiler.js` 파일의 `$mount` 함수 안에서 `options.render` 함수를 정의 합니다.

```js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  ...
  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let templ ate = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          ...
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        ...
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      ...

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      ...
    }
  }
  return mount.call(this, el, hydrating)
}
```

`$mount` 함수에서 `compileToFunctions` 함수를 `template`(Vue 인스턴스의 옵션의 `template` 혹은 `.vue` 파일의 가장 바깥쪽 `template`)를 전달하여 실행하면 `render`와 `staticRenderFns`를 리턴으로 받습니다. 

`compileToFunctions` 함수를 먼저 살펴보도록 하겠습니다.

### `compileToFunctions` 함수
`compileToFunctions` 함수는 `src/platforms/web/compiler/index.js`에서 가져옵니다.

```js
/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
```

위의 코드는 `src/platforms/web/compiler/index.js` 파일의 내용입니다. `compileToFunctions` 함수는 `createCompiler` 함수를 통해 생성됩니다. `createCompiler`를 살펴보도록 하겠습니다.

### `createCompiler` 함수
`src/compiler/index.js` 파일에서 `createCompiler` 함수가 정의됩니다.

```js
// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```

### `createCompilerCreator` 함수
`createCompilerCreator` 함수는 나중에 좀 더 자세히 알아보도록 하겠습니다. 지금은 단순히 core 함수인 `baseCompiler`를 감싸는 함수로 이해 하시면 됩니다. `baseCompiler` 함수 안에서 호출하는 `parse()`, `optimize()`, `generate()`가 실제 작업을 수행하는 함수 입니다.

# 요약
![vue 랜더링 과정](/assets/img/posts/vuejs/vue_render.png)

1. `parser`, `optimizer`, `generate`를 선택하여 코어 컴파일러 함수를 만듭니다.
2. 만들어진 코어 컴파일러 함수를 `createCompilerCreator` 함수의 인자로 전달 됩니다. `createCompilerCreator` 함수에서 리턴 된 함수는 `createCompiler`에 저장됩니다.
3. `createCompiler` 함수에 옵션들을 전달하여 호출합니다. 리턴 된 값은 실제 컴파일러 함수입니다.
4. 컴파일러 함수를 통해 `template`을 컴파일 하여 `render` 함수를 만듭니다.
5. `_render` 함수에서 생성된 `render` 함수를 호출하여 view를 랜더링합니다.

# 다음으로 볼 것
다음 포스트에서는 compiler와 patch, VDom 설계 방법과 실제 Dom과의 차이를 빠르게 계산하는 방법에 대해 이야기 하도록 하겠습니다.

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/06-view-render-introduction.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/06-view-render-introduction.md)
