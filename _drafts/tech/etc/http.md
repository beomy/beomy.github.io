---
layout: post
title: '[ETC] HTTP 톺아보기'
featured-img: etc/HTTP_logo.svg
category: [tech, etc]
summary: HTTP는 인터넷에서 데이터를 구조 받을 수 있는 프로토콜로 텍스트 기반의 통신 규약입니다.
---

HTTP, HyperText Transfer Protocol은 인터넷에서 하이퍼텍스트(HyperText)를 전송(Transfer)하기 위한 통신 규약(Protocol)입니다. 이번 포스트에서 HTTP가 무엇인지 살펴보도록 하겠습니다.

# HTTP란
HTTP는 W3(World Wide Web)에서 정보를 주고 받을 수 있는 프로토콜로, 클라이언드와 서버 사이에 이루어지는 요청/응답(request/response) 프로토콜입니다. 예를 들어 웹 브라우저가 HTTP를 통해 서버로부터 웹페이지(HTML)나 이미지를 요청하면 서버는 이 요청에 응답하여 필요한 정보를 전달합니다.

# HTTP 특징
HTTP는 아래와 같이 간단함, 확장성, 무상태, 비연결성 4가지 특징을 가집니다.

- **간단함**: HTTP의 요청/응답 메시지 구조를 보면 알 수 있듯이 사람이 읽을 수 있도록 만들어진 프로토콜입니다.
- **확장성**: 클라이언트와 서버가 서로 커스텀 헤더에 대한 합의가 이루어진다면, 헤더를 추가하는 등 확장이 용이한 프로토콜입니다. 또한 메시지 본문(Message Body)에 다양한 형태의 데이터 타입을 담아 서버와 클라이언트에 전달 할 수 있씁니다.
- **무상태**: HTTP는 통신 상태나 이전 호출 결과 등을 저장하지 않습니다. 상태 저장이 필요한 경우 쿠키나 세션등을 사용해야 합니다.
- **비연결성**: HTTP는 클라이언트와 서버가 연결을 맺은 후 클라이언트의 요청에 서버가 응답을 마치면 연결이 끊어지게 됩니다. 이런 특징은 연결을 계속 유지할 때 필요한 자원을 줄일 수 있지만 매 요청마다 연결을 맺어야 하는 오버헤드가 발생하게 됩니다. HTTP 버전이 올라가면서 이런 오버헤드는 최적화 되었습니다.

# HTTP 요청 메시지
클라이언트가 서버에게 보내는 요청 메시지의 구조와 요청 메서드, 요청 헤더에 대해 살펴보겠습니다.

## 요청 메시지 구조
요청 메시지는 요청 라인, 요청 헤더, 빈 라인, 메시지 본문 4가지로 구성됩니다. 코드로 살펴보면 메시지 본문이 없는 GET 요청 메시지는 아래와 같습니다.

```none
GET /http.html HTTP/1.1
Host: beomy.github.io
```

메시지 본문이 있는 POST 요청 메시지를 표현하면 아래와 같습니다.

```none
POST /http.html HTTP/1.1
Host: beomy.github.io
Content-Type: application/json
Content-Length: 32

{
    "data": "데이터가 바디에 담깁니다."
}
```

각 줄의 끝은 `<CR><LF>`로 끝나야 합니다. 캐리지 리턴(Carriage Return)과 라인 피드(Line Feed) 외에 다른 화이트 스페이스가 포함되면 안됩니다.

> **캐리지 리턴(Carriage Return)과 라인 피드(Line Feed)**
>
> 캐리지 리턴과 라인 피드는 타자기에서 사용하는 용어로, 캐리지 리턴(줄여서 CR)은 현재 위치를 나타내는 커서를 맨 앞으로 이동시킨다라는 뜻입니다. 라인 피드(줄여서 LF)는 커서의 위치를 아랫줄로 이동시킨다는 뜻입니다.
> 
> 타자기에서 다음 줄로 이동 할 때, 타자기의 커서를 맨 앞으로 이동한 후 종이를 위로 올려줘야 합니다. 즉 CR 후 LF를 해야 다음 줄로 이동하게 됩니다. 타자기와 동일하게 PC에서도 CR + LF 이 두 동작을 합쳐서 Enter 동작을 하게 됩니다.

