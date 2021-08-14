---
layout: post
title: '[ETC] Cookie 톺아보기'
featured-img: etc/xss_xsrf_banner.png
category: [tech, etc]
summary: Cookie에 대해 살펴보도록 하겠습니다.
---

# 쿠키란

## 배경

## 구조

## 쿠키 만들기

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
4,096바이트 크기의 쿠키를 지원할 것
한 도메인 당 최소 50개 쿠키를 지원할 것(예: 각 웹사이트 당)
총 최소 3,000개 쿠키를 지원할 것.

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