---
layout: post
title: '[ETC] CORS란?'
featured-img: etc/cors.png
category: [tech, etc]
summary: 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)에 대해 살펴보도록 하겠습니다.
---

이번 포스트에서는 CORS에 대해 이야기 해보도록 하겠습니다. 아래 사진과 같은 에러를 보신적이 있으셨을 수도 있습니다.

![CORS 오류](/assets/img/posts/etc/cors_error.png)

보통은 서버쪽에서 해결해 줘야하기 때문에 프론트엔드 개발자가 가볍게 넘길 수도 있지만, 가볍게 넘기더라도 어떤 이유로 발생하는 이슈인지, 어떻게 해결하는 것인지 아는 것이 개념을 알아두는 것이 좋을 것 같아 포스팅을 준비하였습니다.

# CORS이란?
위의 그림의 `CORS policy` 오류 메시지는 CORS 정책을 위반할 때 발생하게 됩니다. CORS는 Cross-Origin Resource Sharing의 약자입니다. 교차 출처 리소스 공유로 번역 될 수 있는데, 다른 출처의 리소스를 공유하는 방법입니다.

### URL 구조
다른 출처(Origin)의 출처가 무엇인지 살펴봐야 하는데, 출처가 무엇인지 알기 위해서 먼저 URL의 구조를 살펴보아야 합니다. URL 구조는 아래 그림과 같습니다.

![URL 구조](/assets/img/posts/etc/url.png)

프르토콜의 HTTP는 80번, HTTPS는 443번 포트를 사용하는데, 80번과 443번 포트는 생략이 가능합니다.

## 출처(Origin)란?
출처(Origin)란 URL 구조에서 살펴본 Protocal, Host, Port를 합친 것을 말합니다. 브라우저 개발자 도구의 콘솔창에 `location.origin`를 실행하면 출처를 확인 할 수 있습니다.

![location.origin](/assets/img/posts/etc/location_origin.png)

## 같은 출처 VS 다른 출처
같은 출처인지 다른 출처인지 이해를 돕기 위해 예제를 하나 살펴보도록 하겠습니다. 현재 웹페이지의 주소가 `https://beomy.github.io/tech/`일 때 같은 출처인지 다른 출처인지 아래 테이블과 같은 결과를 얻을 수 있습니다.

|URL|결과|이유|
|-----------------------------------|---------|-------------------------|
|`https://beomy.github.io/about`|같은 출처|Protocal, Host, Port 동일|
|`https://beomy.github.io/about?q=work`|같은 출처|Protocal, Host, Port 동일|
|`https://beomy.github.io/about#work`|같은 출처|Protocal, Host, Port 동일|
|`http://beomy.github.io`|다른 출처|Protocal 다름|
|`https://beomy.github.io:81/about`|다른 출처|Port 다름|
|`https://beomy.heroku.com`|다른 출처|Host 다름|

