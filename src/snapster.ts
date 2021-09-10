
import Grid from './grid'
import Box from './box'
import Snapper from './snapper';
import Renderer from './renderer';

import DocumentInterface from './interfaces/document-interface';
import ContainerInterface from './interfaces/container-interface';
import PopulateInterface from './interfaces/populate-interface';
import PointInterface from './interfaces/point-interface';

export default class Snapster {
  private grid: Grid;
  private snapper: Snapper;
  private renderer: Renderer;

  constructor(
    options: {
      document: DocumentInterface,
      container: ContainerInterface,
      threshold?: number
    }
  ) {
    this.grid = new Grid();
    this.snapper = new Snapper({ grid: this.grid, threshold: options.threshold || 8 });
    this.renderer = new Renderer(
      { document: options.document, container: options.container }
    );
  }

  populate(boxes: PopulateInterface[]): void {
    for (const box of boxes) this.grid.add(new Box(box));
  }

  snap(box: PopulateInterface): PointInterface {
    const position = this.snapper.snap(new Box(box));
    this.renderer.draw(this.grid.edges);

    return position;
  }
}
