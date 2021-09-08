import Box from './box'
// import GridInterface from './interfaces/grid-interface';
import Edge from './edge';

export default class Grid {
  edges: Edge[]

  constructor() {
    this.edges = [];
  }

  add(box: Box): void {
    this.edges.push(...box.edges);
  }

  matches(box: Box): Edge[] {
    const edges = box.edges;

    return this.edges.filter(edge => edges.some(compare => compare.is(edge)));
  }
}