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
      x: this.snapAxis(this.grid.verticals, box.left, box.center, box.right, box.width, box.x),
      y: this.snapAxis(this.grid.horizontals, box.top, box.middle, box.bottom, box.height, box.y)
    };
  }

  private snapAxis(
    edges: Edge[],
    start: number,
    middle: number,
    end: number,
    extent: number,
    fallback: number
  ): number {
    for (let edge of edges) {
      const startMatch = this.snapTo(edge, start, 0, fallback);
      if (startMatch !== fallback) return startMatch;

      const middleMatch = this.snapTo(edge, middle, extent / 2, fallback);
      if (middleMatch !== fallback) return middleMatch;

      const endMatch = this.snapTo(edge, end, extent, fallback);
      if (endMatch !== fallback) return endMatch;
    }

    return fallback;
  }

  private snapTo(edge: Edge, position: number, offset: number, fallback: number): number {
    return this.snappable(edge.position, position) ? edge.position - offset : fallback;
  }

  private snappable(compare: number, position: number): boolean {
    return compare - this.threshold < position && compare + this.threshold > position;
  }
}