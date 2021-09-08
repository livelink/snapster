import Box from './box'
import PointInterface from './interfaces/point-interface'
import Edge from './edge';
import Grid from './grid';

export default class Snapper {
  grid: Grid;
  threshold: number;

  constructor(options: { grid: Grid, threshold?: number }) {
    this.grid = options.grid;
    this.threshold = options.threshold || 8;
  }

  snap(box: Box): PointInterface {
    let x: number | null = null;
    let y: number | null = null;

    for (let horizontal of this.grid.horizontals) {
      if (y) continue;

      y = this.snapTo(horizontal, box.top, 0) ||
          this.snapTo(horizontal, box.middle, box.height / 2) ||
          this.snapTo(horizontal, box.bottom, box.height);
    }

    for (let vertical of this.grid.verticals) {
      if (x) continue;

      x = this.snapTo(vertical, box.left, 0) ||
          this.snapTo(vertical, box.center, box.width / 2) ||
          this.snapTo(vertical, box.right, box.width);
    }

    return { x, y };
  }

  private snapTo(edge: Edge, position: number, offset: number): number | null {
    if (edge.position - this.threshold < position && edge.position + this.threshold > position) {
      return edge.position - offset;
    }

    return null;
  }
}