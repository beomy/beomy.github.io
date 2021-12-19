---
layout: post
title: '[ETC] HTTP 톺아보기'
featured-img: etc/HTTP_logo.svg
category: [tech, etc]
summary: HTTP는 인터넷에서 데이터를 구조 받을 수 있는 프로토콜로 텍스트 기반의 통신 규약입니다.
---

HTTP는 인터넷에서 데이터를 주고 받을 수 있는 프로토콜로 텍스트 기반의 통신 규약입니다. 이번 포스트에서 HTTP가 무엇인지 살펴보도록 하겠습니다.

# HTTP란
HTTP(Hyper Text Transfer Protocol)는 W3(World Wide Web)에서 정보를 주고 받을 수 있는 프로토콜로, 클라이언드와 서버 사이에 이루어지는 요청/응답(request/response) 프로토콜입니다. 예를 들어 웹 브라우저가 HTTP를 통해 서버로부터 웹페이지(HTML)나 이미지를 요청하면 서버는 이 요청에 응답하여 필요한 정보를 전달합니다.

# HTTP 특징
HTTP는 아래 목록과 같이 간단함, 확장성, 무상태, 비연결성 4가지 특징을 가집니다.

- **간단함**: HTTP는 사람이 읽고 해석할 수 있을 정도로 간단하게 만들어졌습니다. 아래에서 이야기 할 요청/응답 메시지 구조를 보면 알 수 있듯이 사람이 읽을 수 있도록 만들어진 프로토콜입니다.
- **확장성**: 클라이언트와 서버가 서로 커스텀 헤더에 대한 합의가 이루어진다면, 헤더를 추가하는 등 확장이 용이한 프로토콜입니다.
- **무상태**: HTTP는 상태를 저장하지 않습니다. 통신 상태나 이전 호출 결과 등등을 저장하지 않습니다. 상태 저장이 필요한 경우 쿠키나 세션등을 사용해야 합니다.
- **비연결성**: HTTP는 클라이언트와 서버가 연결을 맺은 후 클라이언트의 요청에 서버가 응답을 마치면 연결이 끊어지게 됩니다. 이런 특징은 연결을 계속 유지할 때 필요한 자원을 줄일 수 있지만 매 요청마다 연결을 맺어야 하는 오버헤드가 발생하게 됩니다. HTTP 버전이 올라가면서 이런 오버헤드는 최적화 되었습니다.

# HTTP 요청 메시지
클라이언트가 서버에게 보내는 요청 메시지의 구조와 요청 메서드에 대해 살펴보겠습니다.

## 요청 메시지 구조
요청 메시지는 요청 라인, 요청 헤더, 빈 라인, 메시지 바디 4가지로 구성됩니다. 코드로 살펴보면 메시지 바디가 없는 GET 요청 메시지는 아래와 같습니다.

```none
GET /http.html HTTP/1.1
Host: beomy.github.io
```

바디가 있는 POST 요청 메시지를 표현하면 아래와 같습니다.

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
> 타자기에서 다음 줄로 이동 할 때, 타자기의 커서를 맨 앞으로 이동한 후 종이를 위로 올려줘야 합니다. 즉 CR 후 LF를 해야 다음 줄로 이동하게 됩니다.
> 
> 타자기와 동일하게 윈도우에서도 CR + LF 이 두 동작을 합쳐서 Enter 동작을 하게 됩니다.

바디가 있는 POST 요청 메시지를 보면서 4가지 구조를 하나씩 살펴보도록 하겠습니다.

### 요청 라인(Request Line)
`POST /http.html HTTP/1.1` 이 부분이 요청 라인입니다. 요청 라인의 구조는 아래 그림과 같습니다.

![요청 라인 구조](/assets/img/posts/etc/request_line.png)

요청 라인은 요청 메서드, 요청하는 서버의 URL, HTTP 버전, 줄 바꿈을 위한 CR + LF 순서로 작성됩니다.

요청 메서드는 대소문자를 구분(GET과 get은 다름)하기 때문에 항상 대문자로 적어 주셔야 합니다. 요청 메서드는 좀 더 자세히 살펴보기 위해 아래에서 좀 더 이야기 하도록 하겠습니다.

### 요청 헤더(Request Headers)
아래 코드 부분이 요청 헤더입니다.

```none
Host: beomy.github.io
Content-Type: application/json
Content-Length: 32
```

요청 헤더의 구조는 아래 그림과 같습니다.

![요청 헤더 구조](/assets/img/posts/etc/request_header.png)

HTTP/1.0에서는 요청 헤더가 존재하지 않아도 상관없었지만, HTTP/1.1 버전 이후로 1개 이상의 헤더가 존재해야 합니다. 헤더 이름은 대소문자를 구분하지 않습니다. 즉, `host: beomy.github.io`와 `Host: beomy.github.io`는 동알한 헤더이기 때문에 사용할 때 주의해야 합니다.

### 빈 라인
`<CR><LF>`으로만 구성된 줄입니다. 

