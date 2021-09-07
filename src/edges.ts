import EdgesInterface from './interfaces/edges-interface';

export default class Edges {
  horizontals: number[]
  verticals: number[]

  constructor() {
    this.horizontals = [];
    this.verticals = [];
  }

  add(box: EdgesInterface): void {
    this.horizontals.push(...box.horizontals);
    this.verticals.push(...box.verticals);
  }

  matches(box: EdgesInterface): EdgesInterface {
    const boxHorizontals = box.horizontals;
    const boxVerticals = box.verticals;

    return {
      horizontals: this.horizontals.filter(value => boxHorizontals.includes(value)),
      verticals: this.verticals.filter(value => boxVerticals.includes(value))
    }
  }
}
