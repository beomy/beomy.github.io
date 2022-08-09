<script lang="ts">
  import _ from 'lodash-es'
  import Point from '@/model/Point'
  import SudokuCell from '@/model/sudoku/Cell'
  import {
    ArrayUtil,
    MatrixUtil,
    NumberUtil,
    LocalStorageUtil,
    ObjectUtil,
  } from '@/utils'
  import Cell from '@/components/sudoku/Cell.svelte'
  import NumberPad from '@/components/sudoku/NumberPad.svelte'
  import GameNavigation from '@/components/GameNavigation.svelte'
  import Timer from '@/components/global/Timer.svelte'
  import { remaindHintCount } from '@/stores/navHint'
  import { noteFlag } from '@/stores/navNote'
  import { mode, spandTime, timeString } from '@/stores/timer'

  interface IQuzyDetail {
    quiz: SudokuCell[][]
    emptyPoints: Point[]
    invalidPoints: Point[]
  }

  enum Difficulty {
    EASY = 43,
    NORMAL = 50,
    HARD = 55,
  }

  const isProd = import.meta.env.PROD
  const difficultyList: { id: number; value: string }[] =
    ObjectUtil.enumToArray(Difficulty)
  const blinkSudokuCell = sudokuToCell([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])
  let selectedDifficulty: Difficulty =
    LocalStorageUtil.getStorage('sudoku.difficulty') || Difficulty.EASY
  let sudokuSolution: SudokuCell[][] = blinkSudokuCell
  let sudokuQuiz: SudokuCell[][] = blinkSudokuCell
  let viewSudoku: SudokuCell[][] = blinkSudokuCell
  let currentCell: SudokuCell | null = null
  let currentFocusPoints: Point[] = []
  let confictPoints: Point[] = []
  let history = []
  let isMaking = false
  let isComplate = false

  $: viewSudoku = $mode === 'play' ? sudokuQuiz : blinkSudokuCell
  $: currentFocusPoints = currentCell
    ? _.flatten(getFocusPointsList((currentCell as SudokuCell).point))
    : []
  $: confictPoints = sudokuQuiz.reduce((acc: Point[], rows: SudokuCell[]) => {
    const conflicts = rows.reduce((a: Point[], item: SudokuCell) => {
      const focusCellsList: SudokuCell[][] = getFocusCellsList(item.point)
      for (const cells of focusCellsList) {
        const conficts: SudokuCell[] = cells.filter(
          (x) =>
            x.value !== 0 &&
            cells.filter((y) => y.value === x.value).length > 1,
        )
        a = a.concat(conficts.map((x) => x.point))
      }
      return a
    }, [])
    return acc.concat(conflicts)
  }, [])
  $: LocalStorageUtil.setStorage('sudoku.results', history)
  $: LocalStorageUtil.setStorage('sudoku.remaindHintCount', $remaindHintCount)
  $: LocalStorageUtil.setStorage('sudoku.solution', sudokuSolution)
  $: LocalStorageUtil.setStorage('sudoku.timer', $spandTime)
  $: isComplate = _.isEqual(
    cellToSudoku(sudokuSolution),
    cellToSudoku(sudokuQuiz),
  )
  $: if (isComplate) {
    $mode = 'pause'
  }
  $: if (
    selectedDifficulty !== LocalStorageUtil.getStorage('sudoku.difficulty')
  ) {
    LocalStorageUtil.setStorage('sudoku.difficulty', selectedDifficulty)
    onNewGame()
  }

  ;(function () {
    history = LocalStorageUtil.getStorage('sudoku.results')
    if (ObjectUtil.isEmpty(history)) {
      isMaking = true
      $mode = 'pause'
      setTimeout(() => init())
    } else {
      const solution: SudokuCell[][] =
        LocalStorageUtil.getStorage('sudoku.solution')
      const quize: SudokuCell[][] = _.cloneDeep(history[history.length - 1])
      sudokuSolution = solution.map((x) =>
        x.map((y) => SudokuCell.toSudokuCell(y)),
      )
      sudokuQuiz = quize.map((x) => x.map((y) => SudokuCell.toSudokuCell(y)))
      $remaindHintCount = LocalStorageUtil.getStorage('sudoku.remaindHintCount')
      $spandTime = LocalStorageUtil.getStorage('sudoku.timer')
      $mode = 'play'
    }
  })()

  function init(): void {
    const sudokuRef = makeSudoku()
    const { quiz, emptyPoints }: IQuzyDetail = makeSudokuQuiz(sudokuRef)
    if (!isVaildDifficulty(emptyPoints)) {
      setTimeout(() => init())
    } else {
      sudokuSolution = sudokuToCell(sudokuRef)
      sudokuQuiz = quiz
      $remaindHintCount = 3
      $spandTime = 0
      $mode = 'play'
      currentCell = null
      history = [_.cloneDeep(sudokuQuiz)]
      isMaking = false
    }
  }

  function makeSudoku(): number[][] {
    const x1: number[][] = [
      [0, 0, 1],
      [1, 0, 0],
      [0, 1, 0],
    ]
    const x2: number[][] = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
    ]
    const s: number[][] = ArrayUtil.toMatrix(
      ArrayUtil.mix([1, 2, 3, 4, 5, 6, 7, 8, 9]),
      3,
    )
    const x1s: number[][] = MatrixUtil.multiply(x1, s)
    const x2s: number[][] = MatrixUtil.multiply(x2, s)
    const sx1: number[][] = MatrixUtil.multiply(s, x1)
    const x2sx1: number[][] = MatrixUtil.multiply(x2s, x1)
    const x1sx1: number[][] = MatrixUtil.multiply(x1s, x1)
    const sx2: number[][] = MatrixUtil.multiply(s, x2)
    const x1sx2: number[][] = MatrixUtil.multiply(x1s, x2)
    const x2sx2: number[][] = MatrixUtil.multiply(x2s, x2)

    return [
      s[0].concat(x1s[0]).concat(x2s[0]),
      s[1].concat(x1s[1]).concat(x2s[1]),
      s[2].concat(x1s[2]).concat(x2s[2]),
      sx1[0].concat(x1sx1[0]).concat(x2sx1[0]),
      sx1[1].concat(x1sx1[1]).concat(x2sx1[1]),
      sx1[2].concat(x1sx1[2]).concat(x2sx1[2]),
      sx2[0].concat(x1sx2[0]).concat(x2sx2[0]),
      sx2[1].concat(x1sx2[1]).concat(x2sx2[1]),
      sx2[2].concat(x1sx2[2]).concat(x2sx2[2]),
    ]
  }

  function sudokuToCell(sudoku: number[][]): SudokuCell[][] {
    const cells: SudokuCell[][] = []
    for (let y = 0; y < sudoku.length; y++) {
      const rows: SudokuCell[] = []
      for (let x = 0; x < sudoku[y].length; x++) {
        rows.push(new SudokuCell(sudoku[y][x], new Point(x, y)))
      }
      cells.push(rows)
    }
    return cells
  }

  function cellToSudoku(cells: SudokuCell[][]): number[][] {
    return cells.map((x) => x.map((y) => y.value))
  }

  function isVaildDifficulty(emptyPoints: Point[]) {
    const length: number = emptyPoints.length
    if (selectedDifficulty === Difficulty.EASY) {
      return length >= Difficulty.EASY && length < Difficulty.NORMAL
    } else if (selectedDifficulty === Difficulty.NORMAL) {
      return length >= Difficulty.NORMAL && length < Difficulty.HARD
    } else {
      return length >= Difficulty.HARD
    }
  }

  function makeSudokuQuiz(sudoku: number[][]): IQuzyDetail {
    const quiz: SudokuCell[][] = sudokuToCell(sudoku)
    const emptyPoints: Point[] = []
    const invalidPoints: Point[] = []
    while (!isVaildDifficulty(emptyPoints)) {
      const emptyNumbers = emptyPoints.map((x) => x.toNumber(9))
      const invalidNumbers = invalidPoints.map((x) => x.toNumber(9))
      const rand: number | null = NumberUtil.uniqueRandom(0, 80, [
        ...emptyNumbers,
        ...invalidNumbers,
      ])
      if (rand === null) {
        break
      }
      const point: Point = Point.toPoint(rand, 9)
      const ori = quiz[point.y][point.x].value
      quiz[point.y][point.x].value = 0
      const result = solve(_.cloneDeep(quiz), [point, ...emptyPoints])
      if (!result) {
        quiz[point.y][point.x].value = ori
        invalidPoints.push(point)
      } else {
        quiz[point.y][point.x].setFreeze(false)
        emptyPoints.push(point)
      }
    }
    return {
      quiz,
      emptyPoints,
      invalidPoints,
    }
  }

  function setCandinateValues(
    quiz: SudokuCell[][],
    emptyPoints: Point[],
  ): boolean {
    let result = true
    for (const emptyPoint of emptyPoints) {
      const emptyCell = quiz[emptyPoint.y][emptyPoint.x]
      const candidateList: number[][] = []
      const focusCellsList: SudokuCell[][] = getFocusCellsList(emptyPoint, quiz)
      for (const cells of focusCellsList) {
        candidateList.push(getCandidateValues(cells))
      }
      const candidateValues = _.intersection(...candidateList)
      if (candidateValues.length === 1) {
        setSudokuNumber(emptyCell.point, candidateValues[0], quiz)
        return setCandinateValues(
          quiz,
          emptyPoints.filter((x) => !x.isEqual(emptyPoint)),
        )
      } else if (candidateValues.length > 1) {
        emptyCell.candidateValues = candidateValues
        result = false
      } else {
        result = result && true
      }
    }
    return result
  }

  function diffCandinateValues(
    quiz: SudokuCell[][],
    emptyPoints: Point[],
  ): boolean {
    let result = true
    for (const emptyPoint of emptyPoints) {
      const emptyCell = quiz[emptyPoint.y][emptyPoint.x]
      const focusCellsList: SudokuCell[][] = getFocusCellsList(emptyPoint, quiz)
      for (const cells of focusCellsList) {
        const candidateGroup = cells.reduce(
          (acc: number[], cur: SudokuCell) => {
            if (!emptyPoint.isEqual(cur.point)) {
              acc = acc.concat(cur.candidateValues)
            }
            return acc
          },
          [],
        )
        const tempCandidateValues = _.without(
          emptyCell.candidateValues,
          ...candidateGroup,
        )
        if (tempCandidateValues.length === 1) {
          setSudokuNumber(emptyCell.point, tempCandidateValues[0], quiz)
          return diffCandinateValues(
            quiz,
            emptyPoints.filter((x) => !x.isEqual(emptyPoint)),
          )
        } else {
          result = false
        }
      }
    }
    return result
  }

  function solve(quiz: SudokuCell[][], emptyPoints: Point[]): boolean {
    let result = setCandinateValues(quiz, emptyPoints)
    if (!result) {
      result = diffCandinateValues(
        quiz,
        emptyPoints.reduce((acc: Point[], cur: Point) => {
          if (!quiz[cur.y][cur.x].value) {
            acc.push(cur)
          }
          return acc
        }, []),
      )
    }
    return result
  }

  function getCandidateValues(cells: SudokuCell[]): number[] {
    const ref = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const values = cells.map((x) => x.value)
    return _.difference(ref, values)
  }

  function getFocusPointsList(point: Point): Point[][] {
    const startX = Math.floor(point.x / 3) * 3
    const endX = (Math.floor(point.x / 3) + 1) * 3 - 1
    const startY = Math.floor(point.y / 3) * 3
    const endY = (Math.floor(point.y / 3) + 1) * 3 - 1
    const squire: Point[] = []
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        squire.push(new Point(i, j))
      }
    }

    const row: Point[] = []
    for (let i = 0; i < 9; i++) {
      row.push(new Point(i, point.y))
    }

    const col: Point[] = []
    for (let j = 0; j < 9; j++) {
      col.push(new Point(point.x, j))
    }

    return [squire, row, col]
  }

  function getFocusCellsList(
    point: Point,
    sudoku: SudokuCell[][] = sudokuQuiz,
  ): SudokuCell[][] {
    const startX = Math.floor(point.x / 3) * 3
    const endX = (Math.floor(point.x / 3) + 1) * 3 - 1
    const startY = Math.floor(point.y / 3) * 3
    const endY = (Math.floor(point.y / 3) + 1) * 3 - 1
    const squire: SudokuCell[] = []
    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        squire.push(sudoku[y][x])
      }
    }

    const row: SudokuCell[] = []
    for (let j = 0; j < 9; j++) {
      row.push(sudoku[point.y][j])
    }

    const col: SudokuCell[] = []
    for (let i = 0; i < 9; i++) {
      col.push(sudoku[i][point.x])
    }

    return [squire, row, col]
  }

  function getDifficultyName(str): string {
    if (str === 'EASY') {
      return '쉬움'
    } else if (str === 'NORMAL') {
      return '보통'
    } else if (str === 'HARD') {
      return '어려움'
    } else {
      return ''
    }
  }

  function setSudokuNumber(
    point: Point,
    num: number,
    quiz: SudokuCell[][] = sudokuQuiz,
  ) {
    const cell = quiz[point.y][point.x]
    cell.setValue(num)
    cell.setCandidateValues([])
    for (const focusCell of _.flatten(getFocusCellsList(point, quiz))) {
      focusCell.removeCandidateValue(num)
    }
  }

  function onClickCell(event: CustomEvent) {
    currentCell = event.detail.cell
  }

  function onNoteFlag() {
    if ($mode === 'pause') {
      $mode = 'play'
      return
    }
    $noteFlag = !$noteFlag
  }

  function onClickPadNumber({ detail }) {
    if ($mode === 'pause') {
      $mode = 'play'
      return
    }
    if (!currentCell || currentCell.isFreeze()) {
      return
    }
    const num: number = detail.number
    if ($noteFlag) {
      currentCell.toggleCandidate(num)
    } else {
      setSudokuNumber(currentCell.point, num)
    }
    sudokuQuiz = sudokuQuiz
    history = [...history, _.cloneDeep(sudokuQuiz)]
  }

  function onRemove() {
    if ($mode === 'pause') {
      $mode = 'play'
      return
    }
    if (!currentCell) {
      return
    }
    currentCell.setValue(0)
    currentCell.setCandidateValues([])
    sudokuQuiz = sudokuQuiz
    history = [...history, _.cloneDeep(sudokuQuiz)]
  }

  function onHint() {
    if ($mode === 'pause') {
      $mode = 'play'
      return
    }
    if (!currentCell) {
      return
    }
    const point: Point = currentCell.point
    currentCell.setValue(sudokuSolution[point.y][point.x].value)
    if (!currentCell.isFreeze()) {
      $remaindHintCount -= 1
    }
    sudokuQuiz = sudokuQuiz
    history = [...history, _.cloneDeep(sudokuQuiz)]
  }

  function onNewGame() {
    isMaking = true
    $mode = 'pause'
    setTimeout(() => init())
  }

  function onUndo() {
    if ($mode === 'pause') {
      $mode = 'play'
      return
    }
    if (history.length > 1) {
      history.pop()
      history = history
      const quiz: SudokuCell[][] = _.cloneDeep(history[history.length - 1])
      sudokuQuiz = quiz.map((x) => x.map((y) => SudokuCell.toSudokuCell(y)))
    }
  }

  function testSetCandinateValues() {
    setCandinateValues(
      sudokuQuiz,
      _.flatten(sudokuQuiz)
        .filter((x) => !x.value)
        .map((x) => x.point),
    )
    sudokuQuiz = sudokuQuiz
  }
  function testDiffCandinateValues() {
    diffCandinateValues(
      sudokuQuiz,
      _.flatten(sudokuQuiz)
        .filter((x) => !x.value)
        .map((x) => x.point),
    )
    sudokuQuiz = sudokuQuiz
  }
