---
layout: post
title: '[Inside Vue] 9. View Render - Patch'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

[7. View Render - 컴파일러]({{ site.url }}/tech/vuejs/view-render-compiler/#랜더링-함수)에서 이야기 한 `mountComponent` 함수에서 view를 랜더링 하는데 사용된 2가지 함수인 `_render()`와 `_update()`에서 호출하는 `render` 함수와 `__patch__` 함수에 대해 이야기 하도록 하겠습니다.

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

[6. Reactive - Watcher가 업데이트 하는 3가지 방법(Lazy, Sync, Queue)]({{ site.url }}/tech/vuejs/reactive-lazy-sync-queue/#view-업데이트를-트리거하는-방법)에서 이야기 했던 것 처럼 `new Watcher(vm, updateComponent, noop, ...)`로 `updateComponent`가 실행되어 화면이 업데이트 됩니다. `_render` 함수를 살펴보도록 하겠습니다.

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

## `patchVnode` 함수

DOM을 업데이트 하는 코어 함수인 `patchVNode` 함수에 대해 이야기 하도록 하겠습니다.

```js
function patchVnode (
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  ...
  if (isUndef(vnode.text)) {                  // 1
    if (isDef(oldCh) && isDef(ch)) {          // 3
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    } else if (isDef(ch)) {                   // 4
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(ch)
      }
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    } else if (isDef(oldCh)) {               // 5
      removeVnodes(oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) {       // 6
      nodeOps.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) { // 2
    nodeOps.setTextContent(elm, vnode.text)
  }
  ...
}
```

위의 코드의 주석번호(`// 1` 등..)와 밑의 설명의 번호를 매칭하면서 보시길 바랍니다.

1. 가장 바깥쪽 `if` 절을 살펴보면 `isUndef(vnode.text)`로 `vnode.text`가 정의되어 있지 않을 때 `if` 절이 동작합니다.
2. 가장 바깥쪽의 `else if` 절을 살펴보면 `oldVnode.text !== vnode.text` 일 때, `nodeOps.setTextContent(elm, vnode.text)`를 실행합니다. 즉 leaf 노드이면서 `text`가 다를 때 `text`를 업데이트 합니다.
3. 이전 노드와 새로운 노드 둘다 자식노드들을 가지고 있으면서, 두 노드가 다를 때, `updateChildren` 함수를 호출합니다.
4. 새로운 노드가 자식을 가지고, 이전 노드가 `text`를 가질 때, `addVnodes` 함수를 호출하여 새로운 노드의 자식 노드를 추가합니다.
5. 이전 노드가 자식을 가지고 새로운 노드가 leaf 노드일 때, `removeVnodes` 함술르 호출하여 이전 노드의 자식 노드를 제거합니다.
6. 이전 노드와 새로운 노드 모두 자식 노드가 없고 이전 노드의 `text`가 정의 되어 있지 않을 때 `nodeOps.setTextContent(elm, '')`를 호출하여 `text`를 제거합니다.

## `updateChildren` 함수
다음으로 `patchVnode` 함수에서 호출했던 `updateChildren` 함수를 살펴보도록 하겠습니다.

```js
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm

  ...

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (isUndef(idxInOld)) { // New element
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      } else {
        vnodeToMove = oldCh[idxInOld]
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
          oldCh[idxInOld] = undefined
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // same key but different element. treat as new element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  ...
}
```

위의 코드를 그림으로 설명해보도록 하겠습니다.

![vue updateChildren](/assets/img/posts/vuejs/update_children_1.png)

위의 그림에서 `oldCh`, `newCh`는 `updateChildren` 함수의 파라미터입니다. 각각 이전의 자식 VNode, 새로운 자식 VNode 배열을 나타냅니다. `oldStartIdx`, `oldEndIdx`, `oldStartVNode`, `oldEndVNode`, `newStartIdx`, `newEndIdx`, `newStartVNode`, `newEndVNode` 변수를 적용한 그림입니다.

위의 그림의 따라 동작하는 코드를 살펴보겠습니다.

- `while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {`의 값이 `true`로 배열을 반복하여 탐색하게 됩니다.
- `if (isUndef(oldStartVnode))`와 `else if (isUndef(oldEndVnode))`로 `oldStartVnode`와 `oldEndVnode`가 항상 정의 됩니다.
- `else if (sameVnode(oldStartVnode, newStartVnode))`, `oldStartVnode`와 `newStartVnode`가 서로 같은 노드라면 이전에 살펴봤던 `patchVnode` 함수를 실행하여 DOM을 업데이트 합니다.

`oldStartVnode`와 `newStartVnode`가 서로 같은 노드라고 가정한다면,

![vue updateChildren](/assets/img/posts/vuejs/update_children_2.png)

위의 그림과 같이 변수들이 업데이트 됩니다. 위의 방법을 `while`문 조건이 `true`일 때 반복하여 동작합니다.

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/08-view-render-patch.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/08-view-render-patch.md)
