import { BoxInterface } from './box';

type Match = {
  horizontals: number[]
  verticals: number[]
}

export default class Edges {
  horizontals: number[]
  verticals: number[]

  constructor() {
    this.horizontals = [];
    this.verticals = [];
  }

  add(box: BoxInterface): void  {
    this.horizontals.push(...box.horizontals);
    this.verticals.push(...box.verticals);
  }

  matches(box: BoxInterface): Match {
    const boxHorizontals = box.horizontals;
    const boxVerticals = box.verticals;

    return {
      horizontals: this.horizontals.filter(value => boxHorizontals.includes(value)),
      verticals: this.verticals.filter(value => boxVerticals.includes(value))
    }
  }
}
