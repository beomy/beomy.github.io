---
layout: post
title: '[React] react-hook-form 6가지 특징'
featured-img: react/react-hook-form.png
category: [tech, react]
summary: FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와 주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다.
---

FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 됩니다. React Hook Form은 사용자 입력을 받고 검증하는 것을 도와주는 라이브러리로 사용자에게 입력을 받고 검증하는데 드는 시간을 줄일 뿐만 아니라 더불어 성능까지 두 마리 토끼를 모두 잡을 수 있습니다. 이번 포스트에서는 React Hook Form에 대해서 살펴보도록 하겠습니다.

> ##### TL;DL
> - UX, UI
> - 가볍고 성능이 좋음
> - UI 라이브러리와 함께 사용하기 용이함
> - 기존 HTML을 그대로 사용하여 웹 접근성등을 지키기 용이함

## NPM 문서에서의 특징
[NPM 문서](https://www.npmjs.com/package/react-hook-form)와 [공식 문서](https://www.react-hook-form.com/)는 동일한 내용으로 React Hook Form의 특징을 이야기하고 있지만, React Hook Form을 이해하는데 도움이 될 것 같아 NPM 문서의 내용을 아래와 같이 가져왔습니다. NPM 문서에서는 아래와 같이 React Hook Form의 특징을 이야기 합니다.

- **Built with performance, UX and DX in mind**: 성능, UX, DX를 고려하여 만들어졌습니다.
- **Embraces native HTML form validation**: 기존의 HTML을 사용하여 유효성 검사합니다.
- **Out of the box integration with UI libraries**: UI 라이브러리와 통합이 가능합니다.
- **Small size and no dependencies**: 작은 크기와 종속성이 필요 없습니다.
- **Support Yup, Zod, AJV, Superstruct, Joi and others**: Yup, Zod, AJV, Superstruct, Joi 등을 지원합니다.

이런 특징들을 공식 문서에서 이야기하는 6가지 특징에 맞춰 다른 라이브러리(formik, rc-field-form)와 비교하며 살펴보도록 하겠습니다.

## DX: 코드 비교
공식 문서에서는 React Hook Form이 직관적이고 완전한 형태의 API를 제공하여 개발자에게 좋은 개발 경험을 제공해 준다고 이야기합니다. React Hook Form의 사용성이 좋다 정도로 이해가 되는데, 사용성이 개발자 경험에서 가장 중요한 부분이지만 얼마나 간단하게 작성할 수 있는지 그 라이브러리의 생태계는 얼마나 큰지도 개발자 경험에서 무시하지 못할 영역입니다. `react-hook-form`, `formik`, `rc-field-form` 라이브러리를 코드양과 생태계 크기로 비교해 살펴보겠습니다.

### 코드양 비교
동일한 역할을 하는 코드를 `react-hook-form`, `formik`, `rc-field-form`으로 만들어보도록 하겠습니다.

> ##### 요약
> - `react-hook-form`: 35라인, 글자수 589자
> - `formik`: 31라인, 글자수 657자
> - `rc-field-form`: 58라인, 글자수 823자

먼저 아래 코드는 `react-hook-form`으로 작성된 코드입니다.

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

위의 코드는 [CodeSandBox](https://codesandbox.io/s/react-hook-from-simple-example-vcxdtc)에서 확인할 수 있습니다. `react-hook-form`으로 작성된 코드의 라인 수는 35라인, 공백을 제외한 글자수는 589자입니다.

아래 코드는 formik로 작성된 코드입니다.

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
    <Formik initialValues={{ email: '', username: '' }} onSubmit={onSubmit}>
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

위의 코드는 [CodeSandBox](https://codesandbox.io/s/formik-simple-example-k9m8dr)에서 확인할 수 있습니다. formik로 작성된 코드의 라인 수는 31라인, 공백을 제외한 글자수는 657자입니다.

아래 코드는 rc-field-form으로 작성된 코드입니다.

```jsx
// rc-field-form
import Form, { Field } from "rc-field-form";

const Input = ({ value = "", ...props }) => <input value={value} {...props} />;

const ErrorMessage = ({ errors }) =>
  errors.map((err) => <span key={err}>{err}</span>);

export default function App() {
  const onSubmit = (values) => console.log(values);
  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onSubmit}>
      {() => (
        <>
          <Field
            name="email"
            rules={[
              {
                required: true,
                message: "Required"
              },
              {
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
              }
            ]}
          >
            <Input />
          </Field>
          <ErrorMessage errors={form.getFieldError("email")} />

          <Field
            name="username"
            rules={[
              {
                validator: (rule, value) => {
                  return new Promise((resolve, reject) => {
                    if (value === "admin") {
                      reject();
                    }
                    resolve();
                  });
                },
                message: "Nice try!"
              }
            ]}
          >
            <Input />
          </Field>
          <ErrorMessage errors={form.getFieldError("username")} />

          <button type="submit">Submit</button>
        </>
      )}
    </Form>
  );
}
```

위의 코드는 [CodeSandBox](https://codesandbox.io/s/field-form-simple-example-x9p78r)에서 확인할 수 있습니다. rc-field-form으로 작성된 코드의 라인 수는 58라인, 공백을 제외한 글자수는 823자입니다.

작성된 코드의 라인수를 비교하면 `formik` < `react-hook-form` < `rc-field-form`이지만 글자수로 비교하면 `react-hook-form` < `formik` < `rc-field-form`으로 `react-hook-form`이 실제 작성하는 코드양이 가장 적은 것을 확인 할 수 있습니다.

### 생태계 크기 비교
생태계 크기를 좀더 객관적으로 판단하기 위해 NPM에서 라이브러리 다운로드 수와 GitHub의 스타 갯수로 비교해 보도록 하겠습니다.

|         |                                  `react-hook-form`                                  |                             `formik`                              |                               `rc-field-form`                               |
|:-------:|:---------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:-------------------------------------------------------------------------:|
|   NPM   |  ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_npm.png)   |  ![formik npm 다운로드 수](/assets/img/posts/react/formik_npm.png)   |  ![rc-field-form 다운로드 수](/assets/img/posts/react/rc_field_form_npm.png)   |
| GitHub  | ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_github.png) | ![formik npm 다운로드 수](/assets/img/posts/react/formik_github.png) | ![rc-field-form 다운로드 수](/assets/img/posts/react/rc_field_form_github.png) |

NPM 다운로드 수와 GitHub의 스타 갯수 모두 `react-hook-form` > `formik` > `rc-field-form` 순으로 많이 받았습니다.

## HTML standard: 기존 HTML 사용
React Hook Form은 기존의 HTML을 사용하며, 유효성 검사를 위한 API를 통해 유효성 검사를 진행합니다. 기존의 HTML을 사용한다는 점은 개발자들에게 폼 관리를 위한 컴포넌트를 공부하는 러닝 커브를 줄일 수 있습니다. 또한 HTML을 그대로 사용하기 때문에 `aria-*` HTML 속성을 사용하는 웹 접근성(a11y)을 어렵지 않게 지킬 수 있습니다.

## Super Light: 크기와 종속성 비교
React Hook Form은 크기가 작고, 종속성이 없는 라이브러리입니다. [Bundle Phobia](https://bundlephobia.com/)에서 패키지의 크기와 종속성을 확인할 수 있는데, [react-hook-horm](https://bundlephobia.com/package/react-hook-form@7.45.1), [formik](https://bundlephobia.com/package/formik@2.4.2), [rc-field-form](https://bundlephobia.com/package/rc-field-form@1.34.1) 3개의 라이브러리를 비교해 살펴보도록 하겠습니다.

### 크기 비교
|                                 `react-hook-form`                                  |                             `formik`                              |                               `rc-field-form`                               |
|:--------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:-------------------------------------------------------------------------:|
| ![react-hook-from bundle 크기](/assets/img/posts/react/react_hook_form_bundle.png) | ![formik bundle 크기](/assets/img/posts/react/formik_bundle.png) | ![rc-field-form bundle 크기](/assets/img/posts/react/rc_field_form_bundle.png) |

번들된 패키지의 크기는 `react-hook-form` < `formik` < `rc-field-form` 순으로 `react-hook-form`이 가장 작은 것을 확인할 수 있습니다.

### 종속성 비교
|                                                  종속성                                                  |
|:-----------------------------------------------------------------------------------------------------:|
| ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_dependency.png) `react-hook-form` |
|          ![react-hook-from npm 다운로드 수](/assets/img/posts/react/formik_dependency.png) `formik`          |
|   ![react-hook-from npm 다운로드 수](/assets/img/posts/react/rc_field_form_dependency.png) `rc-field-form`   |

`react-hook-form`은 `self` 100%로 종속성이 없는 것을 확인 할 수 있습니다.

## Performance: 성능 비교
- Performance: 리렌더링 횟수와 검증 계산을 최소화하였으며 빠른 마운팅 속도를 제공합니다.

> Uncontrolled와 Controlled
>
> - https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components

### 속도 비교
크롬 개발자 도구의 Performace 탭과 Network 탭을 이용하여 `react-hook-form`, `formik`, `rc-field-form` 라이브러리의 속도를 비교했습니다.

#### Performance 비교
아래 그림은 CPU 6x slowdown, Network Slow 3G에서 자바스크립트가 실행되는데 걸리는 시간을 테스트한 그림입니다.

|                                    `react-hook-form`                                    |                             `formik`                              |                               `rc-field-form`                               |
|:-------------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:-------------------------------------------------------------------------:|
| ![react-hook-from bundle 크기](/assets/img/posts/react/react_hook_form_performance.png) | ![formik bundle 크기](/assets/img/posts/react/formik_performance.png) | ![rc-field-form bundle 크기](/assets/img/posts/react/rc_field_form_performance.png) |

세 라이브러리 모두 아주 작은 단위를 결과로 보여주긴 하지만 `react-hook-form` < `rc-field-form` < `formik` 순서로 `react-hook-form`이 가장 빠른 속도를 보이는 것을 볼 수 있습니다.

#### Network 비교
아래 그림은 Slow 3G에서 테스트에서 DOM이 그려지는데 걸리는 시간을 테스트한 그림입니다.

|                                                네트워크                                                |
|:--------------------------------------------------------------------------------------------------:|
| ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_network.png) `react-hook-form` |
|        ![react-hook-from npm 다운로드 수](/assets/img/posts/react/formik_network.png) `formik`         |
| ![react-hook-from npm 다운로드 수](/assets/img/posts/react/rc_field_form_network.png) `rc-field-form`  |

큰 차이는 없지만 `DOMContentLoaded`로 DOM이 로드되는게 걸리는 시간을 보면, `react-hook-form` < `rc-field-form` < `formik` 순서로 `react-hook-form`이 가장 빠르게 DOM을 그리는 것을 볼 수 있습니다.

### 리렌더링 횟수
React Hook Form은 Uncontrolled 방식으로 동작하기 때문에 리렌더링 횟수를 줄일 수 있는 장점이 있습니다. Uncontrolled 방식으로 폼을 관리할 경우 사용자 입력 값을 제어하기 어럽게 되는데, 이런 점을 보완하기 위해 `watch`라는 기능을 사용하여 원하는 값만 변경되었는지 감시할 수 있습니다.

아래 그림은 `react-hook-form`, `formik`, `rc-filed-form`의 리렌더링 횟수를 비교한 그림입니다.

|                                    `react-hook-form`                                    |                             `formik`                              |                                  `rc-field-form`                                   |
|:-------------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:---------------------------------------------------------------------------------:|
| ![react-hook-from bundle 크기](/assets/img/posts/react/react_hook_form_rerendering.gif) | ![formik bundle 크기](/assets/img/posts/react/formik_rerendering.gif) | ![rc-field-form bundle 크기](/assets/img/posts/react/rc_field_form_rerendering.gif) |

동일한 입력 값을 넣었을 때 리렌더링 횟수는 `react-hook-form` < `rc-field-form` < `formik` 순서로 `react-hook-form`이 가장 리렌더링 횟수가 적은 것을 확인할 수 있습니다.

아래 그림은 React Dev Tools에서 `Highlight updates when components render` 옵션은 킨 후 렌더링 되는 것을 확인한 그림입니다.

|                                            React Dev Tools                                            |
|:-----------------------------------------------------------------------------------------------------:|
| ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_devtools.gif) `react-hook-form` |
|          ![react-hook-from npm 다운로드 수](/assets/img/posts/react/formik_devtools.gif) `formik`          |
|   ![react-hook-from npm 다운로드 수](/assets/img/posts/react/rc_field_form_devtools.gif) `rc-field-form`   |

