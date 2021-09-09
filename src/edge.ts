export default class Edge {
  direction: string;
  position: number;

  constructor(options: { direction: string, position: number }) {
    this.direction = options.direction;
    this.position = options.position;
  }

  is(edge: Edge): boolean {
    return this.direction === edge.direction && this.position === edge.position;
  }
}
