import Edge from "./edge";
export default class Box {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(options: { x: number, y: number, width: number, height: number }) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
  }

  get edges(): Edge[] {
    const horizontals = this.intersects('horizontal', this.y, this.height);
    const verticals = this.intersects('vertical', this.x, this.width);

    return [...horizontals, ...verticals];
  }

  private intersects(direction: string, start: number, extent: number): Edge[] {
    return [
      new Edge({ direction: direction, position: start }),
      new Edge({ direction: direction, position: start + (extent / 2) }),
      new Edge({ direction: direction, position: start + extent })
    ];
  }
}
