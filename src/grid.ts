import Edge from './edge';
import Box from './box'

export default class Grid {
  horizontals: Edge[]
  verticals: Edge[]

  constructor() {
    this.horizontals = [];
    this.verticals = [];
  }

  add(box: Box): void {
    this.horizontals.push(...this.distinct(box.horizontals, this.horizontals));
    this.verticals.push(...this.distinct(box.verticals, this.verticals));
  }

  get edges(): Edge[] {
    return [...this.horizontals, ...this.verticals];
  }

  matches(box: Box) {
    return this.edges.filter(edge => box.edges.some(compare => compare.is(edge)));
  }

  private distinct(edges: Edge[], existing: Edge[]) {
    return edges.filter(edge => !existing.some(compare => compare.is(edge)));
  }
}