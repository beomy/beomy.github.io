---
layout: post
title: '[Svelte] Context API'
featured-img: svelte/svelte-log.svg
height-img: 200px
category: [tech, svelte]
summary: Context API는 컴포넌트의 데이터와 함수를 props 외의 방법으로 전달하는 기능을 제공합니다.
---
{% include toc.html %}

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

- `Map` 컴포넌트는 `MapMarker` 컴포넌트를 자식요소로 가집니다.
- `Map` 컴포넌트는 `lat`, `lon`, `zoom`을 props로 전달 받습니다. 
- `MapMarker` 컴포넌트는 `lat`, `lon`, `label`을 props로 전달 받습니다.

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
- 

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

## `mapbox.js`
```js
// mapbox.js
import mapbox from 'mapbox-gl';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = MAPBOX_ACCESS_TOKEN;

const key = {};

export { mapbox, key };
```

# Contexts VS Store

#### 참고
- [https://svelte.dev/tutorial/context-api](https://svelte.dev/tutorial/context-api)
