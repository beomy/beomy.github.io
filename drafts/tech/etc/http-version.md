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

# HTTP/1.1
HTTP/1.1은 HTTP의 첫번째 표준 버전으로 HTTP/1.0과 동일한 구조를 가집니다.

## 개선 사항
성HTTP는 TCP 통신을 사용하는데 HTTP/1.0에서는 매 요청 마다 네트워크를 연결하고 연결을 끊는 작업이 이루어집니다. 만약 동일한 서버에 5번의 요청을 보낸다면 네트워크 연결 -> 요청 -> 응답 -> 네트워크 연결 해제 이 과정이 반복해서 5번 일어나게 됩니다. HTTP/1.1에서는 네트워크 연결을 유지하여 성능을 최적화 하는 등의 HTTP/1.0의 몇가지 단점을 보완하게 됩니다.

네트워크 연결 재사용, 파이프라이닝 추가, 청크된 응답 지원, 캐시 제어 기능 추가, 콘텐치의 언어, 인코딩, 타입 협의 도입, 동일한 IP에 다른 도메인 호스팅 기능 추가, 이렇게 6가지 개선 사항을 하나씩 살펴보도록 하겠습니다.

### 네트워크 연결 재사용
3번의 HTTP 통신을 살 때 네트워크 연결을 재사용하는 경우와 재사용하지 않을 경우의 차이는 아래 그림과 같습니다.

|연결을 재사용하지 않는 경우|연결을 재사용한 경우|
|:--:|:--:|
|![네트워크 연결 재사용 안함](/assets/img/posts/etc/http_short_lived_connection.png)|![네트워크 연결 재사용](/assets/img/posts/etc/http_persistent_connection.png)|

이렇게 네트워크 연결을 재사용할 수 있게 된 이유는 `Connection` 헤더와 `Keep-Alive` 헤더에 있습니다.

#### `Connection` 헤더
`Connection` 헤더는 현재의 전송이 완료된 후 네트워크 연결을 유지할지 유지하지 않을지를 결정합니다. HTTP/1.0에서는 `close`가 HTTP/1.1에서는 `keep-alive`가 기본 값입니다.

#### `Keep-Alive` 헤더

### 파이프라이닝 추가

### 청크된 응답 지원
`Transfer-Encoding` 헤더

### 캐시 제어 기능 추가
캐시 관련 헤더

### 콘텐츠 협상 도입
콘텐츠의 언어, 인코딩, 타입 협상 도입
`Accept`, `Accept-Language`, `Accept-Encoding`

### 동일한 IP에 다른 도메인 호스트 기능 추가
`Host` 헤더

# HTTP/2
헤더 필드 압축, 멀티플렉싱

# HTTP/3
핸드쉐이킹 등에 쓰이는 자원을 사용하지 않기 위해 UDP 사용, UDP는 통신만 담당하기 때문에 무결성을 보장하기 위한 코드가 추가된 QUIC를 사용

# 부록

## TCP

## 연결 과정
3-Way Handshaking

## 종료 과정
4-Way Handshaking

## UDP

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
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Connection_management_in_HTTP_1.x](https://developer.mozilla.org/ko/docs/Web/HTTP/Connection_management_in_HTTP_1.x)
- [https://ssungkang.tistory.com/entry/네트워크-HTTP-11-VS-HTTP-20](https://ssungkang.tistory.com/entry/네트워크-HTTP-11-VS-HTTP-20)
- [https://goodgid.github.io/HTTP-Keep-Alive/](https://goodgid.github.io/HTTP-Keep-Alive/)
- [https://goyunji.tistory.com/8](https://goyunji.tistory.com/8)
- [https://gahui-developer123.tistory.com/106](https://gahui-developer123.tistory.com/106)
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Connection](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Connection)
