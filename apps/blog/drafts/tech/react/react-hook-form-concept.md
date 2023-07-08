---
layout: post
title: '[React] react-hook-form 6가지 특징'
featured-img: react/react-hook-form.png
category: [tech, react]
summary: FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와 주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다.
---

FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다. 이번 포스트에서는 React Hook Form에 대해서 살펴보도록 하겠습니다.

> **TL;DL**
>
> - UX, UI
> - 가볍고 성능이 좋음
> - UI 라이브러리와 함께 사용하기 용이함
> - 기존 HTML을 그대로 사용하여 웹 접근성등을 지키기 용이함

## NPM 문서에서의 React Hook Form 특징
[NPM 문서](https://www.npmjs.com/package/react-hook-form)와 [공식 문서](https://www.react-hook-form.com/)는 동일한 내용으로 React Hook Form의 특징을 이야기하고 있지만, React Hook Form을 이해하는데 도움이 될 것 같아 NPM 문서의 내용을 아래와 같이 가져왔습니다. NPM 문서에서는 아래와 같이 React Hook Form의 특징을 이야기 합니다.

- **Built with performance, UX and DX in mind**: 성능, UX, DX를 고려하여 만들어짐
- **Embraces native HTML form validation**: 기존의 HTML을 사용하여 유효성 검사함
- **Out of the box integration with UI libraries**: UI 라이브러리와 통합이 가능함
- **Small size and no dependencies**: 작은 크기와 다른 종속성이 없음
- **Support Yup, Zod, AJV, Superstruct, Joi and others**: Yup, Zod, AJV, Superstruct, Joi 등을 지원함

이런 특징들을 공식 문서에서 이야기하는 6가지 특징에 맞춰 다른 라이브러리와 비교하며 살펴보도록 하겠습니다.

## DX: 코드 비교
공식 문서에서는 React Hook Form이 직관적이고 완전한 형태의 API를 제공하여 개발자에게 좋은 개발 경험을 제공해 준다고 이야기합니다. 개발자는 코드로 말하는 법, 말이 어려우니 다른 라이브러리들과 코드를 비교하며 살펴보도록 하겠습니다.

### 코드 양
```jsx
// react-hook-form
import { useForm } from 'react-hook-form';

export default function App() {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const onSubmit = (values) => console.log(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'invalid email address'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        {...register('username', {
          validate: (value) => value !== 'admin' || 'Nice try!'
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```
[CodeSandBox](https://codesandbox.io/s/react-hook-from-simple-example-vcxdtc)
- 줄: 35
- 공백 제외 글자수: 589

```jsx
// formik
import { Formik, Form, Field } from 'formik';

const validateEmail = (value) => {
  if (!value) {
    return 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'invalid email address';
  }
};

const validateUsername = (value) => value !== 'admin' || 'Nice try!';

export default function App() {
  const onSubmit = (values) => console.log(values);

  return (
    <Formik initialValues={{ email: '', usename: '' }} onSubmit={onSubmit}>
      {({ errors }) => (
        <Form>
          <Field name="email" validate={validateEmail} />
          {errors.email && <span>{errors.email}</span>}

          <Field name="username" validate={validateUsername} />
          {errors.username && <span>{errors.username}</span>}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

[CodeSandBox](https://codesandbox.io/s/formik-simple-example-k9m8dr)
- 줄: 31
- 공백 제외 글자수: 656

```jsx
```

[CodeSandBox](https://codesandbox.io/s/field-form-simple-example-x9p78r)

### NPM 다운로드 수

- DX: 직관적이고 완전한 형태의 API를 제공하여 개발자에게 좋은 개발 경험을 제공합니다.

## HTML standard: 기존 HTML 사용
- HTML standard: 기존의 HTML을 사용하며, 유효성 검사를 위한 API를 통해 유효성 검사를 진행합니다.
- 웹 접근성에 용이함

## Super Light: 크기 비교
- Super Light: 패키지 크기가 작은 종속성이 없는 라이브러리입니다.
- https://bundlephobia.com/package/react-hook-form@7.45.1
- https://bundlephobia.com/package/formik@2.4.2
- https://bundlephobia.com/package/rc-field-form@1.34.1

## Performance: 성능 비교
- Performance: 리렌더링 횟수와 검증 계산을 최소화하였으며 빠른 마운팅 속도를 제공합니다.

> Uncontrolled와 Controlled
>
> - https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components

### 리렌더링 횟수 비교
- uncontrolled: 성능
- Isolate Re-renders, Subscriptions

### 마운팅 속도 비교

## Adoptable: UI 라이브러리와 함께하기
- 다른 UI 라이브러리를 함께 사용하기 용이함

## UX: 일관된 유효성 검사
- 퍼포먼스 뿐만 아니라 일관된 UI 제공은 중요
- yup 등등 사용

## 기타
- formik도 괜찮은 듯 훅 형태는 react-hook-form과 유사

##### 참고
- [https://www.react-hook-form.com/](https://www.react-hook-form.com/)
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/](https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/)
- [https://formik.org/](https://formik.org/)
- [https://www.npmjs.com/package/formik](https://www.npmjs.com/package/formik)
- [https://www.npmjs.com/package/rc-field-form](https://www.npmjs.com/package/rc-field-form)
- [https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
