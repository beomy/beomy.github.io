import _ from 'lodash-es'

export default class NumberUtil {
  public static uniqueRandom(
    min: number,
    max: number,
    refs: number[] = [],
  ): number | null {
    const numbers: number[] = []
    for (let i = min; i <= max; i++) {
      if (!refs.includes(i)) {
        numbers.push(i)
      }
    }
    return numbers.length === 0
      ? null
      : numbers[_.random(0, numbers.length - 1)]
  }

  public static ratioRandom(values: number[], ratios: number[]): number {
    const list: number[] = []
    for (let i = 0; i < ratios.length; i++) {
      const ratio = ratios[i]
      const value = values[i]
      for (let j = 0; j < ratio; j++) {
        list.push(value)
      }
    }
    return list[_.random(0, list.length - 1)]
  }
}
