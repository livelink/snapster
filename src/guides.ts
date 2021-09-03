
interface GuidesInterface {
  document: Document
  container: HTMLElement
  classer?: (direction: string) => string
  elements?: HTMLElement[]
}

interface DrawInterface {
  horizontals: number[]
  verticals: number[]
}

export default class Guides {
  document: Document
  container: HTMLElement
  classer: (direction: string) => string
  elements: HTMLElement[]
  private count: number

  constructor (
    options: GuidesInterface,
    classer = (direction: string): string => `guide guide--${direction}`
  ) {
    this.document = options.document
    this.container = options.container
    this.elements = []
    this.classer = classer
    this.count = 0
  }

  draw(options: DrawInterface): void {
    this.count = 0;
    this.guidesFor(options.horizontals, 'horizontal', 'top', 'left')
    this.guidesFor(options.verticals, 'vertical', 'left', 'top')
    this.removeGuidesFrom(this.count)
  }

  private guidesFor(
    edges: number[],
    direction: string,
    positioner: string,
    clearer: string
  ): void {
    for (const edge of edges) {
      const element: HTMLElement = this.createGuide(direction);
      element.style[positioner] = `${edge}px`
      element.style[clearer] = null
      this.count++
    }
  }

  private createGuide(direction: string): HTMLElement {
    let element: HTMLElement = this.elements[this.count] || this.createElement()
    element.className = this.classer(direction)

    return element
  }

  private createElement(): HTMLElement {
    const element = this.document.createElement('div')
    this.container.appendChild(element)
    this.elements.push(element)

    return element
  }

  private removeGuidesFrom(start:number): void {
    this.elements.splice(start, this.elements.length).forEach(element => {
      this.container.removeChild(element)
    })
  }
}