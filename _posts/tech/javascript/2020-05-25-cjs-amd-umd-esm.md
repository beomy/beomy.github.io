---
layout: post
title: '[JavaScript] CJS, AMD, UMD, ESM'
featured-img: javascript/js.png
category: [tech, javaScript]
summary: 자바스크립트를 모듈화할 수 있게 한 CJS, AMD, UMD, ESM에 대해 살펴보겠습니다.
---
{% include toc.html %}

처음 자바스크립트는 모듈을 가져오거나 내보내는 방법이 없어, 하나의 파일에 모든 기능들이 들어가야 했습니다. CJS, AMD, UMD, ESM이 등장 후에는 모듈로 개발하고 배포할 수 있게 되었습니다. 이번 포스트에서는 모듈화 개발을 할 수 있게 한 CJS, AMD, UMD, ESM가 무엇인지 살펴보겠습니다.

# CJS (CommonJS)
CommonJS([http://www.commonjs.org/](http://www.commonjs.org/))는 이름의 'Common'에서 알 수 있듯이 JavaScript를 브라우저에서뿐만 아니라 범용 언어로 사용할 수 있도록 하겠다는 의지를 가진 워킹 그룹입니다.

## 코드 예제
CJS를 사용하는 방법은 아래 코드와 같습니다.

```js
// 아래와 같이 require을 통해 package/lib 모듈을 변수에 담을 수 있습니다.
var lib = require('package/lib');

// 가져온 모듈을 아래와 같이 사용할 수 있습니다.
function foo () {
  lib.log('hello world!');
}

// foo 함수를 다른 파일에서 사용할 수 있도록, 다른 모듈로 추출될 수 있습니다.
exports.foobar = foo;
```

## 특징: 동기
CommonJS는 아래 코드와 같이 동기로 동작하는 특징을 가집니다.

```js
var foo = require('foo');
var bar = require('bar');

foo.log('It is foo');
bar.log('It is bar');
```

CommonJS는 동기적인 특징으로 서버사이드에 사용하기 용이합니다. (CommonJS의 첫 이름은 [ServerJS](https://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/) 였다고 합니다.) Node.js가 CommonJS를 채택하여 사용하고 있습니다.

## CJS를 사용하는 라이브러리
- 브라우저
  - curl.js([http://github.com/unscriptable/curl](http://github.com/unscriptable/curl))
  - SproutCore([http://sproutcore.com](http://sproutcore.com))
  - PINF([http://github.com/pinf/loader-js](http://github.com/pinf/loader-js))
- 서버사이드
  - Node.js([http://nodejs.org](http://nodejs.org))
  - Narwhal([https://github.com/tlrobinson/narwhal](https://github.com/tlrobinson/narwhal))
  - Persevere([http://www.persvr.org](http://www.persvr.org))
  - Wakanda([http://www.wakandasoft.com](http://www.wakandasoft.com))

# AMD (Asynchronous Module Definition)
CommonJS는 모든 파일이 로컬 디스크에 있어 필요할 때 바로 불러올 수 있는 상황을 전제로 합니다. 즉 동기적인 동작이 가능한 서버사이드 자바스크립트 환경을 전제로 합니다. 브라우저에서 이런 방식은 필요한 모듈이 모두 다운로드할 때까지 아무것도 할 수 없는 상태가 되어 치명적인 단점이 됩니다.

AMD 그룹은 비동기 상황에서 자바스크립트 모듈을 사용하기 위해 CommonJS에서 함께 논의하다 합의점을 이루지 못하고 독립한 그룹입니다. CommonJS가 자바스크립트를 브라우저 밖으로 꺼내기 위해 탄생된 그룹이고, AMD는 브라우저에 중점을 둔 그룹입니다.

## 코드 예제
아래 코드는 AMD에서 모듈로 추출하는 코드입니다.

```js
// 종속성을 갖는 모듈인 'package/lib'를 모듈 선언부의 첫 번째 파라미터에 넣으면,
// 'package/lib'은 콜백 함수의 lib 파라미터 안에 담깁니다.
define(['package/lib'], function (lib) {

  // 로드된 종속 모듈을 아래와 같이 사용할 수 있습니다.
  function foo () {
    lib.log('hello world!');
  }

  // 생성된 foo 함수는 리턴을 통해 foobar라는 이름의 다른 모듈로 추출될 수 있습니다.
  return {
    foobar: foo
  };
});
```

선언된 모듈들을 아래와 같이 `require`로 사용할 수 있습니다.

```js
require(['package/myModule'], function (myModule) {
  myModule.foobar();
});
```

## 특징: 비동기
브라우저는 네트워크를 통해 모듈들을 내려받기 때문에 비동기적으로 동작해야 합니다. AMD 이름의 'Asynchronous'에서 알 수 있듯이 AMD는 비동기 모듈에 대한 표준안을 다루고 있습니다. AMD는 비동기적인 특징으로 클라이언트 사이드 개발에 적합합니다.

## AMD를 사용하는 라이브러리
- 브라우저
  - RequireJS([http://requirejs.org](http://requirejs.org))
  - curl.js([http://github.com/unscriptable/curl](http://github.com/unscriptable/curl))
  - bdLoad([http://bdframework.org/bdLoad/](http://bdframework.org/bdLoad/))
  - Yabble([http://github.com/jbrantly/yabble](http://github.com/jbrantly/yabble))
  - PINF([http://github.com/pinf/loader-js](http://github.com/pinf/loader-js))
- 서버사이드
  - RequireJS([http://requirejs.org](http://requirejs.org))
  - PINF([http://github.com/pinf/loader-js](http://github.com/pinf/loader-js))

# UMD (Universal Module Definition)
AMD와 CommonJS 두 그룹으로 나누어지다 보니 서로 호환되지 않는 문제가 발생하게 됩니다. 이것을 해결하기 위해 나온 것이 UMD입니다. UMD는 디자인 패턴에 더 가깝습니다. AMD와 CommonJS, window에 추가하는 방식까지 모두 가능한 모듈을 작성하는 방식입니다.

## 코드 예제
AMD는 `define`을 사용하고, CommonJS는 `module.exports`를 사용합니다. 이 차이를 이용하여 UMD를 만들 수 있습니다. UMD는 두 부분으로 구성됩니다.

- 모듈 로더를 확인하는 즉시 실행 함수(IIFE): 이 함수는 `root`(전역 범위)와 `factory`(모듈을 선언하는 함수) 2개의 파라미터를 가집니다.
- 모듈을 생성하는 익명 함수: 이 함수가 즉시 실행 함수의 2번째 파라미터로 전달됩니다.

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['exports', 'b'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('b'));
  } else {
    // Browser globals
    factory((root.commonJsStrict = {}), root.b);
  }
}(this, function (exports, b) {
  //use b in some fashion.

  // attach properties to the exports object to define
  // the exported module properties.
  exports.action = function () {};
}));
```

위의 코드를 보면, `exports`와 `module`이 존재하면 CommonJS 방식으로, `define`이 함수이고 `define.amd`가 존재할 경우 AMD 방식으로 그것도 아니라면 window 객체에 모듈을 내보냅니다.

## 특징: 여러 모듈 로더에서 사용 가능
UMD의 특징은 위에서 말했던 것처럼 AMD와 CommonJS 모두 사용 가능하다는 점입니다. AMD는 클라이언트 사이드에서 많이 사용되고, CommonJS는 서버 사이드에서 많이 사용되기 때문에, UMD를 사용하면 두 개의 모듈을 따로 만들 필요가 없게 됩니다.

# ESM (ECMAScript Module)
ES6에 자바스크립트 모듈 기능이 추가되었습니다.

## 코드 예제
아래 코드와 같이 ESM을 사용할 수 있습니다.

```js
import lib from 'package/lib';

function foo () {
  lib.log('hello world!');
}

export {
  foobar: foo
};
```

## 특징: 자바스크립트 자체 모듈 시스템
ESM은 ECMAScript에서 지원하는 자바스크립트 공식 모듈 시스템입니다. 아직 브라우저에서 `import`와 `export`를 지원하지 않아 번들러를 함께 사용해야 합니다.

## 부록: `<script type="module" src="index.mjs">`
`<script>` 태그에 `type="module"`을 선언하면 자바스크립트 파일은 모듈로 동작합니다. 이때 모듈이라는 것을 명확히 알기 위해서 `mjs` 확장자를 사용하도록 권장합니다. 예제를 살펴보면,

```html
<!DOCTYPE html>
<html>
<body>
  <script type="module" src="foo.mjs"></script>
  <script type="module" src="bar.mjs"></script>
</body>
</html>
```

```js
// foo.mjs
var x = 'foo';

console.log(x); // foo
// 변수 x는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
console.log(window.x); // undefined
```

```js
// bar.mjs
// import 사용이 가능합니다.
import test from './module.mjs';
console.log(test);

// 변수 x는 foo.mjs에서 선언한 변수 x와 스코프가 다른 변수이다.
var x = 'bar';

console.log(x); // bar
// 변수 x는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
console.log(window.x); // undefined
```

```js
// module.mjs
const test = 'hello world!';

// export 사용이 가능합니다.
export default test;
```

`type="module"`을 사용하면 해당 파일에 `import`와 `export` 사용이 가능합니다. 또한 파일마다 독립적인 스코프를 가져, `foo.mjs` 파일과 `bar.mjs`파일의 `window`는 서로 공유되지 않습니다.

`type="module"`는 아직 많은 브라우저에서 모듈 시스템을 지원하지 않기 때문에 webpack이나 rollup 등의 번들러를 사용하는 것이 좋습니다.

# 요약
- CJS(CommonJS): 동기적인 특징으로 서버 사이드에서 사용하기 용이합니다.
- AMD(Asynchronous Module Definition): 비동기적인 특징으로 클라이언트 사이드에서 사용하기 용기합니다.
- UMD(Universal Module Definition): CJS와 AMD 모두 사용 가능한 모듈을 만들기 위해 사용됩니다.
- ESM(ECMAScript Module): 자바스크립트 공식 모듈 시스템입니다.
  - `<script type="module" src="index.mjs">`을 사용하여 브라우저에서도 모듈 시스템을 사용할 수 있습니다.

#### 참고
- [https://d2.naver.com/helloworld/12864](https://d2.naver.com/helloworld/12864)
- [https://iam-song.tistory.com/28](https://iam-song.tistory.com/28)
- [https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73](https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73)
- [https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)
- [https://minjung-jeon.github.io/AMD-CommonJS-RequireJS/](https://minjung-jeon.github.io/AMD-CommonJS-RequireJS/)
- [https://velog.io/@doondoony/JavaScript-Module-System](https://velog.io/@doondoony/JavaScript-Module-System)
- [https://velog.io/@zeros0623/JavaScript-ModuleCommonJS-Nodejs-RequireJS-AMD-ESM-UMD](https://velog.io/@zeros0623/JavaScript-ModuleCommonJS-Nodejs-RequireJS-AMD-ESM-UMD)
- [https://ko.wikipedia.org/wiki/CommonJS](https://ko.wikipedia.org/wiki/CommonJS)
- [https://programmingsummaries.tistory.com/321](https://programmingsummaries.tistory.com/321)
- [https://helloworldjavascript.net/pages/293-module.html](https://helloworldjavascript.net/pages/293-module.html)
- [https://riptutorial.com/ko/javascript/example/16339/범용-모듈-정의--umd-](https://riptutorial.com/ko/javascript/example/16339/범용-모듈-정의--umd-)
- [https://blog.rhostem.com/posts/2019-06-23-universal-module-definition-pattern](https://blog.rhostem.com/posts/2019-06-23-universal-module-definition-pattern)
- [https://poiemaweb.com/es6-module](https://poiemaweb.com/es6-module)
- [https://velog.io/@widian/웹에서-자바스크립트-모듈-사용하기](https://velog.io/@widian/웹에서-자바스크립트-모듈-사용하기)