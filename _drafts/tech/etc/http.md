---
layout: post
title: '[ETC] HTTP 톺아보기'
featured-img: etc/HTTP_logo.svg
category: [tech, etc]
summary: HTTP는 인터넷에서 데이터를 구조 받을 수 있는 프로토콜로 텍스트 기반의 통신 규약입니다.
---

HTTP는 인터넷에서 데이터를 구조 받을 수 있는 프로토콜로 텍스트 기반의 통신 규약입니다. 이번 포스트에서 HTTP가 무엇인지 살펴보도록 하겠습니다.

# HTTP란
HTTP(**H**yper **T**ext **T**ransfer **P**rotocol)는 W3(**W**orld **W**ide **W**eb)에서 정보를 주고 받을 수 있는 프로토콜로, HTTP는 클라이언드와 서버 사이에 이루어지는 요청/응답(request/response) 프로토콜입니다. 예를 들어 웹 브라우저가 HTTP를 통해 서버로부터 웹페이지(HTML)나 이미지를 요청하면 서버는 이 요청에 응답하여 필요한 정보를 전달하게 됩니다.

# HTTP 요청 메시지
클라이언트에가 서버에게 보내는 요청 메시지의 형태는 아래와 같은 내용을 포함해야 합니다.

- 요청 내용: `GET /beomy.html`
- 헤더(Header): `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)`
- 빈줄
- 바디(Body)

## 요청 메서드
HTTP/1.0 이후 버전부터 아래 표와 같은 HTTP 메서드가 존재합니다.

|HTTP 메서드|요청에 Body가 있음|응답에 Body가 있음|안전|멱등(Idempotent)|캐시 가능|
|:--:|:--:|:--:|:--:|:--:|:--:|
|GET|No|Yes|Yes|Yes|Yes|
|HEAD|No|No|Yes|Yes|Yes|
|POST|Yes|Yes|No|No|Yes|
|PUT|Yes|Yes|No|Yes|No|

> #### 멱등이란
> 요거는???

### GET
### HEAD
### POST
### PUT

# HTTP 응답 메시지
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
GET /beomy.html
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
GET /beomy.html HTTP/1.0
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

## 월드 와이드 웹
World Wide Web

## HTTPS란
HTTPS(**H**yper **T**ext **T**ransfer **P**rotocol over **S**ecure Socket Layer)는

## TCP와 UDP

### TCP

### UDP

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)
- [https://ko.wikipedia.org/wiki/HTTP](https://ko.wikipedia.org/wiki/HTTP)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Methods](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
- [https://ko.wikipedia.org/wiki/HTTPS](https://ko.wikipedia.org/wiki/HTTPS)
- [https://evan-moon.github.io/2019/10/08/what-is-http3/](https://evan-moon.github.io/2019/10/08/what-is-http3/)
- [https://ykarma1996.tistory.com/86](https://ykarma1996.tistory.com/86)
- [https://developers.google.com/web/fundamentals/performance/http2?hl=ko](https://developers.google.com/web/fundamentals/performance/http2?hl=ko)