# 동일 출처 정책(Same-Origin Policy, SOP)이란?
[Postman](https://www.postman.com/)으로 API를 테스트 하거나, 다른 서버에서 API를 호출할 때는 멀쩡히 잘 동작하다가 브라우저에서 API를 호출 할때만 `CORS policy` 오류가 발생해서 당혹스러울 때가 있으셨을 수도 있습니다. 그 이유는 브라우저가 동일 출처 정책(Same-Origin Policy, SOP)를 지켜서 다른 출처의 리소스 접근을 금지하기 때문입니다. 하지만 실제로 웹페이지는 상당히 자주 다른 출처의 리소스를 사용해야 합니다. 예를 들어 `beomy.github.io`라는 도메인 주소를 사용하는 웹페이지에서 `beomy-api.github.io`라는 API 서버로 데이터를 요청해서 화면을 그린다면 이 웹페이지는 동일 출처 정책을 위반한 것이 됩니다.

## 동일 출처 정책의 장점
동일 출처 정책을 지키면 외부 리소스를 가져오지 못해 불편하지만, 동일 출처 정책은 [XSS](https://ko.wikipedia.org/wiki/사이트_간_스크립팅)나 [XSRF](https://ko.wikipedia.org/wiki/사이트_간_요청_위조)등의 보안 취약점을 노린 공격을 방어할 수 있습니다. 하지만 현실적으로는 외부 리소스를 참고하는 것은 필요하기 때문에 외부 리소스를 가져올 수 있는 방법이 존재해야 합니다. 외부 리소스를 사용하기 위한 SOP의 예외 조항이 CORS입니다.

# CORS 동작원리
CORS의 동작방식은 단순 요청 방법과 예비 요청을 먼저 보내는 방법 2가지 방법이 있습니다.

## Simple request
단순 요청 방법은 서버에게 바로 요청을 보내는 방법입니다. 아래 그림은 자바스크립트에서 API를 요청할 때 브라우저와 서버의 동작을 나타내는 그림입니다.

![단순 요청](/assets/img/posts/etc/cors_simle_request.png)

단순 요청은 서버에 API를 요청하고, 서버는 `Access-Controll-Allow-Origin` 헤더를 포함한 응답을 브라우저에 보냅니다. 브라우저는 `Access-Controll-Allow-Origin` 헤더를 확인해서 CORS 동작을 수행할지 판단합니다.

### Simple request 조건
서버로 전달하는 요청(request)이 아래의 3가지 조건을 만족해야 서버로 전달하는 요청이 단순 요청으로 동작합니다.

- 요청 메소드(method)는 GET, HEAD, POST 중 하나여야 합니다.
- Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width를 제외한 헤더를 사용하면 안됩니다.
- Content-Type 헤더는 application/x-www-form-urlencoded, multipart/form-data, text/plain 중 하나를 사용해야 합니다.

첫번째 조건은 어렵지 않은 조건이지만 2번, 3번 조건은 까다로운 조건입니다. 2번 조건은 사용자 인증에 사용되는 `Authorization` 헤더도 포함되지 않아 까다로운 조건이며, 3번 조건은 많은 REST API들이 `Content-Type`으로 `application/json`을 사용하기 때문에 지켜지기 어려운 조건입니다.

## Preflight request
Preflight 요청는 서버에 예비 요청을 보내서 안전한지 판단한 후 본 요청을 보내는 방법입니다. 아래 그림은 Preflight 요청 동작을 나탸내는 그립입니다.

![Preflight request 요청](/assets/img/posts/etc/cors_preflight_request.png)

`GET`, `POST`, `PUT`, `DELETE` 등의 메소드로 API를 요청했는데, 크롬 개발자도구의 네트워크 탭에 `OPTIONS` 메소드로 요청을 보내는 것을 보신적 있으시다면 CORS를 경험하셨던 것입니다. Preflight 요청은 실제 리소스를 요청하기 전에 `OPTIONS`라는 메소드를 통해 실제 요청을 전송할지 판단합니다.

`OPTIONS` 메소드로 서버에 예비 요청을 먼저 보내고, 서버는 이 예비 요청에 대한 응답으로 `Access-Controll-Allow-Origin` 헤더를 포함한 응답을 브라우저에 보냅니다. 브라우저는 단순 요청과 동일하게 `Access-Controll-Allow-Origin` 헤더를 확인해서 CORS 동작을 수행할지 판단합니다.

# CORS 에러 해결방법
앞에서 이야기 한 CORS 동작 원리를 보면, 서버에서 `Access-Controll-Allow-Origin` 헤더를 포함한 응답을 브라우저에 보내는 방식으로 CORS 에러를 해결 할 수 있습니다. 프론트엔드 개발자가 CORS 에러를 확인했다면, 서버측에 응답(response)에 `Access-Controll-Allow-Origin` 헤더를 포함해 달라고 요청해야 합니다.

## HTTP 응답 헤더
`Access-Controll-Allow-Origin` 뿐만 아니라, CORS를 위한 몇가지 응답 헤더가 있습니다.

### Access-Controll-Allow-Origin: \<origin\> | *
`Access-Controll-Allow-Origin` 헤더에 작성된 출처만 브라우저가 리소스에 접근 할 수 있도록 허용합니다. 아래와 같이 헤더가 작성되었다면 `beomy-api.heroku.com`에서만 브라우저가 리소스를 접근 할 수 있습니다.

```
Access-Controll-Allow-Origin: beomy-api.heroku.com
```

아래와 같이 `*`(와일드 카드)가 작성되었다면, 브라우저는 출처에 상관 없이 모든 리소스에 접근할 수 있습니다.

```
Access-Controll-Allow-Origin: *
```

### Access-Control-Expose-Headers: \<header-name\>[, \<header-name\>]
Access-Control-Allow-Headers와 차이?

### Access-Control-Max-Age: \<delta-seconds\>

### Access-Control-Allow-Credentials: true

### Access-Control-Allow-Methods: \<method\>[, \<method\>]

### Access-Control-Allow-Headers: \<header-name\>[, \<header-name\>]

## HTTP 요청 헤더

### Origin: <origin>

### Access-Control-Request-Method: <method>

### Access-Control-Request-Headers: <field-name>[, <field-name>]

# 기타 해결방법

## JSONP

## 프록시..?
개발 환경에서만 가능?

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [https://evan-moon.github.io/2020/05/21/about-cors/](https://evan-moon.github.io/2020/05/21/about-cors/)
- [https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy)
- [https://ko.wikipedia.org/wiki/동일-출처_정책](https://ko.wikipedia.org/wiki/동일-출처_정책)
- [https://velog.io/@yejinh/CORS-4tk536f0db](https://velog.io/@yejinh/CORS-4tk536f0db)
- [https://ko.wikipedia.org/wiki/JSONP](https://ko.wikipedia.org/wiki/JSONP)