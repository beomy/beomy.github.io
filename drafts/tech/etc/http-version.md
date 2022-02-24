---
layout: post
title: '[ETC] HTTP 버전'
featured-img: etc/HTTP_logo.png
category: [tech, etc]
summary: HTTP의 버전은 초기 버전인 HTTP/0.9부터, HTTP/1.0, HTTP/1.1, HTTP/2, 그리고 가장 최근 버전인 HTTP/3까지 5개의 버전이 있습니다. 이번 포스트에서 각 버전별 특징을 살펴보도록 하겠습니다.
---

HTTP의 버전은 초기 버전인 HTTP/0.9부터, HTTP/1.0, HTTP/1.1, HTTP/2, 그리고 가장 최근 버전인 HTTP/3까지 5개의 버전이 있습니다. 이번 포스트에서 각 버전별 특징을 살펴보도록 하겠습니다.

# HTTP/0.9
HTTP 초기 버전에는 버전 번호가 없었습니다. HTTP/0.9는 다음 버전이 등장하면서 구별하기 위해 0.9라고 불리게 됬습니다.

## 구조
HTTP/0.9에서 요청 메시지는 아래 코드와 같이 한 줄로 구성된 간단한 구조입니다.

```http
GET /http.html
```

메서드와 URL로 구성된 단순한 구조입니다. 뿐만아니라 HTTP/0.9의 요청 메서드는 GET 메서드만 존재합니다. 응답 메시지 역시 아래 코드와 같이 매우 간단합니다.

```html
<HTML>
  A very simple HTML page
</HTML>
```

전송된 데이터의 타입을 담는 `Centent-Type`이라는 헤더 정보 조차도 없었기 때문에 HTML 파일만 전송 될 수 있고 다른 유형의 파일은 전송 할 수 없었습니다. 또한 상태 혹은 오류 코드도 없었고, 문제가 발생한 경우 문제에 대한 내용을 담고 있는 HTML 파일이 전송됬습니다.

# HTTP/1.0
HTTP/0.9 버전은 사용하는데 매우 제한적이었기 때문에, HTTP/1.0에서는 브라우저와 서버가 모두 범용적으로 사용할 수 있도록 확장되었습니다.

## 개선 사항
HTTP/1.0에서 아래 목록들이 개선되었습니다.

- 요청 메시지의 요청 라인에 HTTP 버전 추가: `GET /http.html HTTP/1.0`와 같이 요청 라인 마지막에 HTTP 버전 정보가 추가되었습니다.
- 응답 메시지에 상태 라인 추가: 응답 데이터만 보냈던 HTTP/0.9와 달리 HTTP/1.0에는 `HTTP/1.0 200 OK`와 같이 상태 코드가 포함된 상태 라인이 추가되었습니다.
- 요청, 응답 메시지에 헤더 기능 추가: 요청, 응답 메시지에 헤더를 추가할 수 있게 되어 `Content-Type: text/html`과 같은 메타데이터를 전송할 수 있게 되었습니다.
- HTML 파일 이외의 다른 데이터 전송 가능: 어떤 유형의 데이터를 보냈는지 표시하는 `Content-Type` 헤더 덕분에 HTML 파일 이외의 데이터를 전송할 수 있게 되었습니다.

## 구조
HTTP/1.0에서 요청과 응답 메시지 코드는 아래와 같습니다.

```http
GET /http.html HTTP/1.0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
```

```http
HTTP/1.0 200 OK
Date: Fri, 10 Dec 2021 02:15:06 GMT
Server: AmazonS3
Content-Type: text/html

<HTML>
  A page with an image
  <IMG SRC="/myimage.gif">
</HTML>
```

응답에 이미지 태그를 포함하기 때문에 아래 코드와 같은 요청과 응답 코드가 호출됩니다.

```http
GET /myimage.gif HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)
```

