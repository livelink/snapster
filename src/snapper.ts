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

  private snapAxis(edges: Edge[], start: number, middle: number, end: number, extent: number) {
    for (let edge of edges) {
      const position = (
        this.snapTo(edge, start, 0) ||
        this.snapTo(edge, middle, extent / 2) ||
        this.snapTo(edge, end, extent)
      );
      
      if (position) return position;
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