React Dev Tools에서도 동일하게 `react-hook-form`의 리렌더링 횟수가 가장 적은 것을 확인할 수 있습니다.

## Adoptable: UI 라이브러리와 함께하기
- 다른 UI 라이브러리를 함께 사용하기 용이함

## UX: 일관된 유효성 검사
- 퍼포먼스 뿐만 아니라 일관된 UI 제공은 중요
- yup 등등 사용

## 부록

### Controlled와 Uncontrolled
부모 요소에서 자식 요소를 컨트롤할 수 있는지 여부에 따라 Controlled Component와 Uncontrolled Component로 구분할 수 있습니다. 예를 들어, 아코디언 컴포넌트에서 `펼치기` 상태를 아코디언 컴포넌트 내부에 가지고 있어 부모 컴포넌트에서 제어할 수 없을 때 이 아코디언 컴포넌트는 Uncontrolled 컴포넌트라고 합니다.

```jsx
// Uncontrolled Accordion
const Accordion = ({ title, contents }) => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded((value) => !value);
  return (
    <div>
      <h4 onClick={handleToggle}>{title}</h4>
      <p style={{ display: expanded ? 'block' : 'none' }}>{contents}</p>
    </div>
  );
};

const App = () => {
  return <Accordion title="제목" contents="아코디언 본문" />;
};
```

