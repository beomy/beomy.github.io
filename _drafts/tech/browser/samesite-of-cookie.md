---
layout: post
title: '[Browser] Cookie의 SameSite 속성'
featured-img: browser/cookie.png
category: [tech, browser]
summary: 쿠키의 속성 중 SameSite 속성은 서드 파티 쿠키의 보안 이슈를 해결하기 위해 만들어진 속성입니다.
---

쿠키의 속성 중 `SameSite` 속성은 [서드 파티 쿠키](/tech/browser/cookie/#퍼스트-파티-쿠키와-서드-파티-쿠키)의 보안 이슈를 해결하기 위해 만들어진 속성으로, Cross-Site 요청에 쿠키를 포함할지 포함하지 않을지 결정하는 쿠키 보안 속성입니다. 이번 포스트에서는 쿠키의 `SameSite` 속성을 살펴보도록 하겠습니다.

# Same Site 란
[공개 접미사 목록](https://publicsuffix.org/list/public_suffix_list.dat)을 보면 어떤 사이트들이 동일한 사이트로 판단되는지 알 수 있습니다. 예를 들어, `www.naver.com`과 `search.naver.com`는 동일한 사이트로 판단되지만, 공개 접미사 목록에 있는 `github.io`는 `beomy.github.io`와 `samesite.github.io`는 서로 다른 사이트로 판단합니다.

# `SameSite` 속성
`SameSite` 속성은 `None`, `Lax`과 `Strict` 3개 중 하나의 값을 가질 수 있습니다. `SameSite` 속성이 등장하기 전의 Cookie는 `None` 방식으로 동작했지만, 크롬 80버전 이상부터 `SameSite`의 기본 값은 `Lax`가 되었습니다.

`None`, `Lax`, `Strick`에서 어떻게 쿠키가 전송되는지 확인해 보도록 하겠습니다.
https://beomy-a.herokuapp.com/

## `None`
`None` 속성은 `SameSite` 속성이 만들어지기 전과 동일한 방식으로 쿠키를 전송하기 위한 속성입니다. `SameSite` 속성에 `None`을 사용하기 위해서는 쿠기에 `Secure` 속성이 정의되어야 합니다. `SameSite=None` 일 때 `img` 태그, `iframe`, `xhr` 요청, `form` 요청에서 쿠키가 전송되는지 확인해 보도록 하겠습니다.

### img 태그에서 쿠키 전송

### a 태그에서 쿠키 전송

### iframe에서 쿠키 전송

### fetch 요청에서 쿠키 전송

### xhr 요청에서 쿠키 전송

### form 태그에서 쿠키 전송

## `Lax`
[크로미움의 SameSite 속성 설명](https://www.chromium.org/administrators/policy-list-3/cookie-legacy-samesite-policies)을 보면 아래와 같이 `Lax` 속성을 설명합니다.

A cookie with "SameSite=Lax" will be sent with a same-site request, or a cross-site top-level navigation with a "safe" HTTP method.

## `Strict`

# 부록

## 도메인과 사이트

## `Domain` 속성과 `SameSite` 속성

## `SameSite` 속성과 `Secure` 속성

#### 참고
- [https://www.chromium.org/administrators/policy-list-3/cookie-legacy-samesite-policies](https://www.chromium.org/administrators/policy-list-3/cookie-legacy-samesite-policies)
- [https://seob.dev/posts/브라우저-쿠키와-SameSite-속성/](https://seob.dev/posts/브라우저-쿠키와-SameSite-속성/)
- [https://www.hahwul.com/2020/01/18/samesite-lax/](https://www.hahwul.com/2020/01/18/samesite-lax/)
- [https://web.dev/samesite-cookies-explained/](https://web.dev/samesite-cookies-explained/)
- [https://sevendollars.tistory.com/178](https://sevendollars.tistory.com/178)
- [https://experienceleague.adobe.com/docs/target/using/implement-target/before-implement/privacy/google-chrome-samesite-cookie-policies.html?lang=ko-KR](https://experienceleague.adobe.com/docs/target/using/implement-target/before-implement/privacy/google-chrome-samesite-cookie-policies.html?lang=ko-KR)
- [https://cherish-it.tistory.com/12](https://cherish-it.tistory.com/12)
- [https://yangbongsoo.tistory.com/5?category=919814](https://yangbongsoo.tistory.com/5?category=919814)
- [https://jinn-blog.tistory.com/97](https://jinn-blog.tistory.com/97)
- [https://stackoverflow.com/questions/57090774/what-are-the-security-differences-between-cookies-with-domain-vs-samesite-strict](https://stackoverflow.com/questions/57090774/what-are-the-security-differences-between-cookies-with-domain-vs-samesite-strict)
- [https://ko.strephonsays.com/difference-between-domain-and-website](https://ko.strephonsays.com/difference-between-domain-and-website)
- [https://www.hostwinds.kr/tutorials/whats-difference-domain-web-site](https://www.hostwinds.kr/tutorials/whats-difference-domain-web-site)