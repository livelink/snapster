export default class Edges {
  constructor() {
    this.horizontals = [];
    this.verticals = [];
  }

  add(box) {
    this.horizontals.push(...box.horizontals);
    this.verticals.push(...box.verticals);
  }

  matches(box) {
    const boxHorizontals = box.horizontals;
    const boxVerticals = box.verticals;

    return {
      horizontals: this.horizontals.filter(value => boxHorizontals.includes(value)),
      verticals: this.verticals.filter(value => boxVerticals.includes(value))
    }
  }
}
