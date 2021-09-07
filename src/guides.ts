import GridInterface from './interfaces/grid-interface';
import DocumentInterface from './interfaces/document-interface';
import ContainerInterface from './interfaces/container-interface';
import ElementInterface from './interfaces/element-interface';

export default class Guides {// implements GuidesInterface {
  document: DocumentInterface;
  container: ContainerInterface;
  classer: (direction: string) => string;
  elements: ElementInterface[];
  count: number;

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
    this.count = 0;
    this.elements = [];
  }

  draw(options: GridInterface): void {
    this.count = 0;
    this.guidesFor(options.horizontals, 'horizontal', 'top', 'left');
    this.guidesFor(options.verticals, 'vertical', 'left', 'top');
    this.removeGuidesFrom(this.count);
  }

  private guidesFor(
    edges: number[],
    direction: string,
    positioner: string,
    clearer: string
  ): void {
    for (const edge of edges) {
      const element: ElementInterface = this.createGuide(direction);
      element.style[positioner] = `${edge}px`;
      element.style[clearer] = null;
      this.count++;
    }
  }

  private createGuide(direction: string): ElementInterface {
    let element: ElementInterface = this.elements[this.count] || this.createElement();
    element.className = this.classer(direction);

    return element;
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