import Point from '@/model/Point'

export default class SudokuCell {
  value: number

  candidateValues: number[] = []

  point: Point

  private freeze = true

  constructor(value, point) {
    this.value = value
    this.point = point
  }

  toggleCandidate(value: number) {
    if (this.freeze) {
      return
    }
    const index = this.candidateValues.indexOf(value)
    if (index >= 0) {
      this.candidateValues.splice(index, 1)
    } else {
      this.candidateValues.push(value)
      this.candidateValues.sort((a, b) => a - b)
    }
  }

  setCandidateValues(value: number[]) {
    if (this.freeze) {
      return
    }
    this.candidateValues = value
  }

  removeCandidateValue(value: number) {
    const index = this.candidateValues.indexOf(value)
    if (index >= 0) {
      this.candidateValues.splice(index, 1)
    }
  }

  setFreeze(value: boolean) {
    this.freeze = value
  }

  setValue(value: number) {
    if (this.freeze) {
      return
    }
    this.value = value
  }

  isFreeze(): boolean {
    return this.freeze
  }

  static toSudokuCell(obj): SudokuCell {
    const cell = new SudokuCell(obj.value, new Point(obj.point.x, obj.point.y))
    cell.setFreeze(obj.freeze)
    cell.setCandidateValues(obj.candidateValues)
    return cell
  }
}
