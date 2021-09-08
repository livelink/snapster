import Box from './box'
import PointInterface from './interfaces/point-interface'

export default class Snapper {
  horizontals: number[]
  verticals: number[]
  threshold: number

  constructor(options: { horizontals: number[], verticals: number[], threshold?: number }) {
    this.horizontals = options.horizontals;
    this.verticals = options.verticals;
    this.threshold = options.threshold || 8;
  }

  snap(box: Box): PointInterface {
    return {
      x: this.find(this.verticals, box.verticals, box.width) || null,
      y: this.find(this.horizontals, box.horizontals, box.height) || null
    };
  }

  private find(edges: number[], boxGrid: number[], extent: number): number | null {
    let [start, middle, end] = boxGrid;

    return (
      this.move(edges, start, 0) ||
      this.move(edges, middle, extent / 2) ||
      this.move(edges, end, extent)
    );
  }

  private move(edges: number[], position: number, difference: number): number | null {
    for (let edge of edges) {
      if (edge - this.threshold < position && edge + this.threshold > position) {
        return edge - difference;
      }
    }

    return null;
  }
}