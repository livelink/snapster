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
    new Box({ x: 400, y: 300, width: 100, height: 100 })
  );

  expect(matches).toEqual({
    horizontals: [300, 400],
    verticals: []
  });
});

// TODO: middle, bottom, left, center, right