```http
HTTP/1.0 200 OK
Date: Fri, 10 Dec 2021 02:15:07 GMT
Server: AmazonS3
Content-Type: text/gif

(image content)
```

## 커넥션 관리
HTTP/1.0에서 기본적으로 커넥션은 단기 커넥션입니다. 단기 커넥션이란 각각의 HTTP 요청의 각각의 커넥션에서 실행 되는 것을 이야기 합니다. 1개의 요청은 커넥션 연결 -> 요청 -> 응답 -> 커넥션 해제가 한 세트로 동작합니다. 2개의 요청을 보내게 되면 커넥션 연결 -> 요청 -> 응답 -> 커넥션 해제 -> 커넥션 연결 -> 요청 -> 응답 -> 커넥션 해제 순서로 동작하게 됩니다.

### Keep-Alive 커넥션
단기 커넥션은 매 요청마다 커넥션을 연결하고 해제 하는 오버헤드가 발생하게 되는데 이런 오버헤드를 줄이기 위해 HTTP/1.0에서는 커넥션을 재사용 할 수 있는 Keep-Alive 커넥션을 도입하였습니다. 아래 그림은 커넥션을 재사용하는 경우와 재사용하지 않을 경우의 차이입니다.

|커낵션 재사용 안함|커낵션 재사용|
|:--:|:--:|
|![커낵션 재사용 안함](/assets/img/posts/etc/http_short_lived_connection.png)|![커넥션 재사용](/assets/img/posts/etc/http_persistent_connection.png)|

`Connection: keep-alive`와 `Keep-Alive` 헤더를 사용하여 Keep-Alive 커넥션을 만들 수 있습니다.

- `Connection` 헤더: 현재의 전송이 완료된 후 네트워크 연결을 유지할지 유지하지 않을지를 결정합니다. HTTP/1.0에서는 `Connection` 헤더를 정의하지 않거나 `close`로 설정된 경우 네트워크 연결을 재사용하지 않습니다.
- `Keep-Alive` 헤더

### 멍청한 프록시

# HTTP/1.1
HTTP/1.1은 HTTP/1.0과 동일한 구조를 가지지만 HTTP/1.0에 비해 많은 성능 개선이 이루어졌습니다.

## 개선 사항
HTTP/1.1은 이전 버전인 HTTP/1.0에 비해 많은 개선이 이루어 졌습니다. 아래 목록은 HTTP/1.1에서 이뤄진 대표적인 개선 사항 6가지 입니다.

- 커넥션 재사용: HTTP/1.0은 `Connection: keep-alive`와 `Keep-Alive` 헤더를 사용한 Keep-Alive 커넥션을 사용했지만, HTTP/1.1에서는 `Connection` 헤더를 사용하지 않아도 커넥션을 유지하는 지속 커넥션을 지원합니다.
- 파이프라이닝 추가:
- 청크된 응답 지원: `Transfer-Encoding` 헤더
- 캐시 제어 기능 추가: 캐시 관련 헤더
- 콘텐츠 협상 도입: 콘텐츠의 언어, 인코딩, 타입 협상 도입, `Accept`, `Accept-Language`, `Accept-Encoding`
- 동일한 IP에 다른 도메인 호스트 기능 추가: `Host` 헤더, 도메인 샤딩, 병렬 커넥션

## 커넥션 관리

### 지속 커넥션
지속 커넥션은 HTTP/1.0에서 사용하는 Keep-Alive 커넥션과 HTTP/1.1에서 사용하는 Persistent 커넥션이 있습니다.
Keep-Alive의 멍청한 프록시 문제 해결 방법: 커넥션 관련 기능에 대한 클라이언트의 지원 범위를 알고 있지 않은 한 지속 커넥션을 맺지 않는다.

### 파이프라이닝 커넥션
Head Of Line Blocking 이슈가 발생하여, 모던 브라우저의 경우 파이프라이닝을 사용하지 못하게 하고 6~8개의 커넥션(병렬 커넥션)을 사용하는 방식

