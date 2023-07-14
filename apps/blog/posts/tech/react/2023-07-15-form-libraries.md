---
layout: post
title: '[React] react-hook-form, formik, rc-field-form 폼 관리 어떤걸로 해야 할까'
featured-img: react/react.png
category: [tech, react]
summary: FrontEnd 개발을 하다보면 사용자 입력을 받고 입력 받은 값을 검증하는데에 많은 시간을 쓰게 되는데, 폼 관리 라이브러리를 사용하게 되면 사용자에게 입력을 받고 검증하는데 드는 시간과 노력을 줄일 수 있습니다.
---

> **TL;DR**
>
> 왼쪽부터 더 나은 결과를 보여준 라이브러리를 순서대로 나열하였습니다.
>
> - 코드 양 (글자 수): react-hook-form < formik < rc-field-form
> - 코드 양 (라인 수): formik < react-hook-form < rc-field-form
> - 생태계 크기 (좋아요 수): react-hook-form > formik > rc-field-form
> - 번들 크기 비교 (용량): react-hook-form < formik < rc-field-form
> - 종속성 비교 (종속성률): react-hook-form < rc-field-form < formik
> - Performance 비교 (소요 시간): react-hook-form < rc-field-form < formik
> - Network 비교 (소요 시간): react-hook-form < rc-field-form < formik
> - 리렌더링 비교 (리렌더링 수): react-hook-form < rc-field-form < formik

FrontEnd 개발을 하다 보면 사용자 입력을 받고 입력받은 값을 검증하는 데에 많은 시간을 쓰게 되는데, 폼 관리 라이브러리를 사용하게 되면 사용자에게 입력을 받고 검증하는데 드는 시간과 노력을 줄일 수 있습니다. 이번 포스트에서는 리엑트의 폼 관리 라이브러리인 `react-hook-from`, `formik`, `rc-field-form` 3가지 라이브러리를 비교해서 살펴보도록 하겠습니다.

## 코드 양 비교
> - `react-hook-form`: 35라인, 글자수 589자
> - `formik`: 31라인, 글자수 657자
> - `rc-field-form`: 58라인, 글자수 823자

코드를 얼마나 간단하게 작성할 수 있는지는 라이브러리 선택에 빼놓을 수 없는 중요한 부분 중 하나입니다. 동일한 역할을 하는 코드를 `react-hook-form`, `formik`, `rc-field-form`으로 만들어보도록 하겠습니다. 먼저 아래 코드는 `react-hook-form`으로 작성된 코드입니다.

