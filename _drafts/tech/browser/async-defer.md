---
layout: post
title: '[Browser] async와 defer'
featured-img: browser/browser.png
category: [tech, browser]
---
{% include toc.html %}

자바스크립트는 파서 차단 리소스(parser blocking resource)입니다. 브라우저는 HTML을 파싱하다가 자바스크립트를 만나면 진행하던 파싱을 중단하고 자바스크립트 리소스를 다운받아 파싱하고 실행합니다. 자세한 내용은 [JavaScript와 CSS](/tech/browser/browser-rendering/#참고-javascript와-css)를 참고 바랍니다.

브라우저는 `<script>`를 만나면 파싱을 차단하고 리소스를 다운받고, 파싱하고, 실행하기 때문에 화면을 렌더링하는데 그 만큼 시간이 소모 되어 사용성을 떨어트립니다. 이번 포스트에서는 `<script>`를 비동기 처리하여 브라우저의 파싱을 차단하지 않는 방법에 대해 이야기 할 것입니다.

# `<script>` 사용
`async`와 `defer` 모두 사용하지 않는 기본 모드입니다.

`<script>`는 인라인 코드인 경우 파싱되고 실행되지만 외부 스크립트인 경우 리소스를 다운받고, 파싱되고, 실행됩니다. 브라우저는 스크립트 파일을 다운받고 파싱되고 실행될 때까지 HTML 파싱을 중단합니다.

## 렌더링 순서
![script 렌더링 순서](/assets/img/posts/browser/script_parsing.png)

위의 그림과 같이 스크립트를 가져와서 실행이 끝날 때까지 HTML 파싱이 중단되어 화면이 출력되는 시간이 길어집니다.

# `<script ... async>` 사용

## 렌더링 순서

## 특징

## 지원 브라우저

# `<script ... defer>` 사용

## 렌더링 순서

## 특징

## 지원 브라우저

# 무엇을 사용할 것인가

# 부록: `<noscript>`

#### 참고
- [https://blog.asamaru.net/2017/05/04/script-async-defer/](https://blog.asamaru.net/2017/05/04/script-async-defer/)
- [https://appletree.or.kr/blog/web-development/javascript/script-태그의-async와-defer-속성/](https://appletree.or.kr/blog/web-development/javascript/script-태그의-async와-defer-속성/)
- [https://muckycode.blogspot.com/2015/01/javascript-html-script-async-defer.html](https://muckycode.blogspot.com/2015/01/javascript-html-script-async-defer.html)
- [https://realmojo.tistory.com/96](https://realmojo.tistory.com/96)