export default class Snapper {
  constructor({ horizontals, verticals, threshold = 16 }) {
    this.horizontals = horizontals;
    this.verticals = verticals;
    this.threshold = threshold;
  }

  snap(box) {
    return {
      x: this._snapEdges(this.verticals, box.verticals, box.width) || null,
      y: this._snapEdges(this.horizontals, box.horizontals, box.height) || null
    };
  }

  _snapEdges(edges, boxEdges, extent) {
    let [start, middle, end] = boxEdges;

    return (
      this._snapEdge(edges, start, 0) ||
      this._snapEdge(edges, middle, extent / 2) ||
      this._snapEdge(edges, end, extent)
    );
  }

  _snapEdge(edges, position, difference) {
    for (const edge of edges) {
      if (edge - this.threshold < position && edge + this.threshold > position) {
        return edge - difference;
      }
    }
    
    return null;
  }
}