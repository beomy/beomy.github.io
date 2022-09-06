---
layout: post
title: '[JavaScript] 실행 컨텍스트'
featured-img: javascript/js.png
category: [tech, javascript]
summary:
---

- 실행 컨텍스트는 실행할 코드에 제공할 환경 정보를 모아놓은 객체입니다.
  - `VariableEnvironment`, `LexicalEnvironment`, `ThisBinding`으로 구성되어 있습니다.
- 함수가 실행되면 실행 컨텍스트가 만들어지고, 콜 스택에 쌓입니다.
- `LexicalEnvironment.environmentRecode`에 현재 컨텍스트에서 사용되는 매개변수, 선언한 함수, 선언된 변수 등의 정보를 담습니다.
  - 이런 과정에서 호이스팅이라는 개념이 등장합니다.
  - 함수 선언식(`function sum () { ... }`)과 함수 표현식(`var sum = function () { ... }`)의 차이는 호이스팅에 있습니다.
- `LexicalEnvironment.outerEnvironmentReference`는 현재 호출된 함수가 선언될 당시의 `LexicalEnvironment`를 참조합니다.
  - A 함수 내부에서 B 함수를 선언하고 다시 B 함수 내부에서 C 함수를 선언할 경우 함수 C의 `LexicalEnvironment.outerEnvironmentReference`는 함수 B의 `LexicalEnvironment`이고 함수 B의 `LexicalEnvironment.outerEnvironmentReference`는 함수 A의 `LexicalEnvironment`입니다.
  - 이런 이유로 스코프 체인(변수의 유효범위를 안에서부터 바깥으로 차례로 검색해 나가는 것)이 가능합니다.

# LexicalEnvironment
매겨변수, 함수 등등의 정보를 담음

# VariableEnvironment
LexicalEnvironment의 초기 스냅샷

# LexicalEnvironment
# ThisBinding
this를 바인딩
#### 참고
- 코어 자바스크립트
