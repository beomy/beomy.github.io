---
layout: post
title: '[Browser] Cookie 톺아보기'
featured-img: browser/cookie.png
category: [tech, browser]
summary: 쿠키를 통해 사용자 인증이 이루어질 경우 쿠키가 탈취 되었을 때 큰 피해가 발생 할 수 있기 때문에 쿠키를 사용하기 전에 쿠키가 무엇인지 이해하고 주의하며 사용하는 것은 중요합니다.
---

이번 포스트에서는 쿠키에 대해 살펴보도록 하겠습니다.

쿠키를 통해 사용자 인증이 이루어 질 수 있고, 쿠키를 통해 사용자 인증이 이루어질 경우 쿠키가 탈취 되었을 때 큰 피해가 발생 할 수 있기 때문에 쿠키를 사용하기 전에 쿠키가 무엇인지 이해하고 주의하며 사용하는 것은 중요합니다.

# 쿠키란
쿠키는 HTTP 쿠키, 웹 쿠키, 브라우저 쿠키라고도 불리웁니다. 쿠키는 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각입니다. 브라우저는 이 데이터 조각을 저장해 놓았다가 동일한 서버에 재 요청 시 이 정보를 함께 전송합니다.

서버에서 쿠키를 설정해 주기 때문에 쿠키가 브라우저 간에 공유된다고 혼동을 줄 수 있지만, 브라우저에서 쿠키를 저장하기 때문에 브라우저 간의 쿠키는 공유 되지 않습니다.

과거(쿠키가 클라이언트 측에 정보를 저장할 수 있는 유일한 방법이 었을 때)에는 클라이언트 측에 정보를 저장하기 위해 쿠키가 주로 사용되었지만, 모든 요청마다 쿠키가 함께 전송되기 때문에 성능 저하의 원인이 될 수 있어 지금은 클라이언트 측에 저장하기 위해서는 로컬 스토리지나 세션 스토리지를 사용하는 것이 좋습니다.

# 쿠키 목적
쿠키는 상태가 없는(stateless) HTTP 프로토콜에서 상태 정보를 기억하기 위해 사용됩니다. 상태가 없는(무상태) 프로토콜은 이전 요청과 상관없이 각각의 요청을 독립적인 트랜잭션으로 취급하기 때문에 이전 요청의 상태를 저장하지 않습니다. 쿠키를 사용하면 이전 요청의 상태를 저장할 수 있기 때문에 쿠키는 크게 아래와 같은 3가지 목적으로 사용됩니다.

- 세션 관리(Sessing Mnangement): 서버에 저장해야 할 로그인, 장바구니 등의 정보 관리
- 개인화(Personalization): 사용자 선호, 테마 등의 정보 관리
- 트래킹(Tracking): 사용자 행동을 기록하고 분석하기 위한 정보 관리

# 쿠키 구조
쿠키의 구조는 아래와 같이 3개의 요소로 구성됩니다.

- 이름
- 값
- 속성(이름/값의 쌍)

이름과 값은 필수 값입니다. 속성은 옵션 값으로 쿠키 만료 기간, 도메인 등의 정보가 올 수 있습니다.

# 쿠키 전송
서버는 HTTP 요청에 응답 할 때 응답에 `Set-Cookie` 헤더를 전송하면, 브라우저에서는 `Set-Cookie` 헤더를 보고 쿠키를 저장합니다. 그 후 브라우저에서 같은 서버에 요청을 할 때 `Cookie` 헤더에 쿠키를 포함하여 전송합니다.

## 서버 -> 브라우저
서버에서 설정한 쿠키를 브라우저로 전달하기 위해 응답 헤더 중 `Set-Cookie` 헤더에 쿠키를 추가하여 응답을 보내면 됩니다.

### `Set-Cookie` 헤더
서버에서 브라우저로 보내는 응답 헤더에 `Set-Cookie` 헤더를 포함하면 브라우저가 쿠키를 저장하게 됩니다. `Set-Cookie` 헤더를 설정할 수 있는 간단한 형태는 아래 코드와 같습니다.

