---
layout: post
title: '[React] react-hook-form API 레퍼런스'
featured-img: react/react-hook-form.png
category: [tech, react]
summary: 사용하고 있는 외부 라이브러리 API를 자세히 알면 그 라이브러리에서 제공하는 다양한 기능들을 인지하고 사용할 수 있기 때문에 라이브러리를 더 멋있게 사용할 수 있습니다. 이번 포스트에서는 React Hook Form을 좀 더 멋있게 사용하기 위해 React Hook Form에서 제공하는 API들을 살펴보도록 하겠습니다.
---

사용하고 있는 외부 라이브러리 API를 자세히 알면 그 라이브러리에서 제공하는 다양한 기능들을 인지하고 사용할 수 있기 때문에 라이브러리를 더 멋있게 사용할 수 있습니다. 이번 포스트에서는 React Hook Form을 좀 더 멋있게 사용하기 위해 React Hook Form에서 제공하는 API들을 살펴보도록 하겠습니다.

## `useForm`
`useForm`은 React Hook Form을 사용할 때 항상 사용해야 하는 가장 기본적인 훅입니다. `useForm`의 형태는 아래 코드와 같습니다.

```ts
export declare function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
>(props?: UseFormProps<TFieldValues, TContext>):
  UseFormReturn<TFieldValues, TContext, TTransformedValues>;

export type FieldValues = Record<string, any>;
```

#### props
```ts
type UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = Partial<{
  mode: Mode;
  reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
  defaultValues: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>;
  values: TFieldValues;
  resetOptions: Parameters<UseFormReset<TFieldValues>>[1];
  resolver: Resolver<TFieldValues, TContext>;
  context: TContext;
  shouldFocusError: boolean;
  shouldUnregister: boolean;
  shouldUseNativeValidation: boolean;
  progressive: boolean;
  criteriaMode: CriteriaMode;
  delayError: number;
}>;
```

- `mode: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all' = 'onSubmit'`
  - 제출(submit)되기 전의 검증이 실행되는 이벤트를 정의합니다.
- `reValidateMode: onChange | onBlur | onSubmit = 'onChange'`
  - 제출(submit)된 후의 검증이 실행되는 이벤트를 정의합니다.
- `defaultValues: Record<string, any> | (payload?: unknown) => Promise<Record<string, any>>`
  - 폼의 기본 값을 할당할 때 사용되는 필드입니다. 동기, 비동기 정의 모두 가능합니다.
    ```ts
    // set default value sync
    useForm({
      defaultValues: {
        firstName: '',
        lastName: ''
      }
    })

    // set default value async
    useForm({
      defaultValues: async () => fetch('/api-endpoint');
    })
    ```
  - `undefined`로 기본 값을 정의하는 것은 피해야 합니다.
  - `reset` 함수로 초기화 할 경우, `defaultValues`에 설정한 값으로 초기화 됩니다.
  - `defaultValues`에 설정된 값은 제출(submit)에 포함됩니다.
  - `Moment`, `Luxon`과 같은 커스텀 프로토타입 메소드가 포함된 객체를 정의하는 것은 피해야 합니다.
- `values: Record<string, any>`
  - `defaultValues`와 유사한 목적으로 사용되지만 `defaultValues`와 다르게 `values`는 반응형으로 동작하여 `values` 값이 변경 되면 폼에 반영됩니다. 아래 예제에서 확인할 수 있습니다.
    <div>
    <iframe src="https://codesandbox.io/embed/react-hook-form-defaultvalues-values-vn55nf?fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
    title="React Hook Form - defaultValues &amp; values"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
    </div>
  - `defaultValues`와 `values`가 모두 적용되어 있다면, `values` 값이 폼에 적용됩니다.
- `resetOptions: KeepStateOptions`
  - `defaultValues`나 `values`가 업데이트 될 때 내부적으로 `reset` API가 호출되는데, 이 때 호출되는 `reset` API의 옵션을 설정해 주는 필드입니다. 자세한 내용은 [reset API](~~)를 참고 바랍니다.
