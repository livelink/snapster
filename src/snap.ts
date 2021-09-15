import Box from './box'
import Edge from './edge';
import Grid from './grid';

import PointInterface from './interfaces/point-interface'

export default class Snap {
  grid: Grid;
  threshold: number;

  constructor(options: { grid: Grid, threshold?: number }) {
    this.grid = options.grid;
    this.threshold = options.threshold || 8;
  }

  to(box: Box): PointInterface {
    const grid = this.grid;
    const { left, center, right, width, x, top, middle, bottom, height, y } = box;

    return {
      x: this.snapAxis(grid.verticals, left, center, right, width, x),
      y: this.snapAxis(grid.horizontals, top, middle, bottom, height, y)
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
      for (const [position, offset] of [
        [start, 0], [middle, extent / 2], [end, extent]
      ]) {
        const snapped = this.snapped(edge, position, offset, fallback);
        if (snapped !== fallback) return snapped;
      }
    }

    return fallback;
  }

  private snapped(
    edge: Edge,
    position: number,
    offset: number,
    fallback: number
  ): number {
    return this.snappable(edge.position, position) ? edge.position - offset : fallback;
  }

  private snappable(compare: number, position: number): boolean {
    return compare - this.threshold < position && compare + this.threshold > position;
  }
}