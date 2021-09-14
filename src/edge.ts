export default class Edge {
  direction: string;
  position: number;
  type?: string

  constructor(
    options: {
      direction: string,
      position: number,
      type?: string
    }
  ) {
    this.direction = options.direction;
    this.position = options.position;
    this.type = options.type;
  }

  is(edge: Edge): boolean {
    return this.direction === edge.direction && this.position === edge.position;
  }
}
