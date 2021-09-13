import Box from './box'
import Edge from './edge';
import Grid from './grid';

import PointInterface from './interfaces/point-interface'

export default class Snapper {
  grid: Grid;
  threshold: number;

  constructor(options: { grid: Grid, threshold?: number }) {
    this.grid = options.grid;
    this.threshold = options.threshold || 8;
  }

  snap(box: Box): PointInterface {
    return {
      x: this.snapAxis(this.grid.verticals, box.left, box.center, box.right, box.width),
      y: this.snapAxis(this.grid.horizontals, box.top, box.middle, box.bottom, box.height)
    };
  }

  private snapAxis(
    edges: Edge[],
    start: number,
    middle: number,
    end: number,
    extent: number
  ): number | null {
    for (let edge of edges) {
      const startMatch = this.snapTo(edge, start, 0);
      if (startMatch !== null) return startMatch;

      const middleMatch = this.snapTo(edge, middle, extent / 2);
      if (middleMatch !== null) return middleMatch;

      const endMatch = this.snapTo(edge, end, extent);
      if (endMatch !== null) return endMatch;
    }

    return null;
  }

  private snapTo(edge: Edge, position: number, offset: number): number | null {
    return (
      edge.position - this.threshold < position &&
      edge.position + this.threshold > position
    ) ? edge.position - offset : null;
  }
}