---
layout: post
title: '[ETC] CORS란?'
featured-img: etc/cors.png
category: [tech, etc]
summary: 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)에 대해 살펴보도록 하겠습니다.
---

이번 포스트에서는 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)에 대해 이야기해보도록 하겠습니다. 아래 사진과 같은 에러를 보신 적이 있으셨을 수도 있습니다.

![access-control-allow-origin](/assets/img/posts/etc/access-control-allow-origin.png)

보통은 서버에서 해결해 줘야 하기 때문에 프론트엔드 개발자가 가볍게 넘길 수도 있지만, 어떤 이유로 발생하는 것인지, 어떻게 해결해야 하는 것인지 알아두는 것이 좋을 것 같아 포스팅을 준비하였습니다.

# CORS란?
![access-control-allow-origin](/assets/img/posts/etc/access-control-allow-origin.png)

위의 그림의 `CORS policy` 오류 메시지는 CORS 정책을 위반할 때 발생하게 됩니다. CORS는 Cross-Origin Resource Sharing의 약자입니다. 교차 출처 리소스 공유로 번역될 수 있는데, 브라우저에서 다른 출처의 리소스를 공유하는 방법입니다.

## URL 구조
다른 출처의 출처가 무엇인지 살펴봐야 하는데, 출처가 무엇인지 알기 위해서 먼저 URL의 구조를 살펴보아야 합니다. URL 구조는 아래 그림과 같습니다.

![URL 구조](/assets/img/posts/etc/url.png)

프로토콜의 HTTP는 80번, HTTPS는 443번 포트를 사용하는데, 80번과 443번 포트는 생략이 가능합니다.

## 출처(Origin)란?
출처(Origin)란 URL 구조에서 살펴본 Protocal, Host, Port를 합친 것을 말합니다. 브라우저 개발자 도구의 콘솔 창에 `location.origin`를 실행하면 출처를 확인할 수 있습니다.

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

