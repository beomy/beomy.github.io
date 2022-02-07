---
layout: post
title: '[Svelte] Context API'
featured-img: svelte/svelte.png
height-img: 200px
category: [tech, svelte]
summary: Context API는 컴포넌트의 데이터와 함수를 props 외의 방법으로 전달하는 기능을 제공합니다.
---

Context API는 컴포넌트의 데이터와 함수를 props 외의 방법으로 전달하는 기능을 제공합니다.

# Mapbox GL 예제
[Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/overview/)을 사용한 예제로 Context API를 살펴보도록 하겠습니다.

## `App.svelte`
```html
<!-- App.svelte -->
<script>
  import Map from './Map.svelte';
  import MapMarker from './MapMarker.svelte';
</script>

<Map lat={35} lon={-84} zoom={3.5}>
  <MapMarker lat={37.8225} lon={-122.0024} label="Svelte Body Shaping"/>
  <MapMarker lat={33.8981} lon={-118.4169} label="Svelte Barbershop & Essentials"/>
  <MapMarker lat={29.7230} lon={-95.4189} label="Svelte Waxing Studio"/>
  <MapMarker lat={28.3378} lon={-81.3966} label="Svelte 30 Nutritional Consultants"/>
  <MapMarker lat={40.6483} lon={-74.0237} label="Svelte Brands LLC"/>
  <MapMarker lat={40.6986} lon={-74.4100} label="Svelte Medical Systems"/>
</Map>
```

- `Map` 컴포넌트는 `MapMarker` 컴포넌트를 자식 요소로 가집니다.
- `Map` 컴포넌트는 `lat`, `lon`, `zoom`을 props로 전달받습니다.
- `MapMarker` 컴포넌트는 `lat`, `lon`, `label`을 props로 전달받습니다.

## `Map.svelte`
```html
<!-- Map.svelte -->
<script>
  import { onMount, setContext } from 'svelte';
  import { mapbox, key } from './mapbox.js';

  setContext(key, {
    getMap: () => map
  });

  export let lat;
  export let lon;
  export let zoom;

  let container;
  let map;

  onMount(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/mapbox-gl/dist/mapbox-gl.css';

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [lon, lat],
        zoom
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
  {#if map}
    <slot></slot>
  {/if}
</div>
```

- `MapMarker` 컴포넌트를 자식 요소로 가지기 위해 `slot`을 사용합니다.
- `lat`, `lon`, `zoom`을 props로 가집니다.
- 마운트 되면 mapbox를 가져옵니다.
- `import { setContext } from 'svelte'`로 `setContext`를 가져오고 `import { key } from './mapbox.js'`로 `key`를 가져옵니다. 여기서 가져온 `setContext`와 `key`는 공유하는 데이터를 생성하는데 사용됩니다.

`setContext`로 공유하는 데이터를 Context라고 합니다. Context는 라이프 사이클 메서드는 물론 어떤 값이든 가능합니다.

`setContext`와 `getContext`는 컴포넌트가 초기화될 때 호출되어야 합니다. 컴포넌트가 초기화될 때의 `map` 변수는 아직 정의되어 있지 않은 상태입니다. `map` 변수는 컴포넌트가 마운트 된 후 정의되기 때문에, `setContext`로 만들어진 Context는 `map` 변수가 아닌 `map` 변수를 리턴하는 함수여야 다른 컴포넌트에서 `map` 변수를 가져올 수 있게 됩니다.

## `MapMarker.svelte`
```html
<!-- MapMarker.svelte -->
<script>
  import { getContext } from 'svelte';
  import { mapbox, key } from './mapbox.js';

  const { getMap } = getContext(key);
  const map = getMap();

  export let lat;
  export let lon;
  export let label;

  const popup = new mapbox.Popup({ offset: 25 })
    .setText(label);

  const marker = new mapbox.Marker()
    .setLngLat([lon, lat])
    .setPopup(popup)
    .addTo(map);
</script>
```

- `lat`, `lon`, `zoom`을 props로 가집니다.
- `getContext`를 사용하여 공유하는 데이터를 가져옵니다.
- `getMap` 함수로 `map` 객체를 가져옵니다. `map` 객체는 `Map` 컴포넌트에서 `setContext`를 사용하여 공유한 객체입니다.
- `mapbox.Popup`와 `mapbox.Marker`를 사용하여 지도에 마크를 표시합니다.

`setContext`로 Context를 만들 때 사용한 `key`을 사용하여 Context를 가져올 수 있습니다. `mapbox.js`의 `key`를 사용하여 `setContext`로 만든 Context를 `getContext`를 사용하여 가져옵니다.

## `mapbox.js`
```js
// mapbox.js
import mapbox from 'mapbox-gl';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = MAPBOX_ACCESS_TOKEN;

const key = {};

export { mapbox, key };
```

- `mapbox`와 `key`를 내보내는 파일입니다.
- `mapbox`를 통해 `map`를 생성하고, 지도를 관리합니다.
- `key`를 통해 생성한 `map` 객체를 공유합니다.

`setContext`, `getContext`에 사용되는 `key`는 어떤 값이든 사용할 수 있습니다. `'x' === 'x'`이지만 `{} !== {}` 이기 때문에 유니크한 `key`를 만들기 위해 예제에서 `key`로 빈 객체를 사용하였습니다.

`key`를 문자열을 사용하면 다른 Context와 충돌할 가능성이 있지만, 객체를 사용하여 다른 Context와 충돌을 피할 수 있습니다.

# Context VS Store
Context와 Store은 비슷합니다. Store는 애플리케이션의 어느 위치에서나 사용할 수 있지만 Context는 해당 컴포넌트와 하위 컴포넌트에서만 사용할 수 있다는 차이가 있습니다.

이러한 특징은 하나의 컴포넌트로 여러 인스턴스를 생성하게 될 때 각각의 인스턴스가 하나의 상태를 공유하지 않고 각각의 상태를 가질 수 있는 장점이 있습니다.

Context는 반응형으로 동작하지 않기 때문에 변경되어 반응형으로 동작해야 할 경우 Store을 사용해야 합니다.

#### 참고
- [https://svelte.dev/tutorial/context-api](https://svelte.dev/tutorial/context-api)
