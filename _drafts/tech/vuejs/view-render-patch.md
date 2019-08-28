---
layout: post
title: '[Inside Vue] 9. View Render - Patch'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

[View Render - 컴파일러 찾기]({{ site.url }}/tech/vuejs/view-render-introduction/#랜더링-함수)에서 이야기 한 `mountComponent` 함수에서 view를 랜더링 하는데 사용된 2가지 함수인 `_render()`와 `_update()`에서 호출하는 `render` 함수와 `__patch__` 함수에 대해 이야기 하도록 하겠습니다.

# view를 랜더링 하는 2가지 함수
`mountComponent` 함수에서 view를 랜더링하는데 `_render`, `_update` 두가지 함수가 사용됩니다.

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

`src/core/instance/lifecycle.js`에 `mountComponent` 함수가 정의되어 있습니다. 먼저 `_render` 함수에서 `render` 함수를 호출하는 코드를 살펴보도록 하겠습니다.

## `_render` 함수
`render` 함수를 호출하는 `_render` 함수 코드를 살펴보면,

```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
...
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    ...
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

[Watcher가 업데이트 하는 3가지 방법(Lazy, Sync, Queue)]({{ site.url }}/tech/vuejs/lazy-sync-queue/#view-업데이트를-트리거하는-방법)에서 이야기 했던 것 처럼 `new Watcher(vm, updateComponent, noop, ...)`로 `updateComponent`가 실행되어 화면이 업데이트 됩니다. `_render` 함수를 살펴보도록 하겠습니다.

```js
Vue.prototype._render = function (): VNode {
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
    console.log(vnode)
  } catch (e) {
    ...
  } finally {
    currentRenderingInstance = null
  }
  ...
  return vnode
}
```

`_render` 함수는 `src/core/instance/render.js` 파일에 정의되어 있습니다. `_render` 함수는 `vnode`를 리턴하는데 `vnode`는 `vnode = render.call(vm._renderProxy, vm.$createElement)`로 만들어집니다. `vnode`의 값을 알아 보기 위해 바로 밑에 `console.log(vnode)`를 추가하여 로그로 확인하도록 하겠습니다.

위의 코드에 추가된 로그는 [CodePen](https://codepen.io/beomy/pen/QWLpdeq?editors=1012)에서 확인 할 수 있습니다.

![VNode](/assets/img/posts/vuejs/virtual_node.png)

`vnode`는 변수명에서 짐작할 수 있듯이 가상노드(virtual node)입니다. `render` 함수의 역할은 VNode를 가져오는 역할을 합니다.

## `_update` 함수
이번에는 나머지 랜더링 함수인 `_update` 함수를 살펴보도록 하겠습니다. `_update` 함수의 파라미터로 `_render` 함수에서 생성된 VNode가 전달됩니다.

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

`_update` 함수에서 중요한 점은 `__patch__` 함수를 호출한다는 것입니다. `__patch__` 함수는 VNode를 파라미터로 전달받아 DOM을 초기화 하거나 업데이트 하는 역할을 합니다. `__patch__` 함수를 살펴보도록 하겠습니다.

### `__patch__` 함수
```js
Vue.prototype.__patch__ = inBrowser ? patch : noop
```

`__patch__` 함수는 `src/platforms/web/runtime/index.js` 파일에 정의 되어 있습니다.

```js
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })
```

`__patch__` 함수가 되는 `patch`는 `src/platforms/web/runtime/patch.js`에 정의되어 있습니다. `patch` 함수는 `createPatchFunction({ nodeOps, modules })`가 호출되어 생성됩니다. `nodeOps`를 살펴보면,

```js
export function createElementNS (namespace: string, tagName: string): Element {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

export function createTextNode (text: string): Text {
  return document.createTextNode(text)
}

export function createComment (text: string): Comment {
  return document.createComment(text)
}

export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {
  parentNode.insertBefore(newNode, referenceNode)
}

export function removeChild (node: Node, child: Node) {
  node.removeChild(child)
}

export function appendChild (node: Node, child: Node) {
  node.appendChild(child)
}
```

위의 코드와 같이 실제 DOM을 조작하는 메소드들을 볼 수 있습니다. `const modules = platformModules.concat(baseModules)`를 통해 생성되는 `modules` 역시 실제 DOM을 조작하는 메소드들이 모여 있습니다.

# Vue가 DOM을 빠르게 업데이트 하는 방법
지금까지 VNode를 만드는 방법과 DOM을 수정하는 메소드들에 대해 이야기 했습니다. 이번에는 이것들을 사용하여 Vue가 어떻게 DOM을 빠르게 업데이트 하는지에 대해 이야기 하도록 하겠습니다.

`patch` 함수를 만드는 `createPatchFunction`를 살펴보도록 하겠습니다. `src/vdom/patch.js`에 정의되어 있습니다.

```js
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */
...
export function createPatchFunction (backend) {
  ...
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    ...

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue)
    } else {
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
        ...
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
}
```

`createPatchFunction` 함수의 코드량이 어마어마 합니다. `src/vdom/patch.js` 파일 최상단에 있는 주석을 보면, [Snabbdom](https://github.com/snabbdom/snabbdom)을 사용하여 가상 DOM을 patch 한다고 이야기합니다.

DOM을 업데이트 하는 코어 함수인 `patchVNode` 함수에 집중해서 이야기 하도록 하겠습니다.

```js
function patchVnode (
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  if (oldVnode === vnode) {
    return
  }

  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // clone reused vnode
    vnode = ownerArray[index] = cloneVNode(vnode)
  }

  const elm = vnode.elm = oldVnode.elm

  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue)
    } else {
      vnode.isAsyncPlaceholder = true
    }
    return
  }

  // reuse element for static trees.
  // note we only do this if the vnode is cloned -
  // if the new node is not cloned it means the render functions have been
  // reset by the hot-reload-api and we need to do a proper re-render.
  if (isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    vnode.componentInstance = oldVnode.componentInstance
    return
  }

  let i
  const data = vnode.data
  if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
    i(oldVnode, vnode)
  }

  const oldCh = oldVnode.children
  const ch = vnode.children
  if (isDef(data) && isPatchable(vnode)) {
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
    if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
  }
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    } else if (isDef(ch)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(ch)
      }
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    } else if (isDef(oldCh)) {
      removeVnodes(oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) {
      nodeOps.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) {
    nodeOps.setTextContent(elm, vnode.text)
  }
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
  }
}
```

# 요약

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/08-view-render-patch.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/08-view-render-patch.md)