- `resolver: Resolver`
  - ```ts
    export type Resolver<
      TFieldValues extends FieldValues = FieldValues,
      TContext = any
    > = (
      values: TFieldValues,
      context: TContext | undefined,
      options: ResolverOptions<TFieldValues>
    ) => Promise<ResolverResult<TFieldValues>> | ResolverResult<TFieldValues>;

    export type ResolverResult<
      TFieldValues extends FieldValues = FieldValues
    > = ResolverSuccess<TFieldValues> | ResolverError<TFieldValues>;

    export type ResolverSuccess<TFieldValues extends FieldValues = FieldValues> = {
      values: TFieldValues;
      errors: {};
    };

    export type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
      values: {};
      errors: FieldErrors<TFieldValues>;
    };
    ```
  - 외부 유효성 검증 라이브러리를 사용하기 위해 사용되는 필드입니다([유효성 검증 - 외부 유효성 검증 라이브러리와 함께](/tech/react/react-hook-form/#외부-유효성-검증-라이브러리와-함께) 참고). 하지만 아래 코드와 같이 유효성 검증 로직을 직접 작성할 수도 있습니다.
    <div>
      <iframe src="https://codesandbox.io/embed/react-hook-form-custom-resolver-hnhs5d?fontsize=14&hidenavigation=1&theme=dark"
      style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
      title="React Hook Form - custom resolver"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
- `context: object`
  - `context` 필드를 사용하면 `resolver` 함수의 두번째 파라미터로 전달되거나, `@hookform/resolvers/yup`을 사용한다면 Yup의 context 객체에 주입됩니다.
    <div>
      <iframe src="https://codesandbox.io/embed/react-hook-form-context-crs6cz?fontsize=14&hidenavigation=1&theme=dark"
      style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
      title="React Hook Form - context"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
- `shouldFocusError: boolean = true`
  - `true`가 기본 값으로 `ture`로 설정한 경우, 유효성 검사에 실패한 첫번째 요소가 포커스 됩니다.
  - 이 옵션을 사용하기 위해서는 `register` 함수의 반환 값인 `ref`(`Controller` 컴포넌트의 경우 `render` 함수의 `field.ref` 파라미터)가 요소의 `ref`에 전달 되어야 합니다.
- `shouldUnregister: boolean = false`
  - `false`가 기본으로 요소가 언마운트 되어도 입력 값이 유지됩니다. `true`로 지정할 경우 요소가 언마운트 되면 입력값이 제거됩니다.
    <div>
      <iframe src="https://codesandbox.io/embed/react-hook-form-shouldunregister-8lzyr8?fontsize=14&hidenavigation=1&theme=dark"
      style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
      title="React Hook Form - shouldUnregister"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
- `shouldUseNativeValidation: boolean = false`
  - `false`가 기본 값으로 `true`로 설정한 경우 [브라우저 네이티브 검증](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)이 동작하게 됩니다.
- `criteriaMode: 'firstError' | 'all'`
  - `firstError`가 기본 값으로 첫번째 유효성 에러만 `formState.errors` 객체에 담김니다.
  - `all`로 설정한 경우 모든 유효성 에러가 `formState.errors.types` 객체에 담김니다.
    <div>
      <iframe src="https://codesandbox.io/embed/react-hook-form-criteriamode-all-zz4rgp?fontsize=14&hidenavigation=1&theme=dark"
      style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
      title="React Hook Form - criteriaMode all"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
- `delayError: number`
  - 입력된 ms초 만큼 사용자에게 에러 표시를 지연시킵니다.
  - 유효성 검사가 통과될 경우에는 즉각 적용됩니다.

#### returns
```ts
type UseFormReturn<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined> = {
  watch: UseFormWatch<TFieldValues>;
  getValues: UseFormGetValues<TFieldValues>;
  getFieldState: UseFormGetFieldState<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  clearErrors: UseFormClearErrors<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  trigger: UseFormTrigger<TFieldValues>;
  formState: FormState<TFieldValues>;
  resetField: UseFormResetField<TFieldValues>;
  reset: UseFormReset<TFieldValues>;
  handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues>;
  unregister: UseFormUnregister<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  setFocus: UseFormSetFocus<TFieldValues>;
};
```

`useForm`의 반환 값은 밑에서 하나씩 따로 살펴보도록 하겠습니다.

### `watch`
`watch` 함수는 특정 요소를 감시하여 그 요소의 값을 반환합니다. 해당 요소의 값을 가져와서 사용해야 할 때 유용하게 사용되는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
watch: (names?: string | string[] | (data, options) => void, defaultValue?) => unknown
```

| Example                                 | Return                       | Description                                              |
|-----------------------------------------|------------------------------|----------------------------------------------------------|
| `watch('inputName')`                    | `unknown`                    | 특정 요소의 값을 반환합니다.                                         |
| `watch(['inputName'])`                  | `unknown[]`                  | 배열 안의 요소의 값들을 배열로 반환합니다.                                 |
| `watch()`                               | `{[key: string]: unknown}`   | 모든 요소의 값을 객체로 반환합니다.                                     |
| `watch((data, { name, type }) => void)` | `{ unsubscribe: () => void }` | 모든 요소의 값을 구독하고 값이 업데이트 되면 콜백이 실행됩니다. 구독 해제를 위한 함수 반환합니다. |

`watch` 함수는 두번째 파라미터로 `defaultValue`를 전달할 수 있는데, `defaultValues`로 감시하는 요소의 값이 정의되어 있지 않을 경우 `defaultValue` 값을 반환합니다. `defaultValue` 마저도 정의되어 있지 않다면 초기값으로 `undfined`를 반환합니다. `defaultValues`와 `defaultValue`가 모두 정의되어 있다면 `defaultValue` 값을 반환합니다.

### `getValues`
`getValues`는 폼의 값을 가져오기 위해 사용되는 함수입니다. `watch` 함수와 유사한 기능을 제공하지만 차이점은 `getValues`는 입력을 감시하지 않기 때문에 입력 값이 변경되어도 반환 값이 업데이트 되지 않습니다. 형태는 아래 코드와 같습니다.

```ts
getValues: (payload?: string | string[]) => Object
```

`getValues` 함수는 아래 코드와 같이 사용할 수 있습니다.

<div>
  <iframe src="https://codesandbox.io/embed/react-hook-form-getvalues-2s33zj?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
  title="React Hook Form - getValues"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>

### `getFieldState`
`getFieldState`는 `react-hook-form@7.25.0`에서 추가된 함수로 각각의 폼 요소의 상태를 반환하는 함수입니다. 형태는 아래 코드와 같습니다.

```ts
getFieldState: (name: string, formState?: Object) => ({isDirty, isTouched, invalid, error})
```

`getFieldState`의 반환 값이 반응형으로 동작하지 않는다면 두번째 파라미터에 `useForm`의 반환값인 `formState`를 넘겨주면 반환 값이 반응형으로 동작하게 됩니다. `getFieldState` 함수는 아래 코드와 같이 사용할 수 있습니다.

<div>
<iframe src="https://codesandbox.io/embed/react-hook-form-getfieldstate-2qjmxf?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 10px; overflow:hidden;"
title="React Hook Form - getFieldState"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
</div>

### `setError`

### `clearErrors`

### `setValue`

### `trigger`

### `formState`

### `resetField`

### `reset`

### `handleSubmit`

### `unregister`

### `control`

### `register`

### `setFocus`

## Controller
~~간단한 예제~~

#### props
- name
- control
- defaultValue
- rules
- shouldUnregister

#### returns
- `field.onChange`
- `field.onBlur`
- `field.value`
- `field.name`
- `field.ref`
- `fieldState.invalid`
- `fieldState.isTouched`
- `fieldState.isDirty`
- `fieldState.error`
- `formState`

## useController

## useFormContext
- FormProvider

## useWatch
~~간단한 예제~~

#### props
- name
- control
- defaultValue
- disabled
- exact

#### returns

## useFormState

#### props
- control
- name
- disabled
- exact

#### returns
- `formState`

## ErrorMessage

## useFieldArray
- dynamic input

##### 참고
- [https://www.react-hook-form.com/](https://www.react-hook-form.com/)
