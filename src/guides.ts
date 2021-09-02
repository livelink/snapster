
interface GuidesInterface {
  container: HTMLElement
  classer: (direction: string) => string
  elements?: HTMLElement[]
}

export default class Guides implements GuidesInterface {
  container: HTMLElement
  classer: (direction: string) => string
  elements?: HTMLElement[]
  private _count: number

  constructor(container: HTMLElement, classer = (direction: string): string => `guide guide--${direction}`) {
    this.container = container;
    this.elements = [];
    this.classer = classer;
    this._count = 0
  }

  draw(horizontals: number[], verticals: number[]): void {
    this._count = 0;
    this._guidesFor(horizontals, 'horizontal', 'top', 'left');
    this._guidesFor(verticals, 'vertical', 'left', 'top');
    this._removeGuidesFrom(this._count);
  }

  _guidesFor(edges: number[], direction: string, positioner: string, clearer: string): void {
    for (const edge of edges) {
      const element: HTMLElement = this._createGuide(direction);
      element.style[positioner] = `${edge}px`;
      element.style[clearer] = null;
      this._count++;
    };
  }

  _createGuide(direction: string): HTMLElement {
    let element: HTMLElement = (this.elements && this.elements[this._count]) || this._createElement();
    element.className = this.classer(direction);

    return element;
  }

  _createElement() {
    const element = document.createElement('div');
    this.container.appendChild(element);
    this.elements && this.elements.push(element);

    return element;
  }

  _removeGuidesFrom(start:number) {
    this.elements && this.elements.splice(start, this.elements.length).forEach(element => {
      this.container.removeChild(element);
    });
  }
}