```jsx
// react-hook-form
import { useForm } from '@beomy/blog/drafts/tech/react/react-hook-form';

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

위의 코드는 [CodeSandBox](https://codesandbox.io/s/react-hook-from-simple-example-vcxdtc)에서 확인할 수 있습니다. `react-hook-form`으로 작성된 코드의 라인 수는 35라인, 공백을 제외한 글자수는 589자입니다. 아래 코드는 `formik`로 작성된 코드입니다.

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

위의 코드는 [CodeSandBox](https://codesandbox.io/s/formik-simple-example-k9m8dr)에서 확인할 수 있습니다. `formik`로 작성된 코드의 라인 수는 31라인, 공백을 제외한 글자수는 657자입니다. 아래 코드는 `rc-field-form`으로 작성된 코드입니다.

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

위의 코드는 [CodeSandBox](https://codesandbox.io/s/field-form-simple-example-x9p78r)에서 확인할 수 있습니다. `rc-field-form`으로 작성된 코드의 라인 수는 58라인, 공백을 제외한 글자수는 823자입니다.

작성된 코드의 라인수를 비교하면 `formik` < `react-hook-form` < `rc-field-form`이지만 글자수로 비교하면 `react-hook-form` < `formik` < `rc-field-form`으로 `react-hook-form`이 실제 작성하는 코드 양이 가장 적은 것을 확인할 수 있습니다.

## 생태계 비교
라이브러리를 사용하는 개발자가 많으면 그만큼 참고할 수 있는 자료들이 많기 때문에 생태계의 크기는 라이브러리를 선택할 때 무시할 수 없는 부분입니다. 생태계 크기를 좀 더 객관적으로 판단하기 위해 NPM에서 라이브러리 다운로드 수와 GitHub의 `Star` 개수를 비교해 살펴보도록 하겠습니다.

|         |                                  `react-hook-form`                                  |                             `formik`                              |                               `rc-field-form`                               |
|:-------:|:---------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:-------------------------------------------------------------------------:|
|   NPM   |  ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_npm.png)   |  ![formik npm 다운로드 수](/assets/img/posts/react/formik_npm.png)   |  ![rc-field-form 다운로드 수](/assets/img/posts/react/rc_field_form_npm.png)   |
| GitHub  | ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_github.png) | ![formik npm 다운로드 수](/assets/img/posts/react/formik_github.png) | ![rc-field-form 다운로드 수](/assets/img/posts/react/rc_field_form_github.png) |

NPM 다운로드 수와 GitHub의 스타 개수 모두 `react-hook-form` > `formik` > `rc-field-form` 순으로 많이 받았습니다.

## 번들 크기 비교
사용자가 네트워크를 통해 번들을 다운로드하기 때문에 번들 크기가 작을수록 사용자에게 더 성능이 좋은 웹 애플리케이션 경험을 제공할 수 있습니다. 아래 그림은 [Bundle Phobia](https://bundlephobia.com/)에서 번들된 크기를 비교한 그림입니다. [react-hook-horm](https://bundlephobia.com/package/react-hook-form@7.45.1), [formik](https://bundlephobia.com/package/formik@2.4.2), [rc-field-form](https://bundlephobia.com/package/rc-field-form@1.34.1)에서 결과를 확인할 수 있습니다.

|                                 `react-hook-form`                                  |                             `formik`                              |                               `rc-field-form`                               |
|:--------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:-------------------------------------------------------------------------:|
| ![react-hook-from bundle 크기](/assets/img/posts/react/react_hook_form_bundle.png) | ![formik bundle 크기](/assets/img/posts/react/formik_bundle.png) | ![rc-field-form bundle 크기](/assets/img/posts/react/rc_field_form_bundle.png) |

번들된 크기는 `react-hook-form` < `formik` < `rc-field-form` 순으로 `react-hook-form`이 가장 작은 것을 확인할 수 있습니다.

## 종속성 비교
아래 그림은 [Bundle Phobia](https://bundlephobia.com/)에서 종속성을 비교한 그림입니다. [react-hook-horm](https://bundlephobia.com/package/react-hook-form@7.45.1), [formik](https://bundlephobia.com/package/formik@2.4.2), [rc-field-form](https://bundlephobia.com/package/rc-field-form@1.34.1)에서 결과를 확인할 수 있습니다.

|                                                  종속성                                                  |
|:-----------------------------------------------------------------------------------------------------:|
| ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_dependency.png) `react-hook-form` |
|          ![react-hook-from npm 다운로드 수](/assets/img/posts/react/formik_dependency.png) `formik`          |
|   ![react-hook-from npm 다운로드 수](/assets/img/posts/react/rc_field_form_dependency.png) `rc-field-form`   |

`react-hook-form`은 `self` 100%로 종속성이 없는 것을 확인할 수 있습니다.

## 실행 속도 비교
라이브러리를 선택할 때 또 다른 중요한 부분은 성능입니다. 빠를수록 사용자 경험뿐만 아니라 개발자 경험에도 좋은 영향을 주기 때문에 라이브러리의 성능은 빼놓을 수 없는 중요한 부분입니다. 라이브러리의 성능을 측정하기 위해 크롬 개발자 도구의 Performance와 Network 기능을 사용하도록 하겠습니다.

### Performance 비교
아래 그림은 크롬 개발자 도구의 Performance 탭에서 CPU 6x slowdown, Network Slow 3G로 자바스크립트가 실행되는 데 걸리는 시간을 테스트한 그림입니다.

|                                    `react-hook-form`                                    |                             `formik`                              |                               `rc-field-form`                               |
|:-------------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:-------------------------------------------------------------------------:|
| ![react-hook-from bundle 크기](/assets/img/posts/react/react_hook_form_performance.png) | ![formik bundle 크기](/assets/img/posts/react/formik_performance.png) | ![rc-field-form bundle 크기](/assets/img/posts/react/rc_field_form_performance.png) |

세 라이브러리의 테스트 결과는 모두 작은 단위이긴 하지만 `react-hook-form` < `rc-field-form` < `formik` 순서로 `react-hook-form`이 가장 빠른 속도를 보이는 것을 볼 수 있습니다.

### Network 비교
아래 그림은 크롬 개발자 도구의 Network 탭에서 Slow 3G로 DOM이 그려지는 데 걸리는 시간을 테스트한 그림입니다.

|                                                네트워크                                                |
|:--------------------------------------------------------------------------------------------------:|
| ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_network.png) `react-hook-form` |
|        ![react-hook-from npm 다운로드 수](/assets/img/posts/react/formik_network.png) `formik`         |
| ![react-hook-from npm 다운로드 수](/assets/img/posts/react/rc_field_form_network.png) `rc-field-form`  |

큰 차이는 없지만 `DOMContentLoaded`로 DOM이 로드되는 데 걸리는 시간을 보면, `react-hook-form` < `rc-field-form` < `formik` 순서로 `react-hook-form`이 가장 빠르게 DOM을 그리는 것을 볼 수 있습니다. (참고로 이 순서는 `resources` 크기의 순서와 동일합니다.)

## 리렌더링 비교
`formik`, `rc-field-form`은 Controlled 방식으로 동작하지만, `react-hook-form`은 Uncontrolled 방식으로 동작합니다. Uncontrolled 방식은 리렌더링 횟수를 줄일 수 있는 장점이 있지만, 사용자 입력 값을 제어하기 어려운 단점이 있습니다. react-hook-form은 이런 점을 보완하기 위해 원하는 값이 변경되었는지 감시할 수 있는 `watch`라는 기능을 제공합니다.

### 리렌더링 횟수 비교
아래 그림은 `react-hook-form`, `formik`, `rc-filed-form`의 리렌더링 횟수를 비교한 그림입니다.

|                                    `react-hook-form`                                    |                             `formik`                              |                                  `rc-field-form`                                   |
|:-------------------------------------------------------------------------------------:|:---------------------------------------------------------------:|:---------------------------------------------------------------------------------:|
| ![react-hook-from bundle 크기](/assets/img/posts/react/react_hook_form_rerendering.gif) | ![formik bundle 크기](/assets/img/posts/react/formik_rerendering.gif) | ![rc-field-form bundle 크기](/assets/img/posts/react/rc_field_form_rerendering.gif) |

동일한 입력 값을 넣었을 때 리렌더링 횟수는 `react-hook-form` < `rc-field-form` < `formik` 순서로 눈에 띄게 `react-hook-form`이 리렌더링 횟수가 적은 것을 확인할 수 있습니다.

### 리엑트 개발자 도구의 Highlight 비교
아래 그림은 React Dev Tools에서 `Highlight updates when components render` 옵션은 킨 후 렌더링 되는 것을 확인한 그림입니다.

|                                            React Dev Tools                                            |
|:-----------------------------------------------------------------------------------------------------:|
| ![react-hook-from npm 다운로드 수](/assets/img/posts/react/react_hook_form_devtools.gif) `react-hook-form` |
|          ![react-hook-from npm 다운로드 수](/assets/img/posts/react/formik_devtools.gif) `formik`          |
|   ![react-hook-from npm 다운로드 수](/assets/img/posts/react/rc_field_form_devtools.gif) `rc-field-form`   |

React Dev Tools에서도 동일하게 `react-hook-form`의 리렌더링 횟수가 가장 적은 것을 확인할 수 있습니다.

## 정리
- **생태계** 측면에서, 생태계의 크기에서 `react-hook-form`이냐, `formik`냐 2개의 선택지로 좁혀졌다고 생각됩니다.
- **사용성** 측면에서, 예제 코드에서는 `formik`에서 제공하는 컴포넌트를 사용하여 코드 양을 줄이는 방향으로 코드를 작성하였지만, [`formik`는 훅 형태의 사용성](https://formik.org/docs/api/useFormik)을 제공하여 훅을 사용하면 `react-hook-form`과 유사한 사용성을 가지게 됩니다. 사용성 측면에서 `react-hook-form`과 `formik`의 우열을 가리기는 어려웠습니다.
- **성능** 측면에서, `react-hook-form`은 번들 크기가 작아 첫 렌더링 속도가 빠르고, 리렌더링 횟수가 월등히 적기 때문에 성능 측면으로 본다면 `react-hook-form`이 더 좋은 선택으로 보입니다.
- **유연성** 측면에서, `react-hook-form`은 Uncontrolled 방식으로 성능에 이점이 있지만 폼 값을 컨트롤하기 어려운 측면이 있습니다. 이 단점을 보완하기 위해 `watch`라는 기능이 존재하지만, `formik`는 Controlled 방식이기 때문에 폼 값을 좀 더 유연성 있게 다룰 수 있어 유연성 측면에서는 `formik`가 더 좋은 선택으로 보입니다.

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

`펼치기` 상태를 아코디언 컴포넌트 내부에 가지고 있지 않아 부모 컴포넌트에서 제어할 수 있다면, 이 아코디언 컴포넌트를 Controlled 컴포넌트라고 합니다.

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

Uncontrolled 아코디언 컴포넌트의 경우 펼쳐져 있는 상태인지, 접혀 있는 상태인지 부모 컴포넌트는 알 수 없지만 Controlled 아코디언 컴포넌트의 경우 펼쳐져 있는 상태인지, 접혀 있는 상태인지를 부모 컴포넌트가 알 수 있기 때문에 Controlled 아코디언 컴포넌트가 좀 더 유연한 사용성을 가지게 됩니다.

##### 참고
- [https://www.react-hook-form.com/](https://www.react-hook-form.com/)
- [https://www.npmjs.com/package/react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/](https://react-hook-form-website-git-jeromedeleon-patch-1.bluebill1049.vercel.app/)
- [https://formik.org/](https://formik.org/)
- [https://www.npmjs.com/package/formik](https://www.npmjs.com/package/formik)
- [https://www.npmjs.com/package/rc-field-form](https://www.npmjs.com/package/rc-field-form)
- [https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)
- [https://dev.to/femi_dev/top-10-react-form-libraries-for-efficient-form-creation-hp2](https://dev.to/femi_dev/top-10-react-form-libraries-for-efficient-form-creation-hp2)
