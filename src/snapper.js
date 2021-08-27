export default class Snapper {
  constructor({ horizontals, verticals, threshold = 16 }) {
    this.horizontals = horizontals;
    this.verticals = verticals;
    this.threshold = threshold;
  }

  snap(box) {
    return {
      x: this._snaps(this.verticals, box.verticals, box.width) || null,
      y: this._snaps(this.horizontals, box.horizontals, box.height) || null
    };
  }

  _snaps(edges, boxEdges, extent) {
    let [start, middle, end] = boxEdges;

    return (
      this._snapsFor(edges, start, 0) ||
      this._snapsFor(edges, middle, extent / 2) ||
      this._snapsFor(edges, end, extent)
    );
  }

  _snapsFor(edges, position, difference) {
    for (const edge of edges) {
      if (edge - this.threshold < position && edge + this.threshold > position) {
        return edge - difference;
      }
    }
    
    return null;
  }
}