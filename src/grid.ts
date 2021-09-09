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
    this.horizontals.push(...box.horizontals);
    this.verticals.push(...box.verticals);
  }

  get edges(): Edge[] {
    return [...this.horizontals, ...this.verticals];
  }

  matches(box: Box): Edge[] {
    const edges = box.edges;

    return this.edges.filter(edge => edges.some(compare => compare.is(edge)));
  }
}