### 메시지 바디(Message Body)
요청 메시지의 바디는 데이터를 담아 서버에 요청을 보내도 보내지 않아도 되는 선택적인 부분입니다.  메시지 바디에 어떤 형태의 데이터가 담겨 있는지는 `Content-Type` 헤더를 통해 알 수 있습니다.

## 요청 메서드
HTTP/1.0 이후 버전부터 아래 표와 같은 HTTP 메서드가 존재합니다.

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

> **Body 사용가능 여부**

> **안전한 메서드**

> **멱등 메서드**

> **캐시 가능한 메서드**

### GET
### HEAD
### POST
### PUT
### DELETE
### CONNECT
### OPTIONS
### TRACE
### PATCH

# HTTP 응답 메시지

## 응답 메시지 구조

### 상태 표시 라인(Status Line)

### 응답 헤더(Response Headers)

### 빈 라인

### 메세지 바디(Message Body)

## 응답 코드
### 2xx - 성공
### 3xx - 리다이렉션
### 4xx - 클라이언트 에러
### 5xx - 서버 에러

# HTTP의 버전
HTTP의 버전은 초기 버전인 HTTP/0.9부터, HTTP/1.0, HTTP/1.1, HTTP/2, 그리고 가장 최근 버전인 HTTP/3까지 5개의 버전이 있습니다.

## HTTP/0.9
HTTP 초기 버전에는 버전 번호가 없었습니다. HTTP/0.9는 다음 버전이 등장하면서 구별하기 위해 0.9라고 불리게 됬습니다. HTTP/0.9에서 요청은 아래 코드와 같이 한 줄로 매우 간단합니다.

```none
GET /http.html
```

HTTP 메서드는 GET만 존재하고, 헤더 정보가 없었습니다. `Centent-Type`이라는 헤더 정보 조차도 없었기 때문에 HTML 파일만 전송 될 수 있고 다른 유형의 파일은 전송 할 수 없었습니다. 또한 상태 혹은 오류 코드도 없었고, 문제가 발생한 경우 문제에 대한 내용을 담고 있는 HTML 파일이 전송됬습니다.

응답 역시 아래 코드와 같이 매우 간단합니다.

```none
<HTML>
  A very simple HTML page
</HTML>
```

## HTTP/1.0
HTTP/0.9 버전은 사용하는데 매우 제한적이었기 때문에, 브라우저와 서버가 모두 범용적으로 사용할 수 있도록 확장되었습니다. HTTP/1.0에서 요청과 응답 코드는 아래와 같습니다.

```none
GET /http.html HTTP/1.0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
```

```none
200 OK
Date: Fri, 10 Dec 2021 02:15:06 GMT
Server: AmazonS3
Content-Type: text/html

<HTML>
  A page with an image
  <IMG SRC="/myimage.gif">
</HTML>
```

응답에 이미지 태그를 포함하기 때문에 아래 코드와 같은 요청과 응답 코드가 호출됩니다.

```none
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)
```

```none
200 OK
Date: Fri, 10 Dec 2021 02:15:07 GMT
Server: AmazonS3
Content-Type: text/gif

(image content)
```

## HTTP/1.1
핸드쉐이킹 최소화를 위해 keep-alive 사용

## HTTP/2
헤더 필드 압축

### Express에서 HTTP/2 사용

## HTTP/3
핸드쉐이킹 등에 쓰이는 자원을 사용하지 않기 위해 UDP 사용, UDP는 통신만 담당하기 때문에 무결성을 보장하기 위한 코드가 추가된 QUIC를 사용

### Express에서 HTTP/3 사용

# 부록

## 무상태 프로토콜

## 메시지 바디

## 월드 와이드 웹
World Wide Web

## HTTPS란
HTTPS(Hyper Text Transfer Protocol over Secure Socket Layer)는

## TCP와 UDP

### TCP

### UDP

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)
- [https://ko.wikipedia.org/wiki/HTTP](https://ko.wikipedia.org/wiki/HTTP)
- [https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- [https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields)
- [https://en.wikipedia.org/wiki/HTTP_message_body](https://en.wikipedia.org/wiki/HTTP_message_body)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Methods](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
- [https://ko.wikipedia.org/wiki/HTTPS](https://ko.wikipedia.org/wiki/HTTPS)
- [https://evan-moon.github.io/2019/10/08/what-is-http3/](https://evan-moon.github.io/2019/10/08/what-is-http3/)
- [https://ykarma1996.tistory.com/86](https://ykarma1996.tistory.com/86)
- [https://developers.google.com/web/fundamentals/performance/http2?hl=ko](https://developers.google.com/web/fundamentals/performance/http2?hl=ko)
- [https://ko.wikipedia.org/wiki/무상태_프로토콜](https://ko.wikipedia.org/wiki/무상태_프로토콜)
- [https://kyun2da.dev/CS/http란/](https://kyun2da.dev/CS/http란/)
- [https://kwangcheolchae.wordpress.com/2012/12/04/캐리지-리턴이란/](https://kwangcheolchae.wordpress.com/2012/12/04/캐리지-리턴이란/)
- [https://ko.wikipedia.org/wiki/캐리지_리턴](https://ko.wikipedia.org/wiki/캐리지_리턴)