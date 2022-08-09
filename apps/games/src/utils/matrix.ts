export default class MatrixUtil {
  public static multiply(a: number[][], b: number[][]): number[][] {
    return a.map((row) => {
      return row.map((_, i) => {
        return row.reduce((sum, cell, j) => {
          return sum + cell * b[j][i]
        }, 0)
      })
    })
  }
}