`펼치기` 상태를 아코디언 컴포넌트 내부에 가지고 있지 않아 부모 컴포넌트에서 제어할 수 있을 때 이 아코디언 컴포넌트를 Controlled 컴포넌트라고 합니다.

```jsx
// Controlled Accordion
const Accordion = ({ expanded, title, contents, onClick }) => {
  return (
    <div>
      <h4 onClick={handleToggle}>{title}</h4>
      <p style={{ display: expanded ? 'block' : 'none' }}>{contents}</p>
    </div>
  );
};

const App = () => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => setExpanded((value) =!value);
  return (
    <Accordion
      expanded={expanded}
      title="제목"
      contents="아코디언 본문"
      onClick={handleToggle}
    />
  );
};
```

Uncontrolled 아코디언 컴포넌트는 `펼치기` 상태 값을 내부에서 가지고 있기 때문에 펼쳐지거나 접힐 때 Uncontrolled 아코디언만 리렌더링 되지만, Controlled 아코디언 컴포넌트는 `펼치기` 상태 값을 부모에서 가지고 있기 때문에 펼쳐지거나 접힐 때 부모 컴포넌트를 포함한 모든 하위 컴포넌트가 리렌더링 됩니다.

Uncontrolled 아코디언 컴포넌트의 경우 펼쳐져 있는 상태인지, 접혀져 있는 상태인지 부모 컴포넌트는 알 수 없지만 Controlled 아코디언 컴포넌트의 경우 펼쳐져 있는 상태인지, 접혀져 있는 상태인지를 부모 컴포넌트가 알 수 있기 때문에 Controlled 아코디언 컴포넌트가 좀더 유연한 사용성을 가지게 됩니다.

##### 참고
- [https://www.react-hook-form.com/](https://www.react-hook-form.com/)
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/](https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/)
- [https://formik.org/](https://formik.org/)
- [https://www.npmjs.com/package/formik](https://www.npmjs.com/package/formik)
- [https://www.npmjs.com/package/rc-field-form](https://www.npmjs.com/package/rc-field-form)
- [https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
- [https://velog.io/@hanei100/React-ControlledUncontrolled-컴포넌트](https://velog.io/@hanei100/React-ControlledUncontrolled-컴포넌트)
