import ElementInterface from './interfaces/element-interface';

export default class Edge {
  direction: string;
  position: number;
  setup?: (element: ElementInterface) => void

  constructor(
    options: {
      direction: string,
      position: number,
      setup?: (element: ElementInterface) => void
    }
  ) {
    this.direction = options.direction;
    this.position = options.position;
    this.setup = options.setup;
  }

  is(edge: Edge): boolean {
    return this.direction === edge.direction && this.position === edge.position;
  }
}
