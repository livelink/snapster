export default class Box {
  constructor({ x, y, width, height }) {
    this.x = x,
    this.y = y,
    this.width = width,
    this.height = height
  }

  get horizontals() {
    return this._edges(this.y, this.height);     
  }

  get verticals() {
    return this._edges(this.x, this.width);     
  }

  _edges(start, extent) {
    return [start, start + (extent / 2), start + extent];
  }
}