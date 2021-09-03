import Box from '../dist/box';
import Edges from '../dist/edges';
import Snapper from '../dist/snapper';

describe('single edges', () => {
  test('can snap box to left edge', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 305, y: 400, width: 100, height: 200 });

    expect(snapper.snap(box)).toEqual({ x: 300, y: null });
  });

  test('can snap box to center edge', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 155, y: 400, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: 150, y: null });
  });

  test('can snap box to right edge', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 300, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 195, y: 400, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: 200, y: null });
  });

  test('can snap box to top edge', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 400, y: 305, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: null, y: 300 });
  });

  test('can snap box to middle edge', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 400, y: 145, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: null, y: 140 });
  });

  test('can snap box to bottom edge', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 300, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 400, y: 185, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: null, y: 180 });
  });
});

describe('multiple edges', () => {
  test('can snap to top left edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 305, y: 305, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: 300, y: 300 });
  });

  test('can snap to top center edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 205, y: 305, width: 500, height: 500 });

    expect(snapper.snap(box)).toEqual({ x: 200, y: 300 });
  });

  test('can snap to top right edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 101, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 5, y: 305, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: 1, y: 300 });
  });

  test('can snap to middle left edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 105, y: 155, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: 100, y: 140 });
  });

  test('can snap to middle center edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 155, y: 155, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: 150, y: 140 });
  });

  test('can snap to middle right edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 101, y: 100, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 5, y: 155, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: 1, y: 140 });
  });

  test('can snap to bottom left edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 500, y: 500, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 705, y: 405, width: 100, height: 100 });

    expect(snapper.snap(box)).toEqual({ x: 700, y: 400 });
  });

  test('can snap to bottom center edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 100, y: 500, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 55, y: 385, width: 100, height: 120 });

    expect(snapper.snap(box)).toEqual({ x: 50, y: 380 });
  });

  test('can snap to bottom right edges', () => {
    const edges = new Edges();
    edges.add(new Box({ x: 1000, y: 1000, width: 200, height: 200 }));

    const { horizontals, verticals } = edges;
    const snapper = new Snapper({ horizontals, verticals });
    const box = new Box({ x: 545, y: 505, width: 450, height: 500 });

    expect(snapper.snap(box)).toEqual({ x: 550, y: 500 });
  });
});
