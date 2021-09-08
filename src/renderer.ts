import DocumentInterface from './interfaces/document-interface';
import ContainerInterface from './interfaces/container-interface';
import ElementInterface from './interfaces/element-interface';
import Edge from './edge';

const positioning = {
  horizontal: { positioner: 'top', clearer: 'left' },
  vertical: { positioner: 'left', clearer: 'top' }
}

export default class Renderer {
  document: DocumentInterface;
  container: ContainerInterface;
  classer: (direction: string) => string;
  elements: ElementInterface[];

  constructor(
    options: {
      document: DocumentInterface,
      container: ContainerInterface,
      classer?: (direction: string) => string,
      elements?: ElementInterface[]
    }
  ) {
    this.document = options.document;
    this.container = options.container;
    this.classer = options.classer || ((direction: string) => `guide guide--${direction}`);
    this.elements = [];
  }

  draw(edges: Edge[]): void {
    let count = 0;

    for (const edge of edges) {
      const element: ElementInterface = this.elements[count] || this.createElement();
      const lookup = positioning[edge.direction];
      element.className = this.classer(edge.direction);
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
    this.elements.splice(start).forEach(element => {
      this.container.removeChild(element);
    });
  }
}