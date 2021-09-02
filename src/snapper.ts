import { BoxInterface } from './box';

interface SnapperInterface {
  horizontals: number[]
  verticals: number[]
  threshold: number
}

type Snap = {
  x: number | null,
  y: number | null
}

export default class Snapper implements SnapperInterface {
  horizontals: number[]
  verticals: number[]
  threshold: number

  constructor(horizontals: number[], verticals: number[], threshold: number = 16) {
    this.horizontals = horizontals;
    this.verticals = verticals;
    this.threshold = threshold;
  }

  snap(box: BoxInterface): Snap {
    return {
      x: this._find(this.verticals, box.verticals, box.width) || null,
      y: this._find(this.horizontals, box.horizontals, box.height) || null
    };
  }

  _find(edges: number[], boxEdges: number[], extent: number): number | null {
    let [start, middle, end] = boxEdges;

    return (
      this._move(edges, start, 0) ||
      this._move(edges, middle, extent / 2) ||
      this._move(edges, end, extent)
    );
  }

  _move(edges: number[], position: number, difference: number): number | null {
    for (const edge of edges) {
      if (edge - this.threshold < position && edge + this.threshold > position) {
        return edge - difference;
      }
    }

    return null;
  }
}