</script>

{#if !isProd}
  <button on:click={testSetCandinateValues}>setCandinateValues</button>
  <button on:click={testDiffCandinateValues}>diffCandinateValues</button>
{/if}

<div class="game-info-wrapper">
  <div class="difficulty-wrapper">
    <select bind:value={selectedDifficulty}>
      {#each difficultyList as difficulty (difficulty.id)}
        <option value={difficulty.id}
          >{getDifficultyName(difficulty.value)}</option
        >
      {/each}
    </select>
  </div>
  <div class="timer-wrapper">
    <Timer />
  </div>
</div>
<div class="game-wrapper">
  {#if isMaking}
    <div
      class="game-dim"
      style="background-color: rgba(255, 255, 255, 0.8); font-size: 25px;"
    >
      새로운 게임을 생성중입니다.
    </div>
  {:else if isComplate}
    <div
      class="game-dim"
      style="background-color: rgba(255, 255, 255, 0.8);font-size: 25px;"
    >
      <div style="display: inline-block; line-height: 40px;">
        훌륭합니다.<br />
        <span style="font-size: 18px; font-weight: 600; color: #94a3b7;"
          >{$timeString}</span
        >
      </div>
    </div>
  {:else if $mode === 'pause'}
    <div class="game-dim">
      <div class="icon" on:click={() => ($mode = 'play')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          id="icon-play-big"
          ><g fill="none" fill-rule="evenodd"
            ><circle cx="30" cy="30" r="30" fill="#4A90E2" /><path
              fill="#FFF"
              d="M39.123 31.978L26.56 40.615a2.4 2.4 0 0 1-3.76-1.977V21.362a2.4 2.4 0 0 1 3.76-1.977l12.563 8.637a2.4 2.4 0 0 1 0 3.956z"
            /></g
          ></svg
        >
      </div>
    </div>
  {/if}
  <div class="game">
    <table class="game-table">
      <tbody>
        {#each viewSudoku as rows, i (i)}
          <tr class="game-row">
            {#each rows as item, j (j)}
              <td
                class:selected={currentCell
                  ? item.point.isEqual(currentCell.point)
                  : false}
                class:highlight-table={currentFocusPoints.find((x) =>
                  x.isEqual(new Point(j, i)),
                )}
                class:highlight-number={item.value !== 0 &&
                  currentCell &&
                  item.value === currentCell.value}
                class:confict={confictPoints.find((x) =>
                  x.isEqual(new Point(j, i)),
                )}
              >
                <Cell cell={item} on:click={onClickCell} />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<div class="game-controls-wrapper">
  <GameNavigation
    list={['undo', 'remove', 'note', 'hint', 'new']}
    on:newGame={onNewGame}
    on:note={onNoteFlag}
    on:remove={onRemove}
    on:hint={onHint}
    on:undo={onUndo}
  />
  <NumberPad on:click={onClickPadNumber} />
</div>

<!--<div class="solution" style="display: inline-block; margin-left: 10px;">
  {#each sudokuSolution as rows, i (i)}
    <div>
      {#each rows as item, j (j)}
        <span class:empty={item.value === 0}>{ item.value }</span>
      {/each}
    </div>
  {/each}
</div>-->

<!--<div class="solution" style="display: inline-block; margin-left: 10px;">
  {#each sudokuQuiz as rows, i (i)}
    <div>
      {#each rows as item, j (j)}
        <span class:empty={item.value === 0}>{ item.value }</span>
      {/each}
    </div>
  {/each}
</div>-->
<style lang="scss">
  .game-info-wrapper {
    margin-bottom: 5px;
    max-width: 600px;
    min-width: 300px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    .difficulty-wrapper {
      float: left;
      select {
        width: 100px;
        font-weight: 600;
        color: #94a3b7;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
        appearance: none;
        padding: 3px 10px;
        border-radius: 5px;
        background-position-x: calc(100% - 10px);
        background-position-y: 10px;
      }
    }
    .timer-wrapper {
      float: right;
    }
  }
  .game-controls-wrapper {
    max-width: 600px;
    min-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  .game-wrapper {
    position: relative;
    margin-bottom: 10px;
    max-width: 600px;
    min-width: 300px;
    margin-left: auto;
    margin-right: auto;
    .game-dim {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      z-index: 1;
      &:before {
        content: '';
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
      .icon {
        vertical-align: middle;
        display: inline-block;
        cursor: pointer;
      }
    }
    &:after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
    tbody {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
      td {
        flex-basis: 11.1111%;
        box-sizing: border-box;
        position: relative;
        border-right: 1px solid #bec6d4;
        border-bottom: 1px solid #bec6d4;
        cursor: pointer;
        transform: translateZ(0);
        &.highlight-table {
          background-color: #e2e7ed;
        }
        &.highlight-number {
          background-color: #cbdbed;
        }
        &.confict {
          background-color: #f7cfd6;
        }
        &.selected {
          background-color: #bbdefb;
        }
      }
      &:after {
        box-sizing: border-box;
        width: 100%;
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: 33.3333%;
        height: 33.4%;
        border-top: 2px solid #344861;
        border-bottom: 2px solid #344861;
        pointer-events: none;
      }
    }
    .game-row {
      display: flex;
      height: 11.1111%;
    }
    .game {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .game-table {
      display: block;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      border: 2px solid #344861;
      padding: 0;
      margin: 0;
      &:after {
        content: '';
        position: absolute;
        left: 33.3333%;
        width: 33.3333%;
        top: 0;
        border-left: 2px solid #344861;
        border-right: 2px solid #344861;
        pointer-events: none;
        display: block;
        box-sizing: border-box;
        height: 100%;
      }
    }
  }
</style>
