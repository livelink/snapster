import Box from '../src/box';
import Grid from '../src/grid';

test('can get edges', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 200, width: 300, height: 400 }));
  grid.add(new Box({ x: 500, y: 600, width: 700, height: 800 }));

  expect(grid.edges).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 200 }),
    expect.objectContaining({ direction: 'horizontal', position: 400 }),
    expect.objectContaining({ direction: 'horizontal', position: 600 }),
    expect.objectContaining({ direction: 'horizontal', position: 1000 }),
    expect.objectContaining({ direction: 'horizontal', position: 1400 }),
    expect.objectContaining({ direction: 'vertical', position: 100 }),
    expect.objectContaining({ direction: 'vertical', position: 250 }),
    expect.objectContaining({ direction: 'vertical', position: 400 }),
    expect.objectContaining({ direction: 'vertical', position: 500 }),
    expect.objectContaining({ direction: 'vertical', position: 850 }),
    expect.objectContaining({ direction: 'vertical', position: 1200 })
  ]);
});

test('can clear edges', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 200, width: 300, height: 400 }));

  grid.clear();

  expect(grid.edges).toEqual([]);
});

test('can get horizontal edges', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 200, width: 300, height: 400 }));
  grid.add(new Box({ x: 500, y: 600, width: 700, height: 800 }));

  expect(grid.horizontals).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 200 }),
    expect.objectContaining({ direction: 'horizontal', position: 400 }),
    expect.objectContaining({ direction: 'horizontal', position: 600 }),
    expect.objectContaining({ direction: 'horizontal', position: 1000 }),
    expect.objectContaining({ direction: 'horizontal', position: 1400 })
  ]);
});

test('can get vertical edges', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 200, width: 300, height: 400 }));
  grid.add(new Box({ x: 500, y: 600, width: 700, height: 800 }));

  expect(grid.verticals).toEqual([
    expect.objectContaining({ direction: 'vertical', position: 100 }),
    expect.objectContaining({ direction: 'vertical', position: 250 }),
    expect.objectContaining({ direction: 'vertical', position: 400 }),
    expect.objectContaining({ direction: 'vertical', position: 500 }),
    expect.objectContaining({ direction: 'vertical', position: 850 }),
    expect.objectContaining({ direction: 'vertical', position: 1200 })
  ]);
});

test('can match top edge', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));
  grid.add(new Box({ x: 600, y: 400, width: 200, height: 200 }));

  const matches = grid.matches(
    new Box({ x: 400, y: 300, width: 200, height: 100 })
  );

  expect(matches).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 300 }),
    expect.objectContaining({ direction: 'horizontal', position: 400 }),
    expect.objectContaining({ direction: 'vertical', position: 600 })
  ]);
});

test('can match middle edge', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 100, width: 200, height: 200 }));

  const matches = grid.matches(
    new Box({ x: 450, y: 200, width: 100, height: 200 })
  );

  expect(matches).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 200 }),
    expect.objectContaining({ direction: 'horizontal', position: 300 })
  ]);
});

test('can match center edge', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 200, width: 200, height: 200 }));

  const matches = grid.matches(
    new Box({ x: 200, y: 0, width: 400, height: 100 })
  );

  expect(matches).toEqual([
    expect.objectContaining({ direction: 'vertical', position: 200 })
  ]);
});

test('can match bottom edge', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 300, width: 200, height: 200 }));

  const matches = grid.matches(
    new Box({ x: 400, y: 200, width: 400, height: 100 })
  );

  expect(matches).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 300 })
  ]);
});

test('can match left edge', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 300, y: 100, width: 200, height: 200 }));

  const matches = grid.matches(
    new Box({ x: 200, y: 400, width: 400, height: 100 })
  );

  expect(matches).toEqual([
    expect.objectContaining({ direction: 'vertical', position: 400})
  ]);
});

test('can match right edge', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 200, width: 200, height: 200 }));

  const matches = grid.matches(
    new Box({ x: 300, y: 0, width: 200, height: 100 })
  );

  expect(matches).toEqual([
    expect.objectContaining({ direction: 'vertical', position: 300 })
  ]);
});

test('can match a horizontal and vertical', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 200, width: 200, height: 200 }));

  const matches = grid.matches(
    new Box({ x: 300, y: 400, width: 300, height: 100 })
  );

  expect(matches).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 400 }),
    expect.objectContaining({ direction: 'vertical', position: 300 })
  ]);
});

test('can match a horizontal and vertical from different boxes', () => {
  const grid = new Grid();

  grid.add(new Box({ x: 100, y: 100, width: 100, height: 100 }));
  grid.add(new Box({ x: 400, y: 400, width: 100, height: 100 }));

  const matches = grid.matches(
    new Box({ x: 200, y: 300, width: 200, height: 100 })
  );

  expect(matches).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 400 }),
    expect.objectContaining({ direction: 'vertical', position: 200 }),
    expect.objectContaining({ direction: 'vertical', position: 400 }),
  ]);
});