# 동일 출처 정책(Same-Origin Policy)이란?
[Postman](https://www.postman.com/)으로 API를 테스트하거나, 다른 서버에서 API를 호출할 때는 멀쩡히 잘 동작하다가 브라우저에서 API를 호출할 때만 `CORS policy` 오류가 발생해서 당혹스러울 때가 있으셨을 수도 있습니다. 그 이유는 브라우저가 동일 출처 정책(Same-Origin Policy, SOP)를 지켜서 다른 출처의 리소스 접근을 금지하기 때문입니다. 하지만 실제로 웹페이지는 상당히 자주 다른 출처의 리소스를 사용해야 합니다. 예를 들어 `beomy.github.io`라는 도메인 주소를 사용하는 웹페이지에서 `beomy-api.github.io`라는 API 서버로 데이터를 요청해서 화면을 그린다면 이 웹페이지는 동일 출처 정책을 위반한 것이 됩니다.

## 동일 출처 정책의 장점
동일 출처 정책을 지키면 외부 리소스를 가져오지 못해 불편하지만, 동일 출처 정책은 [XSS](https://ko.wikipedia.org/wiki/사이트_간_스크립팅)나 [XSRF](https://ko.wikipedia.org/wiki/사이트_간_요청_위조) 등의 보안 취약점을 노린 공격을 방어할 수 있습니다. 하지만 현실적으로는 외부 리소스를 참고하는 것은 필요하기 때문에 외부 리소스를 가져올 수 있는 방법이 존재해야 합니다. 외부 리소스를 사용하기 위한 SOP의 예외 조항이 CORS입니다.

# CORS 동작원리
CORS의 동작 방식은 단순 요청 방법과 예비 요청을 먼저 보내는 방법 2가지 방법이 있습니다.

## Simple request
단순 요청 방법은 서버에게 바로 요청을 보내는 방법입니다. 아래 그림은 자바스크립트에서 API를 요청할 때 브라우저와 서버의 동작을 나타내는 그림입니다.

![단순 요청](/assets/img/posts/etc/cors_simle_request.png)

단순 요청은 서버에 API를 요청하고, 서버는 `Access-Control-Allow-Origin` 헤더를 포함한 응답을 브라우저에 보냅니다. 브라우저는 `Access-Control-Allow-Origin` 헤더를 확인해서 CORS 동작을 수행할지 판단합니다.

### Simple request 조건
서버로 전달하는 요청(request)이 아래의 3가지 조건을 만족해야 서버로 전달하는 요청이 단순 요청으로 동작합니다.

- 요청 메서드(method)는 GET, HEAD, POST 중 하나여야 합니다.
- Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width를 제외한 헤더를 사용하면 안 됩니다.
- Content-Type 헤더는 application/x-www-form-urlencoded, multipart/form-data, text/plain 중 하나를 사용해야 합니다.

첫 번째 조건은 어렵지 않은 조건이지만 2번, 3번 조건은 까다로운 조건입니다. 2번 조건은 사용자 인증에 사용되는 `Authorization` 헤더도 포함되지 않아 까다로운 조건이며, 3번 조건은 많은 REST API들이 `Content-Type`으로 `application/json`을 사용하기 때문에 지켜지기 어려운 조건입니다.

## Preflight request
Preflight 요청은 서버에 예비 요청을 보내서 안전한지 판단한 후 본 요청을 보내는 방법입니다. 아래 그림은 Preflight 요청 동작을 나타내는 그립입니다.

![Preflight request 요청](/assets/img/posts/etc/cors_preflight_request.png)

`GET`, `POST`, `PUT`, `DELETE` 등의 메서드로 API를 요청했는데, 크롬 개발자 도구의 네트워크 탭에 `OPTIONS` 메서드로 요청이 보내지는 것을 보신 적 있으시다면 CORS를 경험하셨던 것입니다. Preflight 요청은 실제 리소스를 요청하기 전에 `OPTIONS`라는 메서드를 통해 실제 요청을 전송할지 판단합니다.

`OPTIONS` 메서드로 서버에 예비 요청을 먼저 보내고, 서버는 이 예비 요청에 대한 응답으로 `Access-Control-Allow-Origin` 헤더를 포함한 응답을 브라우저에 보냅니다. 브라우저는 단순 요청과 동일하게 `Access-Control-Allow-Origin` 헤더를 확인해서 CORS 동작을 수행할지 판단합니다.

# CORS 에러 해결 방법
앞에서 이야기 한 CORS 동작 원리를 보면, 서버에서 `Access-Control-Allow-Origin` 헤더를 포함한 응답을 브라우저에 보내는 방식으로 CORS 에러를 해결할 수 있습니다. 프론트엔드 개발자가 CORS 에러를 확인했다면, 서버에 `Access-Control-Allow-Origin` 등 CORS를 해결하기 위한 몇 가지 응답 헤더를 포함해 달라고 요청해야 합니다.

Node.js의 Express는 `cors`라는 서드 파트 미들웨어를 지원합니다. 이 라이브러리에서 CORS 응답 헤더를 추가해 주기 때문에, 개발자가 별도의 CORS 응답 헤더를 추가해 주지 않아도 됩니다. 다른 프레임워크에서도 CORS를 해결해 주는 라이브러리가 존재합니다.

## HTTP 응답 헤더
라이브러리를 사용하면 간단하게 CORS를 해결할 수 있지만, CORS를 해결하기 위한 응답 헤더가 무엇이 있는지 하나씩 살펴보도록 하겠습니다.

### Access-Control-Allow-Origin: \<origin\> | *
`Access-Control-Allow-Origin` 헤더에 작성된 출처만 브라우저가 리소스를 접근할 수 있도록 허용합니다.

#### 사용 방법
아래와 같이 응답 헤더가 작성되었다면 `https://beomy.github.io` 페이지에서 브라우저는 서버 응답으로 온 리소스를 접근할 수 있습니다.

```
Access-Control-Allow-Origin: https://beomy.github.io
```

아래와 같이 `*`(와일드 카드)가 작성되었다면, 브라우저는 출처에 상관없이 모든 리소스에 접근할 수 있습니다.

```
Access-Control-Allow-Origin: *
```

#### 예제
아래 코드를 브라우저에서 실행하여 `Access-Control-Allow-Origin` 헤더를 처리하지 않은 서버에 API를 호출하게 되면,

```js
fetch('http://localhost:3001/cors', {
  method: 'PUT',
}).then(function(response) {
}).catch(function(error) {
})
```

아래와 같은 에러가 발생합니다.

![access-control-allow-origin](/assets/img/posts/etc/access-control-allow-origin.png)

서버에서 아래와 같이 응답 헤더를 추가해 주어야 합니다. 서버 코드는 Node.js의 Express로 작성하였습니다. 와일드카드를 사용하여 모든 출처에서 리소스를 접근할 수 있도록 설정하였습니다.

```js
router.options('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send()
})
router.put('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send()
})
```

### Access-Control-Allow-Methods: \<method\>[, \<method\>]*
브라우저에서 보내는 요청 헤더에 포함된 `Access-Control-Request-Method` 헤더에 대한 응답 결과입니다. 리소스 접근을 허용하는 HTTP 메서드를 지정해 주는 헤더입니다.

#### 사용 방법
사용 방법은 아래 코드와 같습니다. `Access-Control-Allow-Methods` 헤더에 `GET`, `PUT`, `POST`, `DELETE` 등의 HTTP 메서드를 `,`로 구분하여 넘겨줍니다.

```
Access-Control-Allow-Methods: GET, PUT
```

#### 예시
아래 코드를 브라우저에서 실행하여 `Access-Control-Allow-Methods` 헤더를 처리하지 않은 서버에 API를 호출하게 되면,

```js
fetch('http://localhost:3001/cors', {
  method: 'PUT',
}).then(function(response) {
}).catch(function(error) {
})
```

아래와 같은 에러가 발생합니다.

![access-control-allow-methods](/assets/img/posts/etc/access-control-allow-methods.png)

서버에서 아래와 같이 응답 헤더를 추가해 주어야 합니다.

```js
router.options('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'))
  res.send()
})
router.put('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send()
})
```

`Access-Control-Allow-Origin`는 `*`로 모든 출처를 허용한 상태이고, 브라우저의 요청 헤더에 포함된 `Access-Control-Request-Method` 헤더 값을 그대로 `Access-Control-Allow-Methods` 헤더에 추가해 주었습니다. `Access-Control-Request-Method` 헤더는 HTTP 요청 헤더에서 설명하도록 하겠습니다.

### Access-Control-Expose-Headers: \<header-name\>[, \<header-name\>]*
서버에서 응답 헤더에 `Access-Control-Expose-Headers`를 추가해 줘야 브라우저의 자바스크립트에서 헤더에 접근할 수 있습니다.

#### 사용 방법
아래와 같이 `,`로 구분하여 여러 개의 헤더를 넣을 수 있습니다.

```
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

#### 예시
서버에서 아래 코드와 같이 `Access-Control-Expose-Headers` 헤더에 `X-Custom-Beomy`를 추가해 주고, `X-Custom-Beomy` 헤더에 값을 담아 응답을 하면,

```js
router.options('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'))
  res.send()
})
router.put('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Expose-Headers', 'X-Custom-Beomy')
  res.set('X-Custom-Beomy', 'Bemoy')
  res.send()
})
```

브라우저에서는 아래 코드를 실행해서, `X-Custom-Beomy` 헤더 값을 가져올 수 있게 됩니다.

```js
fetch('http://localhost:3001/cors', {
  method: 'PUT',
}).then(function(response) {
  console.log(response.headers.get('X-Custom-Beomy')) // Beomy
}).catch(function(error) {
})
```

서버에서 `Access-Control-Expose-Headers: X-Custom-Beomy`로 자바스크립트에서 접근할 헤더를 명시해 주지 않으면, 자바스크립트에서 `X-Custom-Beomy` 헤더 값은 `undefined`가 됩니다.

### Access-Control-Allow-Headers: \<header-name\>[, \<header-name\>]*
브라우저에서 보내는 요청 헤더에 포함된 `Access-Control-Request-Headers` 헤더에 대한 응답 결과입니다.

#### 사용 방법
자바스크립트에서 커스텀 헤더를 서버에 전달하게 되면, `OPTIONS` 요청 헤더의 `Access-Control-Request-Headers` 헤더에 커스텀 헤더 이름이 추가됩니다. 서버에서는 `Access-Control-Request-Headers`에 작성된 값을 보고 `Access-Control-Allow-Headers` 응답 헤더에 커스텀 헤더 이름을 명시해 주어야 합니다.

```
Access-Control-Allow-Headers: X-Custom-Request
```

#### 예시
아래 코드를 브라우저에서 실행하여, `Access-Control-Allow-Headers` 처리되지 않은 API를 호출하게 되면,

```js
fetch('http://localhost:3001/cors', {
  method: 'PUT',
  headers: {
    'X-Custom-Request': 'Beomy',
  }
}).then(function(response) {
}).catch(function(error) {
})
```

아래와 같은 에러가 발생합니다.

![access-control-allow-headers](/assets/img/posts/etc/access-control-allow-headers.png)

서버에서 아래와 같이 응답 헤더를 추가해 주어야 합니다.

```js
router.options('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'))
  res.set('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'))
  res.send()
})
router.put('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  console.log(req.get('X-Custom-Request')) // Beomy
  res.send()
})
```

브라우저의 자바스크립트에서 `X-Custom-Request` 헤더에 `Beomy` 값을 서버에 전달하였고, 서버에서는 `Access-Control-Allow-Headers` 헤더에 `Access-Control-Request-Headers` 헤더 값을 저장하여 서버에서 `X-Custom-Request` 값을 사용할 수 있게 한 코드입니다.

### Access-Control-Max-Age: \<delta-seconds\>
preflight 요청 결과를 캐시 할 수 있는 시간을 나타냅니다.

#### 사용 방법
아래와 같이 초 단위로 캐시 시간을 설정합니다.

```
Access-Control-Max-Age: 60
```

위의 코드는 1분 동안 preflight 요청을 캐시 하는 코드입니다. 1분 동안 `OPTIONS` 메서드를 사용하는 예비 요청을 보내지 않습니다.

#### 예제
```js
fetch('http://localhost:3001/cors', {
  method: 'PUT'
}).then(function(response) {
}).catch(function(error) {
})
```

```js
router.options('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'))
  res.set('Access-Control-Max-Age', 60)
  res.send()
})
router.put('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.send()
})
```

서버에서 응답 헤더 `Access-Control-Max-Age`에 60을 지정하면 60초 동안에 preflight를 캐시 하기 때문에 60초 동안 OPTIONS 메서드를 통한 CORS 확인 동작 없이 동작하게 됩니다.

### Access-Control-Allow-Credentials: true
`credentials` 플래그가 `true`일 때 요청에 대한 응답을 할 수 있는지를 나타냅니다. `false`로 설정해 주고 싶을 경우에는 헤더를 생략하면 됩니다.

#### 사용 방법
```
Access-Control-Allow-Credentials: true
```

#### 예제
아래 코드를 브라우저에서 실행하여, `Access-Control-Allow-Credentials` 처리되지 않은 API를 호출하게 되면,

```js
fetch('http://localhost:3001/cors', {
  method: 'PUT',
  credentials: 'include'
}).then(function(response) {
}).catch(function(error) {
})
```

아래와 같은 에러가 발생합니다.

![access-control-allow-credentials](/assets/img/posts/etc/access-control-allow-credentials.png)

서버에서 아래와 같이 응답 헤더를 추가해 주어야 합니다.

```js
router.options('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://www.google.com')
  res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'))
  res.set('Access-Control-Allow-Credentials', true)
  res.send()
})
router.put('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://www.google.com')
  res.set('Access-Control-Allow-Credentials', true)
  res.send()
})
```

`Access-Control-Allow-Origin` 헤더도 `*`(와일드카드)가 아닌 출처를 명시해 주어야 합니다.

## HTTP 요청 헤더
CORS를 위해서, 브라우저에서 서버로 요청하는 헤더를 살펴보도록 하겠습니다. 요청 헤더들은 별도로 명시해 주지 않아도 브라우저에서 OPTIONS 요청에 추가합니다.

### Origin: \<origin\>
`Origin` 헤더는 요청하는 대상의 출처를 나타냅니다.

### Access-Control-Request-Method: \<method\>
`Access-Control-Request-Method` 헤더는 실제 요청에서 어떤 HTTP 메서드를 사용할지 서버에 알려주기 위해 사용됩니다.

### Access-Control-Request-Headers: \<field-name\>[, \<field-name\>]
`Access-Control-Request-Headers` 헤더는 브라우저에서 보내는 헤더를 서버에 알려주기 위해 사용됩니다.

# 기타 해결 방법
서버에서 응답 헤더들을 추가하는 방법 이외의 CORS를 우회하는 방법을 이야기해보도록 하겠습니다.

## JSONP
JSONP(JSON with Padding)은 `<script>` 요소는 외부 출처 리소스를 가져올 수 있는 특징을 사용하는 방법입니다. 아래 코드와 같은 방법으로 사용할 수 있습니다.

```html
<!-- Frontend -->
<!DOCTYPE html>
<html>
  <script>
    function jsonpFn (data) {
      console.log(data) // beomy
    }
  </script>
  <script
    type="application/javascript"
    src="http://localhost:3001/cors?callback=jsonpFn"
  >
  </script>