```none
Set-Cookie: <cookie-name>=<cookie-value>
```

아래 코드와 같이 서버에서 브라우저로 `Set-Cookie` 헤더에 쿠키의 이름과 값을 포함한 응답을 보내면,

```none
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: id=beomy
Set-Cookie: post=cookie

[page content]
```

브라우저는 id라는 쿠키 이름으로 beomy 값을, post라는 쿠키 이름으로 cookie 값을 저장합니다.

## 브라우저 -> 서버
브라우저에서 서버로 보내는 요청 헤더 주에 `Cookie`라는 헤더에 서버로 보낼 쿠키들이 저장되어 있습니다. 별도로 `Cookie` 헤더를 설정해 줄 필요 없이 유효한 쿠키가 있다면 자동으로 `Cookie` 헤더에 유효한 쿠키들이 추가되어 서버로 요청을 보내게 됩니다.

### `Cookie` 헤더
브라우저는 `Cookie` 헤더에 서버에서 전달 받은 모든 쿠키들을 담아 서버에 요청을 보냅니다. 아래 코드와 같이 `Cookie` 헤더에 쿠키를 포함하여 서버에 요청을 보냅니다.

```none
GET /sample_page.html HTTP/1.1
Host: beomy.github.io
Cookie: id=beomy; post=cookie
```

서버에서 `Set-Cookie` 헤더로 id와 post 쿠키를 전달 받은 이후에 브라우저에서 서버로 새로운 요청을 보낼 때 `Cookie` 헤더에 위의 코드와 같이 id와 post 쿠키를 함께 전달합니다.

# 쿠키 속성
서버에서 쿠키를 전송할 때 만료일, 지속 시간, 도메인, 경로 속성 등을 추가해서 전송할 수 있습니다. 만료된 쿠키는 서버로 다시 전송되지 않습니다. 도메인과 경로 속성이 정의 되었다면, 특정 도메인과 경로에만 쿠키를 전송할 수 있도록 제한할 수 있습니다. 

## 라이프 타임 속성
쿠키가 유지되는 시간을 지정할 수 있는 속성으로 `Expries`와 `Max-Age` 두가지가 있습니다.

### `Expires`
`Expires` 속성을 사용하면 속성에 정의된 날짜에 삭제되는 쿠키를 만듭니다. 사용 방법은 아래 코드와 같습니다.

```none
Set-Cookie: id=beomy; Expires=Sun, 29 Aug 2021 12:00:00 GMT;
```

### `Max-Age`
`Max-Age` 속성을 사용하면 속성에 정의된 기간 이후에 삭제되는 쿠키를 만듭니다. 사용 방법은 아래 코드와 같습니다.

```none
Set-Cookie: id=beomy; Max-Age=600;
```

`Max-Age` 속성은 초 단위를 사용합니다. 위의 코드는 10분 동안 유지되는 쿠키입니다. 음수가 지정되면 해당 쿠키는 즉시 만료됩니다. `Expires`와 `Max-Age` 속성 둘 다 지정되었을 경우 `Max-Age` 속성을 더 우선합니다.

### 세션 쿠키
`Expires`와 `Max-Age` 두가지 속성이 정의되지 않는 쿠키를 세션 쿠키라고 합니다. 세션 쿠키는 현재 브라우저의 세션이 끝날 때 삭제되는 쿠키입니다. 크롬 브라우저에서 크롬을 종료한 후에도 세션 쿠키가 남아 있는 이슈가 있는데, 백그라운드에서 동작하고 있는 크롬 프로세스를 모두 종료해야 세션 쿠키가 삭제됩니다.

![크롬 종료](/assets/img/posts/browser/close-chrome.png)

MAC OS에서는 크롬 브라우저를 닫아도 완전히 종료된 것이 아니기 때문에, 위의 그림에서 종료 버튼을 클릭하여 완전히 종료해 주어야 합니다.

