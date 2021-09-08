export default class Box {
  x: number
  y: number
  width: number
  height: number

  constructor(options: { x: number, y: number, width: number, height: number }) {
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
  }

  get horizontals(): number[] {
    return this.edges(this.y, this.height)
  }

  get verticals(): number[] {
    return this.edges(this.x, this.width)
  }

  private edges(start: number, extent: number): number[] {
    return [start, start + (extent / 2), start + extent];
  }
}