</html>
```

```js
// Backend
router.get('/cors', (req, res, next) => {
  res.send(`${req.query.callback}('beomy')`)
})
```

## 프록시 서버
프론트엔드와 백엔드 사이에 프록시 서버를 두는 방법으로 CORS를 해결할 수도 있습니다. 개발 환경에서 CORS를 해결해야 한다면, Webpack Dev Server 등의 라이브러리를 사용해서 프록시 설정을 하는 방법도 있습니다.

# 부록

## Request.credentials
`fetch` 메서드의 `credentials` 옵션은 `Access-Control-Allow-Credentials` 헤더와 연관된 옵션입니다. `credentials` 옵션은 아래와 같이 3개의 값을 가질 수 있습니다.

|옵션 값|설명|
|-----------------------------------|---------|
|same-origin (기본값)|같은 출처 간 요청에만 인증 정보를 전달함|
|include|모든 요청에 인증 정보를 전달함|
|omit|인증 정보를 전달하지 않음|

`same-origin`은 기본 값으로 같은 출처 간에 쿠키 등의 인증 정보 전달이 가능합니다. `include`는 출처에 상관없이 모든 요청에 쿠키 등의 인증 정보를 전달할 수 있습니다. `omit`은 쿠키 등의 인증 정보를 전달하지 않습니다.

아래와 같은 자바스크립트 코드를 출처가 `localhost:5000`인 페이지에서 실행할 경우,

```js
fetch('http://localhost:3001/cors', {
  method: 'PUT',
  credentials: 'include'
}).then(function(response) {
}).catch(function(error) {
})
```

서버에서 아래와 같이 CORS가 처리되어 있다면,

```js
router.options('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000')
  res.set('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'))
  res.set('Access-Control-Allow-Credentials', true)
  res.send()
})
router.put('/cors', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5000')
  res.set('Access-Control-Allow-Credentials', true)
  res.cookie('beomy', 'My name is Beomy', { maxAge: 10000 })
  res.send()
})
```

아래 그림과 같이 페이지와 서버 간의 출처가 다르더라고 쿠키가 세팅됩니다.

![credentials](/assets/img/posts/etc/credentials.gif)

`credentials: 'include'`로 설정되지 않는다면 다른 출처에서 쿠키를 세팅할 수 없습니다.

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [https://evan-moon.github.io/2020/05/21/about-cors/](https://evan-moon.github.io/2020/05/21/about-cors/)
- [https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy](https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy)
- [https://ko.wikipedia.org/wiki/동일-출처_정책](https://ko.wikipedia.org/wiki/동일-출처_정책)
- [https://velog.io/@yejinh/CORS-4tk536f0db](https://velog.io/@yejinh/CORS-4tk536f0db)
- [https://ko.wikipedia.org/wiki/JSONP](https://ko.wikipedia.org/wiki/JSONP)
- [https://velog.io/@jmkim87/지긋지긋한-CORS-파헤쳐보자](https://velog.io/@jmkim87/지긋지긋한-CORS-파헤쳐보자)
- [https://homoefficio.github.io/2015/07/21/Cross-Origin-Resource-Sharing/](https://homoefficio.github.io/2015/07/21/Cross-Origin-Resource-Sharing/)
- [https://developer.mozilla.org/ko/docs/Web/API/Request/credentials](https://developer.mozilla.org/ko/docs/Web/API/Request/credentials)