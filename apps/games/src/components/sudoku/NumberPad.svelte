<script lang="ts">
  import Number from '@/components/global/Number.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function onClickPad(number: number) {
    dispatch('click', {
      number,
    })
  }
</script>

<div class="number-pad">
  <div class="pad-item" on:click={() => onClickPad(1)}>
    <Number value={1} />
  </div>
  <div class="pad-item" on:click={() => onClickPad(2)}>
    <Number value={2} />
  </div>
  <div class="pad-item" on:click={() => onClickPad(3)}>
    <Number value={3} />
  </div>
  <div class="pad-item" on:click={() => onClickPad(4)}>
    <Number value={4} />
  </div>
  <div class="pad-item" on:click={() => onClickPad(5)}>
    <Number value={5} />
  </div>
  <div class="pad-item" on:click={() => onClickPad(6)}>
    <Number value={6} />
  </div>
  <div class="pad-item" on:click={() => onClickPad(7)}>
    <Number value={7} />
  </div>
  <div class="pad-item" on:click={() => onClickPad(8)}>
    <Number value={8} />
  </div>
  <div class="pad-item" on:click={() => onClickPad(9)}>
    <Number value={9} />
  </div>
</div>

<style lang="scss">
  .number-pad {
    overflow: hidden;
    margin-top: 10px;
    .pad-item {
      float: left;
      width: 11.1111%;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
