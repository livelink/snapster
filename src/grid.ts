import GridInterface from './interfaces/grid-interface';

export default class Grid {
  horizontals: number[]
  verticals: number[]

  constructor() {
    this.horizontals = [];
    this.verticals = [];
  }

  add(box: GridInterface): void {
    this.horizontals.push(...box.horizontals);
    this.verticals.push(...box.verticals);
  }

  matches(box: GridInterface): GridInterface {
    const boxHorizontals = box.horizontals;
    const boxVerticals = box.verticals;

    return {
      horizontals: this.horizontals.filter(value => boxHorizontals.includes(value)),
      verticals: this.verticals.filter(value => boxVerticals.includes(value))
    }
  }
}
