---
layout: post
title: '[ETC] CORS란?'
featured-img: browser/browser.png
category: [tech, browser]
summary: 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)에 대해 살펴보도록 하겠습니다.
---

# CORS이란?
CORS는 Cross-Origin Resource Sharing의 약자입니다. 교차 출처 리소스 공유로 번역 될 수 있는데, 다른 출처의 리소스를 공유하는 방법입니다.

## 출처(Origin)란?
여기서 말씀드리는 출처(Origin)란 Protocal, Host, Port를 모두 합친 것을 말합니다. 브라우저 dev-tool의 콘솔창에 `location.origin`를 실행하면 출처를 확인 할 수 있습니다.

~~출처 그림~~

HTTP는 80번, HTTPS는 443번 포트를 사용하는데 생략이 가능합니다. 위의 그림을 보면 HTTPS 프로토콜을 사용하기 때문에 HTTPS 프로토콜의 443번 포트가 생략된 주소입니다.

## 같은 출처 VS 다른 출처
현재 웹페이지의 주소가 `https://beomy.github.io/tech/`일 때, 같은 출처인지 다른 출처인지 아래 테이블과 같이 결과를 얻을 수 있습니다.

|URL|결과|이유|
|-----------------------------------|---------|-------------------------|
|`https://beomy.github.io/about`|같은 출처|Protocal, Host, Port 동일|
|`https://beomy.github.io/about?q=work`|같은 출처|Protocal, Host, Port 동일|
|`https://beomy.github.io/about#word`|같은 출처|Protocal, Host, Port 동일|
|`http://beomy.github.io`|다른 출처|Protocal 다름|
|`http://beomy.github.io:81/about`|다른 출처|Port 다름|
|`http://beomy.heroku.com`|다른 출처|Host 다름|

## 동일 출처 정책(Same-Origin Policy, SOP)이란?
브라우저는 동일 출처 정책(Same-Origin Policy, SOP)를 지켜서 다른 출처의 리소스 접근을 금지합니다.

~~동일 출처 정책 장점~~

하지만 실제로 웹페이지는 상당히 자주 다른 출처의 리소스를 사용해야 합니다. 예를 들어 `beomy.github.io`라는 도메인 주소를 사용하는 웹페이지에서 `beomy-api.github.io`라는 API 서버로 데이터를 요청해서 화면을 그린다면 이 웹페이지는 동일 출처 정책을 위반한 것이 됩니다.

# CORS 해결 방법

## HTTP 응답 헤더

## HTTP 요청 헤더

# CORS 동작 방법

## Simple request

## Preflight Request

# CORS를 사용하는 요청

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [https://evan-moon.github.io/2020/05/21/about-cors/](https://evan-moon.github.io/2020/05/21/about-cors/)
