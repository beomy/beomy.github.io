<script lang="ts">
  import Router from 'svelte-spa-router'
  import { routes } from '@/routes'
  import Header from '@/components/Header.svelte'
</script>

<div class="warp">
  <div class="header">
    <Header />
  </div>
  <div class="contents">
    <Router {routes} />
  </div>
</div>

<style lang="scss">
  @import './assets/sass/variables.scss';

  @media (min-width: $xl) {
    .header {
      width: $xl;
      margin: auto;
    }
    .contents {
      width: $xl;
      margin: auto;
    }
  }
</style>
