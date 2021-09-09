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

  get top() {
    return this.y;
  }

  get middle() {
    return this.y + (this.height / 2);
  }

  get bottom() {
    return this.y + this.height;
  }

  get left() {
    return this.x;
  }

  get center() {
    return this.x + (this.width / 2);
  }

  get right() {
    return this.x + this.width;
  }

  get horizontals(): Edge[] {
    return [
      new Edge({ direction: 'horizontal', position: this.top }),
      new Edge({ direction: 'horizontal', position: this.middle }),
      new Edge({ direction: 'horizontal', position: this.bottom })
    ];
  }

  get verticals(): Edge[] {
    return [
      new Edge({ direction: 'vertical', position: this.left }),
      new Edge({ direction: 'vertical', position: this.center }),
      new Edge({ direction: 'vertical', position: this.right })
    ];
  }

  get edges(): Edge[] {
    return [...this.horizontals, ...this.verticals];
  }
}
