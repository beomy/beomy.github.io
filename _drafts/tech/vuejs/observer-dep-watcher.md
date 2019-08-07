---
layout: post
title: '[Inside Vue] 5. Observer, Dep and Watcher'
featured-img: vuejs/vuejs.png
category: [tech, vuejs]
---
{% include toc.html %}

이번 포스트에서는 Observer와 Dep, Watcher에 대해 이야기 하도록 하겠습니다. Vue는 data가 변경되면, 자동으로 웹페이지를 업데이트 합니다. 이 때 [감시자(옵저버) 패턴](https://ko.wikipedia.org/wiki/옵서버_패턴)을 사용하는데, 옵저버 패턴에 관한 사전 지식이 있다면, 이해 하는데 도움이 될 것 같습니다.

이전 포스트([Vue 초기화]({{ site.url }}/tech/vuejs/vue-initialize/))에서는 Vue 인스턴스 생성시 초기화 하는 것에 대해 이야기 했습니다. 이번 포스트에서 이전 포스트에 관련된 이야기가 많이 등장하기 때문에, Vue 초기화 포스팅을 본 후 이번 포스팅을 보시는 것을 추천합니다.

# Observer
`src/core/observer/index.js` 파일을 살펴보도록 하겠습니다. 이 파일에서 하는 주된 역할은 프로퍼티를 반응형 포로퍼티로 만드는 역할을 합니다.

## `defineReactive` 함수
이전 포스트에서 `defineReactive` 함수를 많이 보셨을 것입니다. `defineReactive` 함수는 프로퍼티를 `dep`과 `childOb`(`observe(val)`의 리턴 값)를 가지는 반응형 프로퍼티로 만들어 줍니다.


```js
/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  ...

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    ...
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      ...
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```

`defineReactive` 함수 코드입니다. 중요한 코드만 남기도 나머지 코드는 생략하였습니다.<br />
위의 코드에서 `new Dep()`, `observe()`, `dependArray()`, `depend()` `notify()`가 호출됩니다. 먼저 `observe` 함수를 살펴보도록 하겠습니다.

## `observe` 함수
간단히 말하면 `observe` 함수는 `Observer` 인스턴스를 리턴하는 함수입니다.

```js
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe (value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```

`observe` 함수는 이전 포스트([Vue 초기화]({{ site.url }}/tech/vuejs/vue-initialize/#initData-함수))에서도 살펴보았습니다.

`observe` 함수는 존재하는 observer를 리턴하거나, observer를 생성(`new Observer(value)`)하여 리턴합니다. 객체일 때만 observer 타입을 리턴 합니다. 원시 값(Number, String 등..)은 void 값을 리턴합니다.

`value`가 root data 일 경우 `ob.vmCount++`로 vmCount를 증가시켜 `value`를 root data로 하는 컴포넌트 갯수를 체크합니다.

## `dependArray` 함수
간단히 말하면 `dependArray` 함수는 모든 배열 요소들에 `depend()` 호출 하도록 하는 함수입니다.

```js
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
```

배열을 반복하면서 `e.__ob__.dep.depend()`를 호출합니다.

## `Observer` 클래스
`observe` 함수에서 리턴하는 `Observer` 인스턴스를 만드는 `Observe` 클래스를 살펴보도록 하겠습니다.

`Observer` 클래스는 객체를 반복문을 사용하여 각 요소에 `defineReactive` 함수를 호출하여 각각의 요소를 반응형 프로퍼티로 만드는 역할을 하는 클래스입니다.

```js
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```

`this.value`, `this.dep`, `this.vmCount`를 초기화와 `__ob__` 프로퍼티를 정의합니다.

`value`가 배열 일 경우, array 메소드(`push`, `pop`과 같은..)를 중간에 가로체 재정의 합니다. 이유는 Vue가 array 메소드를 호출했을때 알아차리기 위해서 입니다. 그 후 `observeArray` 함수를 호출합니다. 이 함수는 반복문을 통해 `observe` 함수를 실행하여 각 요소들을 반응형 프로퍼티로 만들어 줍니다.

배열이 아닌 경우 `this.walk` 함수를 실행합니다. 이 함수는 객체에 각 요소마다 `defineReactive`를 호출하여 각 요소를 반응형 프로퍼티로 만들어줍니다.

`defineReactive` 함수에서 시작해서 `Observer` 클래스까지 코드 호출 순서를 보면,

1. `defineReactive()` 호출
2. `observe()` 호출
3. `new Observe(value)` 호출
4. `this.walk()` 호출
5. `defineReactive()` 호출

`defineReactive` 함수 호출로 시작하여 `defineReactive` 함수 호출하는, 재귀적으로 함수가 호출 되는 것을 볼 수 있습니다. 이렇게 재귀적으로 `defineReactive` 함수를 호출하여 모든 하위 요소들을 반응형 프로퍼티로 변환하게 됩니다.

이렇게 객체의 모든 하위 요소를 반응형 프로퍼티로 변환하는 이유는,

```js
data: {
  name: 'foo',
  parents: {
    mom: 'foomom',
    dad: 'foodad'
  }
}
```

위의 코드와 같이 `data`라는 객체가 있을 때, `data.name`의 값이나 `data.parents.mom`의 값이 변경 되었을 때, `data`의 setter 함수는 호출 되지 습니다. setter 함수가 호출되지 않으면 `notify`가 호출되지 않아 view가 업데이트 되지 않습니다.

재귀적으로 `defineReactive` 함수를 호출하면, 모든 하위 요소를 반응형 프로퍼티로 변환되어 `data.name`이나 `data.parents.mom`의 값이 변경 되어도 자동으로 view를 업데이트 할 수 있게 됩니다.

# Dep
`src/core/observer/dep.js` 파일을 살펴보도록 하겠습니다. 이 파일에서 하는 주된 역할은 `Watcher`를 관리하는 역할을 합니다.

## `Dep` 클래스
`Dep` 클래스의 상단 주석을 보면

> A dep is an observable that can have multiple directives subscribing to it.

라고 기록되어 있습니다. `Dep`는 여러개의 지시문(directives)을 구독(subscribe) 할 수 있는 관찰 가능한 객체입니다. [옵저버 패턴 wiki](https://ko.wikipedia.org/wiki/옵서버_패턴)를 보고 비교하자면, `Dep`은 옵저버들의 목록을 객체에 등록하여 관리하는 역할을 하는 것으로 보입니다.

```js
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

`Dep` 클래스는 `addSub`, `removeSub`, `depend`, `notify` 4개의 메소드로 구성된 클래스입니다.

`addSub`, `removeSub`, `notify`는 `this.subs`(`Watcher` 배열)을 다루는 메소드입니다. 각각의 `Dep` 인스턴스는 `Watcher`들을 저장하고 있는 배열을 가지고 있습니다.

### `addSub`, `removeSub` 함수
`this.subs` 배열에 `Watcher`를 추가/제거하는 함수입니다.

### `notify` 함수
`notify`가 호출되면 배열에 있는 모든 `Watcher`의 `update` 함수가 실행됩니다. `notify` 함수는 `defineReactive` 함수에서 정의한 setter 함수에서 호출됩니다. 즉 반응형 프로퍼티가 변경이 되면 그 프로퍼티를 감시하고 있는 모든 `Watcher`들의 `update` 함수가 호출됩니다.

### `depend` 함수
`depend` 함수는 `Dep.target`을 확인하고 없다면 `Dep.target.addDep(this)`를 실행합니다.

`addDep` 함수는 `Watcher` 클래스에 정의되어 있습니다. `addDep`라는 함수 이름에서 `Watcher` 클래스가 `Dep` 배열을 가지고 있다는 것을 추측해 볼 수 있겠죠?

## `Dep.target` 객체
```js
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
```

주석을 보면 `Dep.target` 객체는 현재 평가(?)되고 있는 Watcher라고 기록되어 있습니다. `Dep.target`은 Watcher는 동시에 하나만 평가할 수 있기 때문에 전역으로 유니크하다고 합니다. (무슨 말인지...)

## `pushTarget`, `popTarget` 함수
```js
const targetStack = []

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```

`pushTarget`, `popTarget` 함수는 `Watcher` 클래스에서 호출되는 함수입니다.

두 함수를 쉽게 이해하자면, 한 Watcher가 평가 도중에 다른 Watcher의 값을 가져와야 할 때 사용되거나, 다시 원래의 Watcher로 돌아갈 때 사용됩니다.

# Watcher
`src/core/observer/watcher.js` 파일을 살펴보도록 하겠습니다.

# 요약

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/04-dynamic-data-observer-dep-and-watcher.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/04-dynamic-data-observer-dep-and-watcher.md)
