import Box from '../src/box';
import Edges from '../src/edges';

test('can get horizontal edges', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 200, width: 300, height: 400 }));
  edges.add(new Box({ x: 500, y: 600, width: 700, height: 800 }));

  expect(edges.horizontals).toEqual([
    200, 400, 600,
    600, 1000, 1400
  ]);
});

test('can get vertical edges', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 200, width: 300, height: 400 }));
  edges.add(new Box({ x: 500, y: 600, width: 700, height: 800 }));

  expect(edges.verticals).toEqual([
    100, 250, 400,
    500, 850, 1200
  ]);
});

test('can match top edge', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));
  edges.add(new Box({ x: 600, y: 400, width: 200, height: 200 }));

  const matches = edges.matches(
    new Box({ x: 400, y: 300, width: 200, height: 100 })
  );

  expect(matches).toEqual({
    horizontals: [300, 400],
    verticals: [600]
  });
});

test('can match middle edge', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

  const matches = edges.matches(
    new Box({ x: 450, y: 200, width: 100, height: 200 })
  );

  expect(matches).toEqual({
    horizontals: [200, 300],
    verticals: []
  });
});

test('can match center edge', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 200, width: 200, height: 200 }));

  const matches = edges.matches(
    new Box({ x: 200, y: 0, width: 400, height: 100 })
  );

  expect(matches).toEqual({
    horizontals: [],
    verticals: [200]
  });
});

test('can match bottom edge', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 300, width: 200, height: 200 }));

  const matches = edges.matches(
    new Box({ x: 400, y: 200, width: 400, height: 100 })
  );

  expect(matches).toEqual({
    horizontals: [300],
    verticals: []
  });
});

test('can match left edge', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 300, y: 100, width: 200, height: 200 }));

  const matches = edges.matches(
    new Box({ x: 200, y: 400, width: 400, height: 100 })
  );

  expect(matches).toEqual({
    horizontals: [],
    verticals: [400]
  });
});

test('can match right edge', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 200, width: 200, height: 200 }));

  const matches = edges.matches(
    new Box({ x: 300, y: 0, width: 200, height: 100 })
  );

  expect(matches).toEqual({
    horizontals: [],
    verticals: [300]
  });
});

test('can match a horizontal and vertical', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 200, width: 200, height: 200 }));

  const matches = edges.matches(
    new Box({ x: 300, y: 400, width: 300, height: 100 })
  );

  expect(matches).toEqual({
    horizontals: [400],
    verticals: [300]
  });
});

test('can match a horizontal and vertical from different boxes', () => {
  const edges = new Edges();

  edges.add(new Box({ x: 100, y: 100, width: 100, height: 100 }));
  edges.add(new Box({ x: 400, y: 400, width: 100, height: 100 }));

  const matches = edges.matches(
    new Box({ x: 200, y: 300, width: 200, height: 100 })
  );

  expect(matches).toEqual({
    horizontals: [400],
    verticals: [200, 400]
  });
});