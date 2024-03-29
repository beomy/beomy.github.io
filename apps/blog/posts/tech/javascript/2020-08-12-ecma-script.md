---
layout: post
title: '[JavaScript] ECMAScript 란'
featured-img: javascript/js.png
category: [tech, javascript]
summary: ECMAScript와 TC39 제안 프로세스가 무엇인지 알아보도록 하겠습니다.
---

ECMAScript는 ES5, ES6 등의 줄임말로 많이 접해 보셨을 겁니다. 이번 포스트에서는 ECMAScript가 무엇인지 이야기하도록 하겠습니다.

## ECMAScript 란?
1996년 넷스케이프에서 넷스케이프 네비게이터 2.0을 출시하면서 자바스크립트를 지원하기 시작했습니다. 자바스크립트의 성공은 마이크로소프트가 J스트립트라는 언어를 개발하는 계기가 되었고 IE3에 J스크립트를 포함하여 출시하였습니다.

넷스케이프는 표준화를 위해 자바스크립트 기술 규격을 ECMA(European Computer Manufactureers Association) 인터네셔널에 제출하였고, 이 규격에 대한 작업은 ECMA-262 이름으로 1996년 11월에 시작되어, 초판은 1997년 6월에 채택되었습니다.

ECMAScript는 ECMA 이터내셔널의 ECMA-262 기술 규격을 지킨 스크립트 프로그래밍 언어를 이야기합니다. 자바스크립트가 가장 많이 알려져 있지만, 그 외에 액션스크립트나 IE에서 사용하는 J스크립트도 ECMAScript입니다. 그 밖에도 ECMA 인터네셔널에서는 ECMA-334라는 이름으로 C# 표준을, ECMA-372라는 이름으로 C++ 표준을 관리하고 있습니다.

## TC39 제안 프로세스
ECMA 인터내셔널의 여러 기술 위원회 중 TC39(Technial Committee)라는 위원회가 ECMA-262 명세를 관리합니다. TC39의 구성원은 Mozilla, Google, Apple, Microsofte, Facebook, Twitter 등 다양한 단체로 이루어져 있습니다.

