export interface BoxInterface {
  x: number
  y: number
  width: number
  height: number
  readonly horizontals: number[]
  readonly verticals: number[]
}

export default class Box implements BoxInterface {
  x: number
  y: number
  width: number
  height: number
  readonly horizontals: number[]
  readonly verticals: number[]

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.horizontals = this._edges(y, height)
    this.verticals = this._edges(x, width)
  }

  private _edges(start: number, extent: number): number[] {
    return [start, start + (extent / 2), start + extent];
  }
}