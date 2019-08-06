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
이전 포스트에서 `defineReactive` 함수를 많이 보셨을 것입니다. `defineReactive` 함수는 프로퍼티를 `dep`과 `childOb`(`observe(val)`의 리턴 값)를 가지는 반응 프로퍼티로 만들어 줍니다.


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

# Dep
`Dep` 클래스의 상단 주석을 보면

```js
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
```

라고 기록되어 있습니다. `Dep`는 여러개의 지시문(directives)을 구독(subscribe) 할 수 있는 관찰 가능한 객체입니다. [옵저버 패턴 wiki](https://ko.wikipedia.org/wiki/옵서버_패턴)를 보고 비교하자면, `Dep`은 옵저버들의 목록을 객체에 등록하여 관리하는 역할을 하는 것으로 보입니다.

# Watcher

# 요약

# 다음으로 볼 것

#### 참고
- [https://github.com/numbbbbb/read-vue-source-code/blob/master/04-dynamic-data-observer-dep-and-watcher.md](https://github.com/numbbbbb/read-vue-source-code/blob/master/04-dynamic-data-observer-dep-and-watcher.md)
