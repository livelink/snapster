
import Grid from './grid'
import Box from './box'
import Snap from './snap';
import Renderer from './renderer';
import Edge from './edge';

import DocumentInterface from './interfaces/document-interface';
import ContainerInterface from './interfaces/container-interface';
import ElementInterface from './interfaces/element-interface';
import PopulateInterface from './interfaces/populate-interface';
import PointInterface from './interfaces/point-interface';

export default class Snapster {
  private grid: Grid;
  private snapping: Snap;
  private renderer: Renderer;

  constructor(
    options: {
      document: DocumentInterface,
      container: ContainerInterface,
      threshold?: number,
      setup?: (element: ElementInterface, edge: Edge) => void
    }
  ) {
    this.grid = new Grid();
    this.snapping = new Snap({ grid: this.grid, threshold: options.threshold || 8 });
    this.renderer = new Renderer(
      {
        document: options.document,
        container: options.container,
        setup: options.setup || ((element, edge) => element.className = `guide guide--${edge.direction}`)
      }
    );
  }

  populate(boxes: PopulateInterface[]): void {
    this.grid.clear();
    for (const box of boxes) this.grid.add(new Box(box));
  }

  snap(box: PopulateInterface): PointInterface {
    const position = this.snapping.to(new Box(box));

    this.renderer.draw(this.grid.matches(new Box({
      x: position.x === null ? box.x : position.x,
      y: position.y === null ? box.y : position.y,
      width: box.width,
      height: box.height,
      type: box.type
    })));

    return position;
  }

  clear() {
    this.renderer.draw([]);
  }
}