TC39는 정기적으로 회의를 진행하는데, TC39에서 내리는 결정은 합의에 의해 이루어집니다. 단순 다수결이 아니라, 한 명이라도 강하게 거부권을 행사한다면 이에 대한 내용을 제고하는 방식을 사용합니다. [tc39/notes](https://github.com/tc39/notes/tree/master/meetings)에서 회의 내용을 확인할 수 있습니다.

ECMAScript의 제안 프로세스은 0단계(Stage0)부터 제안되어 각 단계를 거치게 됩니다. 다음 단계로 진행은 TC39의 승인을 받아야 합니다. 각각의 단계는 [TC39의 Github 계정](https://github.com/tc39)의 [proposals 저장소](https://github.com/tc39/proposals)에 등재됩니다. 0단계의 경우 [stage-0-proposals.md](https://github.com/tc39/proposals/blob/master/stage-0-proposals.md) 파일에서, 1단계의 경우 [stage-1-proposals.md](https://github.com/tc39/proposals/blob/master/stage-1-proposals.md) 파일에서, 2단계와 3단계의 경우 [README.md](https://github.com/tc39/proposals/blob/master/README.md) 파일에서 확인할 수 있습니다. 비활성 된 제안들은 [inactive-proposals.md](https://github.com/tc39/proposals/blob/master/inactive-proposals.md) 파일에서 확인할 수 있습니다.

### Stage0 - strawman (허수아비)
특별한 형식 없이, 자유 형식으로 아이디어를 제출하는 단계입니다. TC39의 컨트리뷰터로 등록한 누구나 제안이 가능합니다. TC39의 회의 안건에 상정되고 0단계 문서([stage-0-proposals.md](https://github.com/tc39/proposals/blob/master/stage-0-proposals.md)에 등재되면 0단계 제안이 됩니다.

### Stage1 - Proposal (제안)
1단계가 되면 가장 먼저 챔피언(champion)을 정해야 합니다. 챔피언이란 해당 제안을 책임지고 다음 단계로 끌고 나갈 TC39 구성원을 말합니다. [stage-1-proposals.md](https://github.com/tc39/proposals/blob/master/stage-1-proposals.md) 파일을 보면 아래와 같이 챔피언이 결정된 것을 볼 수 있습니다.

![Proposal 챔피언](/assets/img/posts/javascript/tc39_proposal_1_champion.png)

1단계에서는 제안된 내용을 텍스트 형태로 설명해야 하며, 알고리즘, 예제 API, 잠재적인 구현 문제 등을 제시해야 하고, 폴리필과 데모 등을 구현해야 합니다. 1단계에서 제안된 내용은 이후의 단계를 거치며 많은 부분이 변경될 수 있습니다.

1단계에 진입한다는 것은 본격적으로 TC39 위원회 수준에서 시간과 노력을 투자해 해당 아이디어를 논의할 의사를 나타낸 것으로 볼 수 있습니다.

### Stage2 - Draft(초안)
2단계에서부터는 제안들은 각각의 저장소를 가집니다.

2단계에서는 공식 사양 언어(formal spec language)를 사용하여 문법(syntax)과 의미(semantics)를 설명하는 초안이 작성되어야 합니다. 이 초안은 제안이 실제 표준에 편입될 경우 사용되는 명세의 초기 버전입니다. 중요한 의미와 문법, API가 포함되어야 합니다. 앞으로 해야 할 일들(TODO) 등을 포함하는 일부 불완전한 명세가 허용됩니다. 2단계 이후에서는 적은 변경들만 허용되게 됩니다.

2단계에 진입했다는 것은 위원회가 해당 제안을 발전시켜 결국 표준에 포함시키고자 하는 의지가 있는 것으로 볼 수 있습니다.

### Stage3 - Candidate(후보)
3단계는 구현 주체나 사용자들로부터 피드백을 받는 단계입니다.

3단계에서는 모든 의미, 문법, API가 완성된 명세가 필요합니다. 3단계에 진입한 제안은 완성에 가깝습니다. 구현된 내용이나, 사용에 문제가 있는 경우에만 수정이 가능합니다.

### Stage4 - Finished(완료)
ECMAScript 표준에 포함될 준비를 마친 상태입니다.

ECMA-262의 단위 테스트인 Test262에 테스트가 작성되고 병합이 완료가 되어있는 상태여야 합니다. 승인 테스트를 통과한 2개 이상의 구현체가 있어야 합니다. 스팩 문서와 함께 [tc39/ecma262](https://github.com/tc39/ecma262)에 PR(pull request)이 요청된 상태이며, 모든 ECMAScript 에디더들이 PR을 승인이 완료된 상태입니다.

4단계의 제안은 가장 빠른 새 표준에 포함되어 발표됩니다.

##### 참고
- [https://medium.com/sjk5766/ecma-script-es-정리와-버전별-특징-77715f696dcb](https://medium.com/sjk5766/ecma-script-es-정리와-버전별-특징-77715f696dcb)
- [https://ko.wikipedia.org/wiki/ECMA스크립트](https://ko.wikipedia.org/wiki/ECMA스크립트)
- [https://github.com/tc39/ecma262](https://github.com/tc39/ecma262)
- [https://ko.wikipedia.org/wiki/Ecma_인터내셔널](https://ko.wikipedia.org/wiki/Ecma_인터내셔널)
- [https://www.zerocho.com/category/ECMAScript/post/5eae7480e70c21001f3e7956](https://www.zerocho.com/category/ECMAScript/post/5eae7480e70c21001f3e7956)
- [https://ahnheejong.name/articles/ecmascript-tc39/](https://ahnheejong.name/articles/ecmascript-tc39/)
- [https://trustyoo86.github.io/javascript/2019/12/11/tc39-process.html](https://trustyoo86.github.io/javascript/2019/12/11/tc39-process.html)
- [https://tc39.es/process-document/](https://tc39.es/process-document/)
