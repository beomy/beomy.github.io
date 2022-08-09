import type Point from '@/model/Point'

export default class Tile {
  id: string

  number: number

  point: Point

  isDelete = false

  isMerged = false

  constructor(prefix: string | null, number: number, point: Point) {
    this.id = prefix ? `${prefix}${Date.now()}` : Date.now().toString()
    this.number = number
    this.point = point
  }
}
