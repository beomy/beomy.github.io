---
layout: post
title: '[JavaScript] ECMAScript란'
featured-img: javascript/js.png
category: [tech, javaScript]
summary: ECMAScript가 무엇인지 이야기하도록 하겠습니다.
---
{% include toc.html %}

ECMAScript는 ES5, ES6 등의 줄임말로 많이 접해 보셨을 겁니다. 이번 포스트에서는 ECMAScript가 무엇인지 이야기 하도록 하겠습니다.

# ECMAScript 란?
1996년 넷스케이프에서 넷스케이프 네비게이터 2.0을 출시하면서 자바스크립트를 지원하기 시작했습니다. 자바스크립트의 성공은 마이크로소프트가 J스트립트라는 언어를 개발하는 계기가 되었고 IE3에 J스크립트를 포함하여 출시하였습니다. 넷스케이프는 표준화를 위해 자바스크립트 기술 규격을 ECMA(European Computer Manufactureers Association) 인터네셔널에 제출하였고, 이 규격에 대한 작업은 ECMA-262 이름으로 1996년 11월에 시작되어, 초판은 1997년 6월에 채택되었습니다.

ECMAScript는 ECMA 이터내셔널의 ECMA-262 기술 규격을 지킨 스크립트 프로그래밍 언어를 이야기합니다. 자바스크립트가 가장 많이 알려져 있지만, 그외에 액션스크립트나 IE에서 사용하는 J스크립트도 ECMAScript입니다.

(ECMA 인터네셔널에서는 자바스크립트 이외에도, ECMA-334라는 이름으로 C# 표준을, ECMA-372라는 이름으로 C++ 표준을 관리하고 있습니다.)

# TC39 제안 프로세스
ECMA 인터내셔널의 여러 기술 위원회 중 TC39(Technial Committee)라는 위원회가 ECMA-262 명세를 관리합니다. TC39의 구성원은 Mozilla, Google, Apple, Microsofte, Facebook, Twitter 등 다양한 단체로 이루어져 있습니다.

TC39는 정기적으로 회의를 진행하는데, TC39에서 내리는 결정은 합의에 의해 이루어집니다. 단순 다수결이 아니라, 한명이라도 강하게 거부권을 행사한다면 이에 대한 내용을 제고하는 방식을 사용합니다.

ECMAScript의 각 기능은 0단계(Stage0)부터 제안되어 각 단계를 거치게됩니다. 다음 단계로 진행은 TC39의 승인을 받아야 합니다.

## Stage0 - strawman (허수아비)

## Stage1 - Proposal (제안)

## Stage2 - Draft(초안)

## Stage3 - Candidate(후보)

## Stage4 - Finished(완료)

#### 참고
- [https://medium.com/sjk5766/ecma-script-es-정리와-버전별-특징-77715f696dcb](https://medium.com/sjk5766/ecma-script-es-정리와-버전별-특징-77715f696dcb)
- [https://ko.wikipedia.org/wiki/ECMA스크립트](https://ko.wikipedia.org/wiki/ECMA스크립트)
- [https://github.com/tc39/ecma262](https://github.com/tc39/ecma262)
- [https://ko.wikipedia.org/wiki/Ecma_인터내셔널](https://ko.wikipedia.org/wiki/Ecma_인터내셔널)
- [https://www.zerocho.com/category/ECMAScript/post/5eae7480e70c21001f3e7956](https://www.zerocho.com/category/ECMAScript/post/5eae7480e70c21001f3e7956)
- [https://ahnheejong.name/articles/ecmascript-tc39/](https://ahnheejong.name/articles/ecmascript-tc39/)
- [https://trustyoo86.github.io/javascript/2019/12/11/tc39-process.html](https://trustyoo86.github.io/javascript/2019/12/11/tc39-process.html)