### 병렬 커넥션
도메인 샤딩
- Each transaction opens/closes a new connection, costing time and bandwidth.
- Each new connection has reduced performance because of TCP slow start.
- There is a practical limit on the number of open parallel connections.

# HTTP/2
HTTP/1.1에서 네트워크 재사용의 단점: 유휴(idle) 상태에서도 연결을 맺고 있어야 해서 서버 리소스의 소비, Dos Attack
헤더 필드 압축, 멀티플렉싱

## 커넥션 관리

### 멀티플렉싱

# HTTP/3
핸드쉐이킹 등에 쓰이는 자원을 사용하지 않기 위해 UDP 사용, UDP는 통신만 담당하기 때문에 무결성을 보장하기 위한 코드가 추가된 QUIC를 사용

# 요약
- HTTP/0.9:
- HTTP/1.0:
- HTTP/1.1:
- HTTP/2.0:
- HTTP/3.0:

# 부록

## TCP

### 연결 과정
3-Way Handshaking

### 종료 과정
4-Way Handshaking

## UDP

## HOL 블로킹 (Head-Of-Line Blocking)

## Dos, DDos

#### 참고
- [https://evan-moon.github.io/2019/10/08/what-is-http3/](https://evan-moon.github.io/2019/10/08/what-is-http3/)
- [https://ykarma1996.tistory.com/86](https://ykarma1996.tistory.com/86)
- [https://developers.google.com/web/fundamentals/performance/http2?hl=ko](https://developers.google.com/web/fundamentals/performance/http2?hl=ko)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)
- [https://velog.io/@seeker1207/HTTP-0.9에서-HTTP-3.0까지](https://velog.io/@seeker1207/HTTP-0.9에서-HTTP-3.0까지)
- [https://www.w3.org/Protocols/HTTP/1.0/spec.html](https://www.w3.org/Protocols/HTTP/1.0/spec.html)
- [https://it-mesung.tistory.com/146](https://it-mesung.tistory.com/146)
- [https://withbundo.blogspot.com/2021/02/http-http-10-http-11.html](https://withbundo.blogspot.com/2021/02/http-http-10-http-11.html)
- [https://bbubbush.tistory.com/21](https://bbubbush.tistory.com/21)
- [https://javaplant.tistory.com/24](https://javaplant.tistory.com/24)
- [https://hirlawldo.tistory.com/106](https://hirlawldo.tistory.com/106)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x](https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x)
- [https://ssungkang.tistory.com/entry/네트워크-HTTP-11-VS-HTTP-20](https://ssungkang.tistory.com/entry/네트워크-HTTP-11-VS-HTTP-20)
- [https://goodgid.github.io/HTTP-Keep-Alive/](https://goodgid.github.io/HTTP-Keep-Alive/)
- [https://goyunji.tistory.com/8](https://goyunji.tistory.com/8)
- [https://gahui-developer123.tistory.com/106](https://gahui-developer123.tistory.com/106)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Connection](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Connection)
- [https://www.popit.kr/나만-모르고-있던-http2/](https://www.popit.kr/나만-모르고-있던-http2/)
- [https://medium.com/@jperasmus11/domain-sharding-on-the-modern-web-dc97df4f6a90](https://medium.com/@jperasmus11/domain-sharding-on-the-modern-web-dc97df4f6a90)
- [https://kamranahmed.info/blog/2016/08/13/http-in-depth/](https://kamranahmed.info/blog/2016/08/13/http-in-depth/)
- [https://letitkang.tistory.com/79](https://letitkang.tistory.com/79)
- [https://kscodebase.tistory.com/297](https://kscodebase.tistory.com/297)
- [https://www.oreilly.com/library/view/http-the-definitive/1565925092/ch04s05.html](https://www.oreilly.com/library/view/http-the-definitive/1565925092/ch04s05.html)
