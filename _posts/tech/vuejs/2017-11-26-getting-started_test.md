---
layout: post
title: Testing
featured-img: vuejs/vuejs.png
category: [tech]
---


Vuex에서 단위 테스트를 하고자 하는 주된 부분은 mutation과 action입니다.

# 1. Mutation Testing

mutation은 전달인자에 완전히 의존하는 함수이기 때문에, mutation을 테스트 하는 것은 매우 간단합니다.

```js
const state = { ... }

// 변이를 이름을 가지는 내보내기를 이용하여 내보냅니다.
export const mutations = { ... }

export default new Vuex.Store({
  state,
  mutations
})
```

위의 코드와 같이 mutation과 store를 모두 ES2015의 `export`를 사용하여 내보내기 하여 테스트 할 때 사용할 수 있습니다.

```js
// store.js
export const mutations = {
  increment: state => state.count++
}
```

```js
// mutations.spec.js
import { expect } from 'chai'
import { mutations } from './store'

// 변이 가져오기
const { increment } = mutations

describe('mutations', () => {
  it('INCREMENT', () => {
    // mock 상태
    const state = { count: 0 }
    // 변이 적용
    increment(state)
    // 결과 확인
    expect(state.count).to.equal(1)
  })
})
```

위의 코드는 Mocha + Chai를 사용하여 mutation을 테스팅 하는 예제입니다.

# 2\. Action Testing

action은 보통 외부 API를 호출하기 때문에, 테스트하기 좀 더 까다로울 수 있습니다. action을 테스트 하기 위해서는 몇가지 조작이 필요합니다. 예를 들어 API 호출을 가상의 서비스로 만들고, mock 데이터(테스트 데이터)로 가상의 서비스를 조작해야 합니다. webpack과 [inject-loader](https://github.com/plasticine/inject-loader)를 사용하여 테스트 파일을 묶을 수 있습니다.

```js
// actions.js
import shop from '../api/shop'

export const getAllProducts = ({ commit }) => {
  commit('REQUEST_PRODUCTS')
  shop.getProducts(products => {
    commit('RECEIVE_PRODUCTS', products)
  })
}
```

```js
// actions.spec.js

// 인라인 로더에는 require 구문을 사용하십시오.
// inject-loader를 사용하면 조작된 의존성을
// 주입 할 수있는 모듈 팩토리가 반환됩니다.
import { expect } from 'chai'
const actionsInjector = require('inject-loader!./actions')

// 조작된 모의 응답과 함께 모듈 생성
const actions = actionsInjector({
  '../api/shop': {
    getProducts (cb) {
      setTimeout(() => {
        cb([ /* 모의 응답 */ ])
      }, 100)
    }
  }
})

// 예상되는 변이와 함께 테스팅 액션을 도와주는 헬퍼
const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0

  // 모의 커밋
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]

    try {
      expect(type).to.equal(mutation.type)
      if (payload) {
        expect(payload).to.deep.equal(mutation.payload)
      }
    } catch (error) {
      done(error)
    }

    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }

  // 모의 저장소와 전달인자로 액션을 부릅니다.
  action({ commit, state }, payload)

  // 디스패치된 변이가 없는지 확인
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}

describe('actions', () => {
  it('getAllProducts', done => {
    testAction(actions.getAllProducts, null, {}, [
      { type: 'REQUEST_PRODUCTS' },
      { type: 'RECEIVE_PRODUCTS', payload: { /* 모의 응답 */ } }
    ], done)
  })
})
```

사용하는 테스트 환경에서 [Sinon.JS](https://sinonjs.org/)과 같은 스파이를 사용 할 수 있다면,

```js
describe('actions', () => {
  it('getAllProducts', () => {
    const commit = sinon.spy()
    const state = {}

    actions.getAllProducts({ commit, state })

    expect(commit.args).to.deep.equal([
      ['REQUEST_PRODUCTS'],
      ['RECEIVE_PRODUCTS', { /* 모의 응답 */ }]
    ])
  })
})
```

위의 코드와 같이 `testAction` 헬퍼 대신에 스파이를 사용하여 코드가 더 간결해 질 수 있습니다.

# 3\. Getters Testing

getter는 mutation과 같이 테스트하는 것이 매우 간단합니다.

```js
// getters.js
export const getters = {
  filteredProducts (state, { filterCategory }) {
    return state.products.filter(product => {
      return product.category === filterCategory
    })
  }
}
```

```js
// getters.spec.js
import { expect } from 'chai'
import { getters } from './getters'

describe('getters', () => {
  it('filteredProducts', () => {
    // mock state
    const state = {
      products: [
        { id: 1, title: 'Apple', category: 'fruit' },
        { id: 2, title: 'Orange', category: 'fruit' },
        { id: 3, title: 'Carrot', category: 'vegetable' }
      ]
    }
    // 모의 getter
    const filterCategory = 'fruit'

    // getter로 부터 결과를 받습니다
    const result = getters.filteredProducts(state, { filterCategory })

    // 결과 테스트
    expect(result).to.deep.equal([
      { id: 1, title: 'Apple', category: 'fruit' },
      { id: 2, title: 'Orange', category: 'fruit' }
    ])
  })
})
```

# 4\. 테스트 실행

제대로 작성된 mutation과 action은 브라우저 API와 의존성이 없어야 합니다.

### Node에서 테스트

webpack를 사용하여 테스트를 번들로 묶어 Node를 사용하여 직접 실행 할 수 있습니다.

```js
// webpack.config.js
module.exports = {
  entry: './test.js',
  output: {
    path: __dirname,
    filename: 'test-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
```

```bash
webpack
mocha test-bundle.js
```

위의 방법으로 webpack을 설정하여 테스트 할 수 있습니다. (`.babelrc` 도 필요합니다.)

### 브라우저에서 테스트

1.  `mocha-loader`를 설치합니다.
2.  webpak 설정에서 `entry`를 `'mocha!babel!./test.js'`로 변경합니다.
3.  `webpack-dev-server`를 시작합니다.
4.  `localhost:8080/webpack-dev-server/test-bundle`로 이동합니다.

Karma + karma-webpack를 사용한 테스트는 [vue-loader](https://vue-loader.vuejs.org/guide/testing.html) 참고 바랍니다.

#### 참고

- [https://vuex.vuejs.org/kr/guide/testing.html](https://vuex.vuejs.org/kr/guide/testing.html)
