---
layout: post
title: '[ETC] HTTP 캐시'
featured-img: etc/HTTP_logo.png
category: [tech, etc]
summary: HTTP 캐시는 첫 HTTP 요청 시 HTML, Image, JS, CSS 등의 파일을 다운로드 받아 특정 위치에 복사본을 저장하고 이후 동일한 HTTP 요청시 다시 다운로드하지 않고 내부에 저장한 파일을 사용하여 더 빠르게 서비스하기 위한 기능입니다.
---

이번 포스트에서는 HTTP 요청과 응답에 사용되는 리소스를 최소화 하기 위한 기능 중 하나인 HTTP 캐시에 대해 살펴보도록 하겠습니다.

# 캐시 목적
HTTP 캐시는 첫 HTTP 요청 시 HTML, Image, JS, CSS 등의 파일을 다운로드 받아 특정 위치에 복사본을 저장하고 이후 동일한 HTTP 요청시 다시 다운로드하지 않고 내부에 저장한 파일을 사용하여 더 빠르게 서비스하기 위한 기능입니다.

캐시는 갑작스럽게 많은 요청에 대처할 때 특히 중요합니다. 많은 사람이 거의 동시에 웹 문서에 접근할 때, 트래픽이 급증하고 네트워크와 웹 서버에 심각한 장애를 일으킬 수 있습니다.

# 캐시의 적중/부적중

# 캐시 종류

## 브라우저 캐시

## 프록시 캐시

## 게이트웨이 캐시

# 캐시 처리 단계
- 요청 받기
- 파싱
- 검색
- 신선도 검사
- 응답 생성: 캐시된 응답을 원 서버에서 온 것처럼 보이게 하기 위해서 캐시는 캐시된 서버 응답 헤더를 토대로 응답 헤더를 생성한다. 또한 신선도 정보(Cache-Control, Age, Expires)를 삽입한다.
- 발송
- 로깅: 선택

# 캐시 신선도

## 문서 만료
`Cache-Control`, `Expires` 해더는 우유의 유통기한과 마찬가지로, 헤더에 기록된 시간보다 오래됬으면 캐시를 새롭게 업데이트 한다.

### `Cache-Control: max-age` 헤더
문서의 최대 나이를 정의한다. `Cache-Control: max-age:484200`와 같이 사용되며, 문서가 처음 생성된 이후부터 신성하다고 판단하는 시간이 초단위로 지정한다.

### `Expires` 헤더
유효기간을 지정한다. `Expires: Fri, 05 Jul 2002, 05:00:00 GTM`과 같이 사용되며, 현재 시간이 지정된 시간의 이후라면 신선하지 않은 것으로 판단한다.

## 서버 재검사
문서의 신선도를 매 요청마다 검증할 필요없이 문서가 만료되었을 때 한 번만 서버와 재검사 하도록 하는 것을 말한다.

### `If-Modified-Since` 헤더: 날짜 재검사
만약 문서가 주어진 날짜 이후로 수정되었다면 요청은 평범하게 성공한다. 반면에 문서가 주어진 날짜 이전에 수정되었다면 본문을 포함하지 않는 `304 Not Modified` 응답 메시지를 클라이언트에게 응답한다. 응답 헤더는 포함하지만 갱신이 필요한 것들만 보낸다.

~~`Last-Modified` 응답 헤더의 필요 여부 확인~~

### `If-None-Match` 헤더: 엔터티 태그 재검사
`ETag` 헤더: Entity Tag

### `ETag`와 `Last-Modified`

# 캐시 제어

## no-cache, no-store

## max-age

## expires

## must-revalidate

## 휴리스틱 만료

# 부록
- 클라이언트에서 캐시의 신선도를 구별할 수 있는 방법: `Date`, `Age` 헤더

#### 참고
- [https://developer.mozilla.org/ko/docs/Web/HTTP/Caching](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)
- [https://en.wikipedia.org/wiki/Web_cache](https://en.wikipedia.org/wiki/Web_cache)
- [https://ko.wikipedia.org/wiki/웹_캐시](https://ko.wikipedia.org/wiki/웹_캐시)
- [https://pjh3749.tistory.com/264](https://pjh3749.tistory.com/264)
- [https://toss.tech/article/smart-web-service-cache](https://toss.tech/article/smart-web-service-cache)
- [https://hahahoho5915.tistory.com/33](https://hahahoho5915.tistory.com/33)
- [https://withbundo.blogspot.com/2017/07/http-13-http-iii-if-match-if-modified.html](https://withbundo.blogspot.com/2017/07/http-13-http-iii-if-match-if-modified.html)
