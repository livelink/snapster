import Edge from './edge';

import DocumentInterface from './interfaces/document-interface';
import ContainerInterface from './interfaces/container-interface';
import ElementInterface from './interfaces/element-interface';

const defaultSetup = (options: { element: ElementInterface, edge: Edge }) => {
  const { element, edge } = options;

  const modifiers: string[] = [edge.direction];
  if (edge.type) modifiers.push(edge.type);

  const classes = ['guide', ...modifiers.map(modifier => `guide--${modifier}`)];
  element.className = classes.join(' ');
};

const defaultPositioner = (options: { element: ElementInterface, edge: Edge }) => {
  const { element, edge } = options;

  element.style[edge.direction === 'horizontal' ? 'top' : 'left'] = `${edge.position}px`;
};

const defaultReset = (options: { element: ElementInterface }) => {
  const style = options.element.style;

  style.top = null;
  style.left = null;
};
export default class Renderer {
  document: DocumentInterface;
  container: ContainerInterface;
  elements: ElementInterface[];
  private setup: (options: { element: ElementInterface, edge: Edge }) => void;
  private positioner: (options: { element: ElementInterface, edge: Edge }) => void;
  private reset: (options: { element: ElementInterface }) => void;

  constructor(
    options: {
      document: DocumentInterface,
      container: ContainerInterface,
      setup?: (options: { element: ElementInterface, edge: Edge }) => void,
      positioner?: (options: { element: ElementInterface, edge: Edge }) => void
      reset?: (options: { element: ElementInterface }) => void
    }
  ) {
    this.document = options.document;
    this.container = options.container;
    this.setup = options.setup || defaultSetup;
    this.positioner = options.positioner || defaultPositioner;
    this.reset = options.reset || defaultReset;
    this.elements = [];
  }

  draw(edges: Edge[]): void {
    let count: number = 0;

    for (const edge of edges) {
      const element: ElementInterface = this.elements[count] || this.createElement();

      this.setup({ element, edge });
      this.reset({ element });
      this.positioner({ element, edge });
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
    for (const element of this.elements.splice(start)) {
      this.container.removeChild(element);
    }
  }
}