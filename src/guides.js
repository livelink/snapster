export default class Guides {
  constructor({
    document,
    container,
    classer = (direction) => `guide guide--${direction}`
  }) {
    this.document = document;
    this.container = container;
    this.elements = [];
    this.classer = classer;
  }

  draw({ horizontals, verticals}) {
    this._count = 0;
    this._guidesFor(horizontals, 'horizontal', 'top', 'left');
    this._guidesFor(verticals, 'vertical', 'left', 'top');
    this._removeGuidesFrom(this._count);
  }

  _guidesFor(edges, direction, positioner, clearer) {
    for (const edge of edges) {
      const element = this._createGuide(direction);
      element.style[positioner] = `${edge}px`;
      element.style[clearer] = null;
      this._count++;
    };
  }

  _createGuide(direction) {
    let element = this.elements[this._count] || this._createElement();
    element.className = this.classer(direction);

    return element;
  }

  _createElement() {
    const element = this.document.createElement('div');
    this.container.appendChild(element);
    this.elements.push(element);

    return element;
  }

  _removeGuidesFrom(start) {
    this.elements.splice(start, this.elements.length).forEach(element => {
      this.container.removeChild(element);
    });
  }
}