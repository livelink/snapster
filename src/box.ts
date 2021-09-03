export interface BoxInterface {
  x: number
  y: number
  width: number
  height: number
  readonly horizontals: number[]
  readonly verticals: number[]
}
export default class Box {
  x: number
  y: number
  width: number
  height: number

  constructor(options: BoxInterface) {
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
  }

  get horizontals() {
    return this.edges(this.y, this.height)
  }

  get verticals() {
    return this.edges(this.x, this.width)
  }

  private edges(start: number, extent: number): number[] {
    return [start, start + (extent / 2), start + extent];
  }
}