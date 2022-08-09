<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type SudokuCell from '@/model/sudoku/Cell'
  import Number from '@/components/global/Number.svelte'

  export let cell: SudokuCell

  const dispatch = createEventDispatcher()

  function onClickCell() {
    dispatch('click', { cell })
  }
</script>

<div class="cell" on:click={onClickCell}>
  {#if cell.value}
    <div class="value" class:mutable={!cell.isFreeze()}>
      <Number value={cell.value} />
    </div>
  {:else if cell.candidateValues.length > 0}
    <div class="candidate">
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(1)}
      >
        <Number value={1} />
      </div>
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(2)}
      >
        <Number value={2} />
      </div>
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(3)}
      >
        <Number value={3} />
      </div>
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(4)}
      >
        <Number value={4} />
      </div>
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(5)}
      >
        <Number value={5} />
      </div>
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(6)}
      >
        <Number value={6} />
      </div>
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(7)}
      >
        <Number value={7} />
      </div>
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(8)}
      >
        <Number value={8} />
      </div>
      <div
        class="candidate-item"
        class:active={cell.candidateValues.includes(9)}
      >
        <Number value={9} />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .cell {
    position: relative;
    width: 100%;
    height: 100%;
    .value {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-weight: 100;
      color: #666;
      text-align: center;
      font-weight: 700;
      color: #000;
      cursor: default;
    }
    .candidate {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 0;
      line-height: 0;
      .candidate-item {
        position: relative;
        width: 33.3333%;
        height: 33.3333%;
        display: inline-block;
        font-size: 10px;
        line-height: 20px;
        color: #aaa;
        visibility: hidden;
        &.active {
          visibility: visible;
        }
      }
    }
  }
</style>