메시지 본문이 있는 POST 요청 메시지를 보면서 아래 그림과 같이 4가지 구조로 나누어 볼 수 있습니다.

![요청 메시지 구조](/assets/img/posts/etc/request_message.png)

4가지 구조를 하나씩 살펴보도록 하겠습니다.

### 요청 라인(Request line)
`POST /http.html HTTP/1.1` 이 부분이 요청 라인입니다. 요청 라인의 구조는 아래 그림과 같습니다.

![요청 라인 구조](/assets/img/posts/etc/request_line.png)

요청 라인은 요청 메서드, 요청하는 서버의 URL, HTTP 버전, 줄 바꿈을 위한 CR + LF 순서로 작성됩니다. 요청 메서드는 대소문자를 구분(GET과 get은 다름)합니다.

### 0개 이상의 요청 헤더(Request header fields)
HTTP/1.0에서는 요청 헤더가 존재하지 않아도 상관없었지만, HTTP/1.1 버전 이후로 `Host` 헤더가 필수 헤더가 되어 1개 이상의 헤더가 존재해야 합니다.

아래 코드 부분이 요청 헤더입니다.

```none
Host: beomy.github.io
Content-Type: application/json
Content-Length: 32
```

요청 헤더의 구조는 아래 그림과 같습니다.

![요청 헤더 구조](/assets/img/posts/etc/request_header.png)

헤더 이름은 대소문자를 구분하지 않습니다. 즉, `host: beomy.github.io`와 `Host: beomy.github.io`는 동일한 헤더입니다.

### 빈 라인(Empty line)
`<CR><LF>`으로만 구성된 줄입니다. 

### 메시지 본문(Message body) - 선택
요청 메시지의 본문은 데이터를 담아 서버에 요청을 보내도 보내지 않아도 되는 선택적인 부분입니다. 메시지 본문에 어떤 형태의 데이터가 담겨 있는지는 `Content-Type` 헤더를 통해 알 수 있습니다.

## 요청 메서드
HTTP/0.9에서는 GET 메서드가, HTTP/1.0에서는 GET, HEAD, POST 메서드가, HTTP/1.1에서는 PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH 메서드가 추가되었습니다. 각 메서드는 아래 표와 같이 정리할 수 있습니다.

