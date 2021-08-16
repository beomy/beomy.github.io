---
layout: post
title: '[ETC] Cookie 톺아보기'
featured-img: etc/xss_xsrf_banner.png
category: [tech, etc]
summary: 쿠키를 통해 사용자 인증이 이루어질 경우 쿠키가 탈취 되었을 때 큰 피해가 발생 할 수 있기 때문에 쿠키를 사용하기 전에 쿠키가 무엇인지 이해하고 주의하며 사용하는 것은 중요합니다.
---

이번 포스트에서는 쿠키에 대해 살펴보도록 하겠습니다.

쿠키를 통해 사용자 인증이 이루어 질 수 있고, 쿠키를 통해 사용자 인증이 이루어질 경우 쿠키가 탈취 되었을 때 큰 피해가 발생 할 수 있기 때문에 쿠키를 사용하기 전에 쿠키가 무엇인지 이해하고 주의하며 사용하는 것은 중요합니다.

# 쿠키란
쿠키는 HTTP 쿠키, 웹 쿠키, 브라우저 쿠키라고도 불리웁니다. 쿠키는 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각입니다. 브라우저는 이 데이터 조각을 저장해 놓았다가 동일한 서버에 재 요청 시 이 정보를 함께 전송합니다.

서버에서 쿠키를 설정해 주기 때문에 쿠키가 브라우저 간에 공유된다고 혼동을 줄 수 있지만, 브라우저에서 쿠키를 저장하기 때문에 브라우저 간의 쿠키 는 공유 되지 않습니다.

## 목적
쿠키는 상태가 없는(stateless) HTTP 프로토콜에서 상태 정보를 기억하기 위해 사용됩니다.

- 세션 관리(Sessing Mnangement)
- 개인화(Personalization)
- 트래킹(Tracking)

## 구조

## 설정

### Set-Cookie와 Cookie

## 속성

### 라이프 타임 속성
- Expires
- Max-Age
세션 쿠키

### 보안 속성
- Secure
- HttpOnly
- SameSite

### 스코프 속성
- Domain
- Path

## 쿠키 사양
- 4,096바이트 크기의 쿠키를 지원할 것
- 한 도메인 당 최소 50개 쿠키를 지원할 것(예: 각 웹사이트 당)
- 총 최소 3,000개 쿠키를 지원할 것.

## 브라우저에서 쿠키 업데이트

### CookieStorage

### document.cookie

# SameSite 속성

# 서드 파트 쿠키

# 부록

## localStorage

## sessionStorage

## 구글에서 쿠키 차단

## 무상태 프로토콜

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