---
layout: post
title: '[ETC] XSRF와 XSS'
featured-img: browser/cors.png
category: [tech, etc]
summary: 웹 취약성을 노리는 XSRF와 XSS에 대해 살펴보도록 하겠습니다.
---

이번 포스트에서는 웹 취약성을 노리는 XSRF(혹은 CSRF)와 XSS 공격에 대해 살펴보도록 하겠습니다.

# XSS(Cross-Site Scripting)

## 취약점

## 공격 유형

### 비 지속적(Non-persistent) 기법

### 지속적(persistent) 기법

## 공격 과정

## 대응방법

# XSRF(Crose-Site Request Forgery)
사이트 간 요청 위조(XSRF 또는 CSRF라고 함)는 웹사이트 취약점 공격 중 하나입니다. 사용자가 자신의 의지와 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 하는 공격입니다.

## 취약점
사이트 간 요청 위조는 특정 웹사이트가 사용자의 웹 브라우저를 신뢰하는 상태를 노린 공격입니다. 사용자가 웹사이트에 로그인한 상태에서 사이트간 요청 위조 공격 코드가 삽입된 페이지를 열면, 공격 대상이 되는 웹사이트는 위조된 공격 명령이 믿을 수 있는 사용자로부터 발송된 것으로 판단하게 되어 공격에 노출됩니다.

## 공격 과정
구체적인 공격 과정을 아래와 같습니다.

1. 이용자는 웹사이트에 로그인하여 정상적인 쿠키를 발급받는다.
2. 공격자는 링크(예를 들어, `http://www.geocities.com/attacker`와 같은)를 이메일이나 게시판 등의 경로를 통해 이용자에게 전달한다.
3. 위의 링크의 HTML 페이지는 `<img src= "https://travel.service.com/travel_update?.src=Korea&.dst=Hell">` 같은 이미지 태그를 가집니다. 이 링크는 출발지와 도착지를 등록하기 위한 링크인데, 그 중 도착지 정보를 변조한 링크입니다.
4. 이용자가 공격용 페이지를 열면, 부라우저는 이미지 파일을 받아오기 위해 공격용 URL을 실행합니다.
5. 이용자의 승인이나 인지 없이 출발지와 도착지가 등록되어 공격이 완료됩니다.

해당 서비스 페이지는 단순히 쿠키를 통해 본인확인이 이루어지기 때문에 공격자가 정상적인 이용자의 정보를 수정 가능하게 됩니다.

## 공격 예제
XSRF 공격이 이루어지는 예제를 만들어 보도록 하겠습니다.

## 대응방법
크롬 80버전 부터 새로운 쿠키 정책이 적용되어 Cookie의 SameSite 속성의 기본값이 Lax로 변경 되었습니다.

# 부록

## SameSite Cookie

#### 참고
- [https://ko.wikipedia.org/wiki/사이트_간_스크립팅](https://ko.wikipedia.org/wiki/사이트_간_스크립팅)
- [https://ko.wikipedia.org/wiki/사이트_간_요청_위조](https://ko.wikipedia.org/wiki/사이트_간_요청_위조)
- [https://ohgyun.com/543](https://ohgyun.com/543)
- [https://rednooby.tistory.com/22](https://rednooby.tistory.com/22)
- [https://3rd-big.tistory.com/23](https://3rd-big.tistory.com/23)
- [https://itstory.tk/entry/CSRF-공격이란-그리고-CSRF-방어-방법](https://itstory.tk/entry/CSRF-공격이란-그리고-CSRF-방어-방법)
- [https://www.sickyourcoding.com/forQuiz/csrfintro](https://www.sickyourcoding.com/forQuiz/csrfintro)
- [https://swk3169.tistory.com/24](https://swk3169.tistory.com/24)
- [https://docs.microsoft.com/ko-kr/azure/active-directory/develop/howto-handle-samesite-cookie-changes-chrome-browser?tabs=dotnet](https://docs.microsoft.com/ko-kr/azure/active-directory/develop/howto-handle-samesite-cookie-changes-chrome-browser?tabs=dotnet)
- [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
- [https://ifuwanna.tistory.com/223](https://ifuwanna.tistory.com/223)