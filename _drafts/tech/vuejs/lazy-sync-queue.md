---
layout: post
title: '[Inside Vue] 6. Watcher가 업데이트 하는 3가지 방법(Lazy, Sync, Queue)'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이전 포스트([Observer, Dep and Watcher]({{ site.url }}/tech/vuejs/observer-dep-watcher/)에서는 `Observer`와 `Dep`, `Watcher`의 관계에 대해 이야기하였습니다. 이번 포스트에서는 `Watcher`가 어떻게 값을 업데이트 하는지, View와 data의 업데이트 순서가 어떻게 결정되는지에 대해 야야기 하도록 하겠습니다.

# Watcher가 업데이트 하는 3가지 방법
```js
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  ...

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      ...
    },
    set: function reactiveSetter (newVal) {
      ...
      dep.notify()
    }
  })
}
```

위의 코드를 보면, 반응형 프로퍼티가 업데이트 되면 setter 함수에서 `dep.notify()`를 호출합니다.

```js
export default class Dep {
  ...

  notify () {
    ...
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

`Dep` 클래스의 `notify` 함수는 `subs[i].update()`(`Watcher` 클래스에 `update` 함수가 정의되어 있습니다)를 호출합니다.

```js
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true
  } else if (this.sync) {
    this.run()
  } else {
    queueWatcher(this)
  }
}
```

`update` 함수를 살펴보면, lazy, sync, queue, 3가지 방식으로 업데이트하는 것을 볼 수 있습니다.

## Lazy
lazy 옵션은 Watcher 인스턴스를 생성할 때 인자로 전달됩니다. `this.lazy`가 `true`일 경우, `this.dirty`가 `true`가 됩니다.(변수명을 해석하면.. 게으르면 더럽습니다. 가 되네요) `dirty`가 사용되는 코드를 보면,

```js
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
evaluate () {
  this.value = this.get()
  this.dirty = false
}
```

`Watcher` 클래스의 `evaluate` 함수에서 사용됩니다. `evaluate` 함수는 `this.get()`를 호출하고 리턴 값을 `this.value`에 저장한 후 `this.dirty`를 `false`로 만들어 줍니다.

이제 `evaluate` 함수를 사용하는 곳을 전체 프로젝트에서 찾아 봅시다.

![evaluate 함수 사용](/assets/img/posts/vuejs/used_evaluate_function.png)

core 디렉토리 밑에서 `src/core/instance/state.js` 파일에서 `evaluate` 함수를 사용하는 것을 볼 수 있습니다.
`src/core/instance/state.js` 파일은 [Mixin Layer]({{ site.url }}/tech/vuejs/mixin-layer/)와 [Vue 초기화]({{ site.url }}/tech/vuejs/vue-initialize/)에서 살펴보았던 파일입니다.

`evaluate` 함수는 `src/core/instance/state.js` 파일의 `createComputedGetter` 함수에서 사용 됩니다.

```js
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

함수 이름에서 알 수 있듯이 `computed` 프로퍼티의 getter 함수를 생성하는 함수입니다. `computedGetter` 함수가 호출되면, `watcher.dirty`가 `true` 일 경우 `watcher.evaluate()`를 호출합니다. lazy 모드일 경우 실제로 값이 필요할 때까지 평가(evaluate)를 미룰 수 있습니다.

## Sync
`update` 함수를 보면, `this.sync`가 `true`일 경우(기본값은 `false`입니다), `this.run()`을 실행합니다.

```js
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
run () {
  if (this.active) {
    const value = this.get()
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      const oldValue = this.value
      this.value = value
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue)
        } catch (e) {
          handleError(e, this.vm, `callback for watcher "${this.expression}"`)
        }
      } else {
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }
}
```

`run` 함수는 `this.get()`(`get` 함수는 [Observer, Dep and Watcher]({{ site.url }}/tech/vuejs/observer-dep-watcher/)에서 살펴보았습니다.)을 호출합니다. `value`의 값이 변경 되었거나, `value`가 object이거나, `this.deep`이 `true`일 경우 `value`와 `oldValue`를 세팅한 후 콜백함수(`this.cb.call(this.vm, value, oldValue)`)를 실행합니다.

## Queue
lazy, sync 모드가 아닐 경우, queue 모드로 동작합니다. queue 모드에서 `update` 함수에서 `queueWatcher(this)`를 실행합니다.

```js
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      nextTick(flushSchedulerQueue)
    }
  }
}
```

# View 업데이트를 트리거하는 방법

# 업데이트 순서를 정하는 방법

# 요약

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/05-dynamic-data-lazy-sync-and-queue.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/05-dynamic-data-lazy-sync-and-queue.md)
