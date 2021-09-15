type DirectionType = 'horizontal' | 'vertical';

export default class Edge {
  direction: DirectionType;
  position: number;
  type?: string

  constructor(options: { direction: DirectionType, position: number, type?: string }) {
    this.direction = options.direction;
    this.position = options.position;
    this.type = options.type;
  }

  is(edge: Edge): boolean {
    return this.direction === edge.direction && this.position === edge.position;
  }
}