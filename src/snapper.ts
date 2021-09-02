// @ts-nocheck

interface SnapperInterface {}

export default class Snapper {
  constructor({ horizontals, verticals, threshold = 16 }) {
    this.horizontals = horizontals;
    this.verticals = verticals;
    this.threshold = threshold;
  }

  snap(box) {
    return {
      x: this._find(this.verticals, box.verticals, box.width) || null,
      y: this._find(this.horizontals, box.horizontals, box.height) || null
    };
  }

  _find(edges, boxEdges, extent) {
    let [start, middle, end] = boxEdges;

    return (
      this._move(edges, start, 0) ||
      this._move(edges, middle, extent / 2) ||
      this._move(edges, end, extent)
    );
  }

  _move(edges, position, difference) {
    for (const edge of edges) {
      if (edge - this.threshold < position && edge + this.threshold > position) {
        return edge - difference;
      }
    }

    return null;
  }
}