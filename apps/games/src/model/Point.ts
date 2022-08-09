export default class Point {
  x: number

  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  isEqual(point: Point): boolean {
    return point.x === this.x && point.y === this.y
  }

  toNumber(width: number): number {
    return this.y * width + this.x
  }

  static toPoint(num: number, width: number): Point {
    const x = num % width
    const y = Math.floor(num / width)
    return new Point(x, y)
  }
}
