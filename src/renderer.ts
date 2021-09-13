import Edge from './edge';

import DocumentInterface from './interfaces/document-interface';
import ContainerInterface from './interfaces/container-interface';
import ElementInterface from './interfaces/element-interface';

const positioning = {
  horizontal: { positioner: 'top', clearer: 'left' },
  vertical: { positioner: 'left', clearer: 'top' }
}

export default class Renderer {
  document: DocumentInterface;
  container: ContainerInterface;
  elements: ElementInterface[];
  private setup: (element: ElementInterface, edge: Edge) => void;

  constructor(
    options: {
      document: DocumentInterface,
      container: ContainerInterface,
      setup: (element: ElementInterface, edge: Edge) => void
    }
  ) {
    this.document = options.document;
    this.container = options.container;
    this.setup = options.setup;
    this.elements = [];
  }

  draw(edges: Edge[]): void {
    let count = 0;

    for (const edge of edges) {
      const element: ElementInterface = this.elements[count] || this.createElement();
      const lookup = positioning[edge.direction];

      this.setup(element, edge);
      element.style[lookup.positioner] = `${edge.position}px`;
      element.style[lookup.clearer] = null;
      count++;
    }

    this.removeGuidesFrom(count);
  }

  private createElement(): ElementInterface {
    const element = this.document.createElement('div');

    this.container.appendChild(element);
    this.elements.push(element);

    return element;
  }

  private removeGuidesFrom(start: number): void {
    const spliced = this.elements.splice(start)
    for (const element of spliced) {
      this.container.removeChild(element);
    }
  }
}