|HTTP 메서드|RFC|요청에 Body가 있음|응답에 Body가 있음|안전|멱등(Idempotent)|캐시 가능|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|GET|[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)|Optional|Yes|Yes|Yes|Yes|
|HEAD|[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)|Optional|No|Yes|Yes|Yes|
|POST|[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)|Yes|Yes|No|No|Yes|
|PUT|[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)|Yes|Yes|No|Yes|No|
|DELETE|[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)|Optional|Yes|No|Yes|No|
|CONNECT|[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)|Optional|Yes|No|No|No|
|OPTIONS|[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)|Optional|Yes|Yes|No|No|
|TRACE|[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)|No|Yes|No|Yes|No|
|PATCH|[RFC 5789](https://datatracker.ietf.org/doc/html/rfc5789)|Yes|Yes|No|No|No|

> **안전한 메서드**
> 
> 해당 메서드를 사용한 요청이 서버에 영향을 주지 않는 요청 메서드를 안전한 메서드라고 합니다. GET, HEAD, OPTIONS, TRACE 메서드를 안전한 메서드라고 하는데 안전한 메서드는 읽기 전용(서버 데이터에 영향을 주지 않는) 메서드 입니다. 그 외 POST, PUT, DELETE, CONNECT, PATCH 메서드는 서버 데이터를 변경하기 위해 사용되는 메서드이므로 안전하지 않는 메서드로 분류됩니다.

> **멱등 메서드**
> 
> 여러번 요청을 보내도 결과가 동일한 메서드를 멱등 메서드라고 합니다. 예를 들어 A라는 요청 메시지를 10번 보냈을 때와 1번만 보냈을 때 두 요청의 서버 결과가 동일한 경우를 말합니다.
> 
> 서버에 영향을 주지 않는 GET 메서드나 특정 데이터를 대체하는 PUT 메서드, 특정 데이터를 삭제하는 DELETE 메서드는 10번 호출 해도 동일한 결과가 나타나기 때문에 멱등 메서드입니다. 반면 데이터를 추가하는 POST 메서드의 경우 10번 호출할 경우 10번 데이터가 추가 되기 때문 멱등 메서드가 아닙니다.

> **캐시 가능한 메서드**
> 
> 재사용 될 수 있는 요청에 대한 응답의 경우 캐시가 가능합니다. GET, HEAD, POST 메서드의 경우 캐시가 가능한 요청입니다.
> 
> 이미지를 가져오는 요청의 경우 화면을 새로고침할 때 마다 이미지를 네트워크를 통해 가져오는 것은 비효율적이기 때문에 캐시해 두기 좋습니다. 아래 그림과 같이 크롬 개발자 도구의 네트워크 탭에서 Size 필드에 `(memory cache)`로 보이는 이미지는 캐시되었기 때문에 네트워크를 통해 가져오지 않는 것을 볼 수 있습니다.
> 
> ![HTTP 캐시](/assets/img/posts/etc/http_cache.png)
> 
> 아래 그림에서 `cache-control`, `expires` 등의 응답 헤더를 사용하여 캐시를 제어할 수 있습니다.
> 
> ![HTTP 캐시 응답 헤더](/assets/img/posts/etc/http_cache_response_header.png)

요청 메서드를 하나씩 살펴보도록 하겠습니다.

### GET
GET은 가져오다라는 뜻으로 단어의 뜻처럼 서버에서 데이터를 가져오기 위해 사용되는 메서드입니다. GET 메서드 요청은 데이터를 가져오기만 하고 데이터를 수정(혹은 생성)하는 등의 다른 역할을 해서는 안됩니다.

GET 메서드 요청은 URL에 요청에 필요한 정보를 담기 때문에 북마크나 링크 공유가 가능합니다. 또한 캐시가 가능하기 때문에 동일한 GET 메서드 요청을 할 경우 네트워크 비용을 줄일 수 있습니다.

### HEAD
HEAD 메서드 요청은 GET 메서드 요청을 했을 때 응답 받을 헤더를 요청하는 메서드입니다. HEAD 메서드 요청에 대한 응답에는 메시지 본문이 포함되지 않습니다. 하지만 `Content-Length` 헤더처럼 응답 메시지 본문의 정보를 담는 헤더는 포함될 수 있습니다.

서버가 정상 동작하는지 확인(Health Check)하거나 `Content-Length` 헤더를 확인하여 응답 받을 메시지의 크기를 알아내는 등의 헤더 정보를 통한 메타 정보를 조회할 때 유용한 메서드입니다.

### POST
POST 메서드는 보통 서버에 새로운 데이터를 생성할 때 사용되지만, 메일을 보내야 하는 요청 같은 CRUD(Create, Read, Update, Delete)로 정의하기 힘든 요청에도 POST 메서드를 사용하기도 합니다.

POST 메서드 요청은 서버에 새로운 데이터를 추가하기 때문에 안전한 메서드가 아닙니다. 또한 매번 요청할 때마다 서버에 새로운 데이터를 추가하기 때문에 멱등 메서드 역시 아닙니다.

HTML의 `<form>` 태그의 `action` 속성으로 POST로 설정하면 `<form>` 태그 안에 `<input>` 태그 데이터들이 메시지 본문에 담겨 POST 메서드 요청을 하게 됩니다.

POST 메서드 요청은 `Cache-Control` 헤더나 `Expires` 헤더가 정확히 정의되어 있다면 캐시가 가능합니다.

### PUT
PUT 메서드 요청은 요청 데이터에 해당되는 데이터가 서버에 존재한다면 서버 데이터 값을 요청 데이터로 대체 하고, 데이터가 존재하지 않는다면 데이터를 생성합니다. 데이터를 생성하게 되면 응답 코드로 `201 (Created)`를 응답해야 하고, 수정이 되었다면 응답 코드로 `200 (OK)` 또는 `204 (No Content)`를 응답해야 합니다.

데이터가 없다면 생성하고 있다면 대체 하기 때문에 N번 요청을 하더라도 동일한 결과가 나타나는 멱등 메서드입니다. 하지만 PUT 메서드 요청은 캐시되지 않습니다.

### DELETE
DELETE 메서드 요청은 데이터를 삭제하기 위해 사용되는 메서드입니다.

### CONNECT
CONNECT 메서드는 클라이언드가 프록시를 통해 서버와 SSL 통신을 할 때 사용됩니다. HTTP의 CONNECT 메서드는 HTTP 터널링의 가장 일반적인 형태입니다.

### OPTIONS
OPTIONS 메서드는 유효한 요청인지 확인하기 위한 예비 요청(Preflight request)으로 사용되는 메서드입니다. CORS에서 사용되는 예비 요청에 대한 자세한 내용은 [[Browser] CORS란?](/tech/browser/cors/#preflight-request)을 참고 부탁드립니다.

### TRACE
TRACE 메서드는 웹 브라우저가 보내는 HTTP 요청을 HTTP 응답의 body에 담아 응답하는 역할을 합니다. 아래 그림과 같이 HTTP 요청을 보내고 응답을 받습니다.

![HTTP TRACE](/assets/img/posts/etc/http_trace.png)

HTTP 요청 데이터를 HTTP 응답의 body에 담아 응답하기 때문에 요청 메시지가 변조되었는지 확인하기 위한 용도로 사용되는 메서드입니다.

### PATCH
PATCH 메서드는 데이터를 업데이트 한다는 의미에서 PUT 메서드와 유사하지만 PUT 메서드는 전체 수정(대체), PATCH 메서드는 부분 수정을 의미합니다. PATCH 메서드는 수정하려고 하는 데이터를 찾을 수 있는 식별자와 수정하려는 값만 요청 데이터에 담아 보내면 되기 때문에, PUT 메서드 보다 네트워크 비용을 줄 일 수 있습니다.

PATCH 메서드는 PUT 메서드와 달리 멱등 메서드가 아닙니다. 예를 들어 블로그의 방문자 수를 카운트 해야 할 경우 새로운 데이터를 추가하는 것도, 전체 데이터를 교체하는 것도 아니기 때문에 PATCH 메서드를 사용할 수 있는데, 방문자 수를 카운트하는 PATCH 메서드를 10번 호출한다면 10명의 방문자가 카운트 되어 호출 할 때 마다 다른 결과가 나타나기 때문에 멱등 메서드가 아니게 됩니다.

## 요청 헤더
요청 헤더는 `Host`와 같은 표준 헤더와 `X-Request-With`와 같은 Custom의 약자인 `X-`로 시작하는 비표준 헤더가 있습니다. 요청 헤더는 자유롭게 만들어 사용할 수 있기 때문에 `X-`로 시작하지 않는 비표준 헤더를 만들어 사용할 수 있습니다.

[요청 헤더 목록](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields)에서 표준 헤더와 자주 사용되는 비표준 헤더의 목록을 더 자세히 확인할 수 있습니다.

# HTTP 응답 메시지
서버에서 클라이언트로 보내는 응답 메시지의 구조와 응답 코드, 응답 헤더에 대해 살펴보겠습니다.

## 응답 메시지 구조
요청 메시지는 아래 그림과 같이 상태 라인, 응답 헤더, 빈 라인, 메시지 본문 4가지로 구성됩니다.

![응답 메시지 구조](/assets/img/posts/etc/response_message.png)

4가지 구조를 하나씩 살펴보도록 하겠습니다.

### 상태 라인(Status line)
`HTTP/1.1 200 OK` 이 부분이 상태 라인입니다. 상태 라인의 구조는 아래 그림과 같습니다.

![상태 라인 구조](/assets/img/posts/etc/response_status_line.png)

### 0개 이상의 응답 헤더(Response header fields)
아래 코드 부분이 응답 헤더입니다.

```none
Content-Type: text/html; charset=UTF-8
Content-Length: 155
```

응답 헤더의 구조는 요청 헤더의 구조와 동일합니다.

![요청 헤더 구조](/assets/img/posts/etc/response_header.png)

응답 메시지의 헤더와 동일하게 헤더 이름은 대소문자를 구분하지 않습니다. 즉, `content-type: text/html; charset=UTF-8`와 `Content-Type: text/html; charset=UTF-8`는 동일한 헤더입니다.

### 빈 라인(Empty line)
요청 메시지의 빈 라인과 동일하게 `<CR><LF>`으로만 구성된 줄입니다.

### 메세지 본문(Message body) - 선택
응답 메시지의 본문은 요청 메시지와 동일하게 보내도 보내지 않아도 되는 선택적인 부분입니다. 메시지 본문에 어떤 형태의 데이터가 담겨 있는지는 `Content-Type` 헤더를 통해 알 수 있습니다.

## 응답 코드
응답 코드는 클라이언트의 요청에 대한 서버의 결과를 나타내는 3자리 정수입니다. `404 Not Found`와 같이 응답 코드와 응답 결과에 대한 이유를 함께 클라이언트로 전달합니다. 응답 결과에 대한 이유는 권장 사항이기 때문에 서버에서 전달 받은 문구가 아닌, 클라이언트에서 서비스에 따라 적당한 문구를 사용자에서 얼마든지 제공할 수 있습니다.

응답 코드는 아래와 같이 크게 5가지로 그룹 지을 수 있습니다. [응답 코드 목록](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)에서 더 자세한 응답 코드 설명을 참고 바랍니다.

- `1xx` (응답 정보): 요청이 접수되어 요청이 진행 중인 것을 나타내는 코드 영역입니다.
- `2xx` (성공): 요청이 성공적으로 수행되었다는 것을 나타내는 코드 영역입니다.
- `3xx` (리다이렉션): 요청을 완료하려면 추가 조치가 필요하다는 것을 나타내는 코드 영역입니다.
- `4xx` (클라이언트 에러): 요청에 잘못된 내용이 포함되어 있어 요청을 수행할 수 없다는 것을 나타내는 코드 영역입니다.
- `5xx` (서버 에러): 올바른 요청을 보냈지만 서버가 수행하지 못했다는 것을 나타내는 코드 영역입니다.

## 응답 헤더
응답 헤더는 요청 헤더와 동일하게 `Content-Type`과 같은 표준 헤더와 Custom의 약자인 `X-`로 시작하는 비표준 헤더가 있습니다. 응답 헤더 역시 자유롭게 만들어 사용할 수 있기 때문에 `X-`로 시작하지 않는 비표준 헤더를 만들어 사용할 수 있습니다.

[응답 헤더 목록](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Response_fields)에서 표준 헤더와 자주 사용되는 비표준 헤더의 목록을 더 자세히 확인할 수 있습니다.

# 부록

## GET 메서드 요청에서 Body
보통 GET 메서드 요청은 메시지 본문(Message body)을 사용하지 않고 `https://beomy.github.io/?id=1234`에서 `?id=1234`와 같이 URL의 `?`문자 뒤에 오는 쿼리를 사용하여 데이터를 서버로 전달하는 방법을 사용합니다. GET 메서드 요청은 URL에 데이터를 담아야 한다는 내용은 [RFC2616의 9.3 GET](https://datatracker.ietf.org/doc/html/rfc2616#section-9.3)에 아래와 같이 명시 되어 있습니다.

> The GET method means retrieve whatever information (in the form of an entity) is identified by the Request-URI.

그리고 [RFC2616의 4.3 Message Body](https://datatracker.ietf.org/doc/html/rfc2616#section-4.3)에 아래와 같이 메시지 본문에 대해 설명하고 있습니다.

> if the request method does not include defined semantics for an entity-body, then the message-body SHOULD be ignored when handling the request.

이 설명에 의하면 GET 메서드의 데이터는 쿼리를 통해 전달되기 때문에 GET 요청에서 메시지 본문은 무시되어 서버에 전달되지 않게 됩니다. 이 설명은 [RFC7230의 3.3 Message Body](https://datatracker.ietf.org/doc/html/rfc7230#section-3.3)에서 삭제 되고, 아래와 같은 설명이 추가 되었습니다.

> Request message framing is independent of method semantics, even if the method does not define any use for a message body.

메서드의 의미와 메서드 본문의 의미가 독립적으로 구분되면서 GET 메서드 요청에도 메시지 본문을 사용하는 것이 가능해졌습니다. 하지만 클라이언트나 서버에서 GET 메서드의 메시지 본문을 무시하는 경우가 종종 있기 때문에, GET 메서드에서 메시지 본문을 사용할 때 주의가 필요합니다.

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)
- [https://ko.wikipedia.org/wiki/HTTP](https://ko.wikipedia.org/wiki/HTTP)
- [https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- [https://en.wikipedia.org/wiki/HTTP_message_body](https://en.wikipedia.org/wiki/HTTP_message_body)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Methods](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
- [https://ko.wikipedia.org/wiki/HTTPS](https://ko.wikipedia.org/wiki/HTTPS)
- [https://ko.wikipedia.org/wiki/무상태_프로토콜](https://ko.wikipedia.org/wiki/무상태_프로토콜)
- [https://kyun2da.dev/CS/http란/](https://kyun2da.dev/CS/http란/)
- [https://kwangcheolchae.wordpress.com/2012/12/04/캐리지-리턴이란/](https://kwangcheolchae.wordpress.com/2012/12/04/캐리지-리턴이란/)
- [https://ko.wikipedia.org/wiki/캐리지_리턴](https://ko.wikipedia.org/wiki/캐리지_리턴)
- [https://www.zerocho.com/category/HTTP/post/5b3723477b58fc001b8f6385](https://www.zerocho.com/category/HTTP/post/5b3723477b58fc001b8f6385)
- [https://gyrfalcon.tistory.com/entry/HTTP-응답-코드-종류-HTTP-메소드-종류](https://gyrfalcon.tistory.com/entry/HTTP-응답-코드-종류-HTTP-메소드-종류)
- [https://im-developer.tistory.com/166](https://im-developer.tistory.com/166)
- [https://kingjakeu.github.io/study/2020/07/15/http-post-put/](https://kingjakeu.github.io/study/2020/07/15/http-post-put/)
- [https://www.kensei.co.kr/1102](https://www.kensei.co.kr/1102)
- [https://medium.com/@lyhlg0201/http-method-d561b77df7](https://medium.com/@lyhlg0201/http-method-d561b77df7)
- [https://webhack.dynu.net/?idx=20161111.001](https://webhack.dynu.net/?idx=20161111.001)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/HEAD)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/PUT)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods/CONNECT)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)
- [https://en.wikipedia.org/wiki/List_of_HTTP_header_fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields)
- [https://en.wikipedia.org/wiki/List_of_HTTP_status_codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
- [https://brunch.co.kr/@kd4/158](https://brunch.co.kr/@kd4/158)