## 보안 속성
브라우저에서 서버로 보내는 요청에는 자동으로 쿠키가 함께 포함되어 전송되기 때문에 쿠키를 사용하면 보안에 취약해 질 수 있습니다. 보안 취약점을 보완하기 위해 사용되는 속성으로 `Secure`와 `HttpOnly`, `SameSite` 세 가지가 있습니다.

### `Secure`
`Secure` 속성이 정의 된 쿠키는 HTTPS 요청일 경우에만 쿠키를 전송합니다. `Secure` 속성을 사용했더라도 민감한 정보는 쿠키에 담지 않는 것이 좋습니다. 사용 방법은 아래 코드와 같습니다.

```none
Set-Cookie: id=beomy; Secure;
```

### `HttpOnly`
[XSS](/tech/etc/xss-xsrf/#xsscross-site-scripting) 공격을 방어하기 위해 `HttpOnly` 속성이 정의 된 쿠키는 자바스크립트의 `document.cookie` API를 통해 접근할 수 없습니다. `HttpOnly` 쿠키는 서버에 전송하는 용도로만 사용할 수 있습니다. 사용 방법은 아래 코드와 같습니다.

```none
Set-Cookie: id=beomy; HttpOnly;
```

아래 그림은 `HttpOnly` 속성이 정의 된 쿠키와 정의 되지 않은 쿠키의 `document.cookie`를 비교한 그림입니다.

![document.cookie 비교](/assets/img/posts/browser/httponly-cookie.gif)

### `SameSite`
[XSRF](/tech/etc/xss-xsrf/#xsrfcrose-site-request-forgery) 공격을 방어하기 위해 `SameSite` 속성을 사용할 수 있습니다. `SameSite` 속성은 `None`, `Lax`, `Static` 중 하나를 설정할 수 있습니다.

- `None`: `SameSite` 속성이 등장하기 전에 동작하던 쿠키 방식입니다. `None`으로 설정된 쿠키는 크로스 사이트 요청에도 항상 전송됩니다. 즉 A 사이트에서 설정된 쿠키가 B 사이트에서 발생하는 요청에도 쿠키가 전달됩니다.
- `Lax`: 웹 페이지 이동과 안전한 HTTP 메서드 요청의 경우 쿠키를 전송합니다. `<a href>`, `<link href> `, `<form method=get>`에서는 쿠키가 전송됩니다.
- `Static`: `Strict`로 설정된 쿠키는 `Lax`에서 허용한 몇 가지 예외를 포함하여 모든 크로스 사이트 요청에 쿠키를 전송하지 않습니다.

사용 방법은 아래 코드와 같습니다.

```none
Set-Cookie: id=beomy; SameSite=Lax;
```

## 스코프 속성
`Domain`과 `Path` 두 가지 속성을 사용하면 쿠키의 유효범위를 설정할 수 있습니다.

### `Domain`
`Domain` 속성에는 쿠키가 전송되게 될 호스트가 정의됩니다. `Domain` 속성에 정의 된 URL에 쿠키가 전송됩니다. 사용 방법은 아래 코드와 같습니다.

```none
Set-Cookie: id=beomy; Domain=beomy.io;
```

`Domain`이 정의 되어 있지 않으면 현재 서버 주소가 기본 값으로 설정됩니다. 위의 코드의 `Domain=beomy.io`와 같이 `Domain`이 정의되면 쿠키들은 `sub.beomy.io`, `domain.beomy.io`와 같은 서브 도메인에서도 쿠키가 포함되어 전송됩니다.

### `Path`
`Domain` 속성은 쿠키의 도메인의 유효범위를 지정한다면, `Path` 속성읜 쿠키의 디렉토리의 유효범위를 지정합니다. 사용 방법은 아래 코드와 같습니다.

```none
Set-Cookie: id=beomy; Path=/cookie;
```

위의 코드처럼 `Path=/cookie`로 `Path` 속성을 지정하면 `/cookie`, `/cookie/path`, `/cookie/domain`와 같은 서브 디렉토리에서 쿠키가 포함되어 전송됩니다.

# 부록

## 퍼스트 파티 쿠키와 서드 파티 쿠키
쿠키는 `Domain` 속성을 정의할 수 있는데 `Domain` 속성의 값이 현재 보고 있는 페이지의 도메인과 동일하면 퍼스트 파티 쿠키, 도메인이 다르다면 서드 파티 쿠키라고 이야기합니다.

### 퍼스트 파티 쿠키 (First-Party Cookie)
퍼스트 파티 쿠키는 사용자가 방문한 웹 사이트에서 직접 발행한 쿠키를 말합니다. 예를 들어 사용자가 `naver.com`에 접속했을 때, `naver.com`에서 로그인 인증 쿠키를 발행하는 경우는 퍼스트 파티 쿠키에 해당됩니다.

### 서드 파트 쿠키 (Third-Party Cookie)
서드 파티 쿠키는 사용자가 방문한 웹 사이트에서 발행한 쿠키가 아니라, 다른 웹 사이트에서 발행한 쿠키를 말합니다. 구글은 2023년 말까지 크롬에서 서드 파티 쿠키 지원을 중단하겠다고 발표했습니다.

보통 광고 서버에서 발행하는 쿠키가 서드 파트 쿠키입니다. 예를 들어 사용자가 `ads.com`의 스크립트가 심어져 있는 `amazon.com`에서 A 상품을 보았다면, `ads.com`은 사용자가 `amazon.com`에서 A 상품을 봤다는 정보를 담아 쿠키를 발행합니다. 그리고 사용자가 `beomy.github.io`라는 사이트에 방문 했을 때, `beomy.github.io`에 `ads.com` 스크립트가 심어져 있다면 `ads.com`은 사용자가 `amazon.com`에서 A 상품을 봤다는 것을 쿠키를 통해 알 수 있기 때문에 쿠키 정보로 광고를 보여줄 수 있게 됩니다.

## 브라우저 저장소
브라우저에서 지원하는 저장소는 쿠키 이외에 로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage)가 있습니다.

### localStorage

### sessionStorage

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)
- [https://ko.wikipedia.org/wiki/HTTP_쿠키](https://ko.wikipedia.org/wiki/HTTP_쿠키)
- [https://www.chromium.org/administrators/policy-list-3/cookie-legacy-samesite-policies](https://www.chromium.org/administrators/policy-list-3/cookie-legacy-samesite-policies)
- [https://seob.dev/posts/브라우저-쿠키와-SameSite-속성/](https://seob.dev/posts/브라우저-쿠키와-SameSite-속성/)
- [https://www.hahwul.com/2020/01/18/samesite-lax/](https://www.hahwul.com/2020/01/18/samesite-lax/)
- [https://web.dev/samesite-cookies-explained/](https://web.dev/samesite-cookies-explained/)
- [https://sevendollars.tistory.com/178](https://sevendollars.tistory.com/178)
- [https://experienceleague.adobe.com/docs/target/using/implement-target/before-implement/privacy/google-chrome-samesite-cookie-policies.html?lang=ko-KR](https://experienceleague.adobe.com/docs/target/using/implement-target/before-implement/privacy/google-chrome-samesite-cookie-policies.html?lang=ko-KR)
- [https://cherish-it.tistory.com/12](https://cherish-it.tistory.com/12)
- [https://yangbongsoo.tistory.com/5?category=919814](https://yangbongsoo.tistory.com/5?category=919814)
- [https://jinn-blog.tistory.com/97](https://jinn-blog.tistory.com/97)
- [https://ko.wikipedia.org/wiki/무상태_프로토콜](https://ko.wikipedia.org/wiki/무상태_프로토콜)
- [http://it.chosun.com/site/data/html_dir/2020/02/16/2020021600579.html](http://it.chosun.com/site/data/html_dir/2020/02/16/2020021600579.html)
- [https://sy34.net/what-is-cookie/](https://sy34.net/what-is-cookie/)
- [https://report.roa.ai/article/171766](https://report.roa.ai/article/171766)