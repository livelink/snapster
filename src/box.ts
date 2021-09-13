import Edge from "./edge";

export default class Box {
  x: number;
  y: number;
  width: number;
  height: number;
  type?: string;

  constructor( options: {
      x: number,
      y: number,
      width: number,
      height: number,
      type?: string
    }) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.type = options.type;
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
      new Edge({ direction: 'horizontal', position: this.top, type: this.type }),
      new Edge({ direction: 'horizontal', position: this.middle, type: this.type }),
      new Edge({ direction: 'horizontal', position: this.bottom, type: this.type })
    ];
  }

  get verticals(): Edge[] {
    return [
      new Edge({ direction: 'vertical', position: this.left, type: this.type }),
      new Edge({ direction: 'vertical', position: this.center, type: this.type }),
      new Edge({ direction: 'vertical', position: this.right, type: this.type })
    ];
  }

  get edges(): Edge[] {
    return [...this.horizontals, ...this.verticals];
  }
}
