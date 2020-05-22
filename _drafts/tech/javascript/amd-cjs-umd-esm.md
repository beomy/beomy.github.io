---
layout: post
title: '[JavaScript] AMD, CJS, UMD, ESM'
featured-img: javascript/js.png
category: [tech, javaScript]
summary: 자바스크립트를 모듈화할 수 있게 한 AMD, CJS, UMD, ESM에 대해 살펴보겠습니다.
---
{% include toc.html %}

처음 자바스크립트는 모듈을 가져오거나 내보내는 방법이 없어, 하나의 파일에 모든 기능들이 들어가야 했습니다. AMD, CJS, UMD, ESM이 등장 후에는 모듈 개발이 가능해졌고, 자바스크립트 또한 모듈로 개발하고 배포할 수 있게 되었습니다. 이번 포스트에서는 모듈화 개발을 할 수 있게 한 AMD, CJS, UMD, ESM을 살펴보겠습니다.

# CJS (CommonJS)
CommonJS([http://www.commonjs.org/](http://www.commonjs.org/))는 이름의 'Common'에서 알 수 있듯이 JavaScript를 브라우저에서뿐만 아니라 범용 언어로 사용할 수 있도록 하겠다는 의지를 가진 워킹 그룹입니다.

## 코드 예제

## 특징: 동기
CommonJS는 동기적인 특성으로 브라우저 뿐만 아니라 서버사이드에서도 사용하기 용이합니다. Node.js도 CommonJS를 채택하여 사용하고 있습니다.

# AMD (Asynchronous Module Definition)

## 코드 예제

## 특징: 비동기
AMD는 비동기적인 특성으로 클라이언트 사이드 개발에 적합합니다.

# UMD (Universal Module Definition)

## 코드 예제

## 특징: FE, BE 모두 사용가능
디자인 패턴에 가까움

# ESM (ECMAScript Module)
ES6에 추가됨

## 코드 예제

## 특징: 자바스크립트 자체 모듈 시스템

#### 참고
- [https://d2.naver.com/helloworld/12864](https://d2.naver.com/helloworld/12864)
- [https://iam-song.tistory.com/28](https://iam-song.tistory.com/28)
- [https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73](https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73)
- [https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)
- [https://kishu.github.io/2017/05/23/setting-up-multi-platform-npm-packages/](https://kishu.github.io/2017/05/23/setting-up-multi-platform-npm-packages/)
- [https://minjung-jeon.github.io/AMD-CommonJS-RequireJS/](https://minjung-jeon.github.io/AMD-CommonJS-RequireJS/)
- [https://velog.io/@doondoony/JavaScript-Module-System](https://velog.io/@doondoony/JavaScript-Module-System)
- [https://velog.io/@zeros0623/JavaScript-ModuleCommonJS-Nodejs-RequireJS-AMD-ESM-UMD](https://velog.io/@zeros0623/JavaScript-ModuleCommonJS-Nodejs-RequireJS-AMD-ESM-UMD)