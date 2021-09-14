import Box from '../src/box';

test('can create box', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40 });

  expect(box.x).toEqual(10);
  expect(box.y).toEqual(20);
  expect(box.width).toEqual(30);
  expect(box.height).toEqual(40);
});

test('can create box with optional type', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40, type: 'foo' });

  expect(box.x).toEqual(10);
  expect(box.y).toEqual(20);
  expect(box.width).toEqual(30);
  expect(box.height).toEqual(40);
  expect(box.type).toEqual('foo');
});

test('can get box horizontals', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40 });

  expect(box.horizontals).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 20 }),
    expect.objectContaining({ direction: 'horizontal', position: 40 }),
    expect.objectContaining({ direction: 'horizontal', position: 60 }),
  ]);
});

test('can get box verticals', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40 });

  expect(box.verticals).toEqual([
    expect.objectContaining({ direction: 'vertical', position: 10 }),
    expect.objectContaining({ direction: 'vertical', position: 25 }),
    expect.objectContaining({ direction: 'vertical', position: 40 }),
  ]);
});

test('can get box horizontals with type', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40, type: 'page' });

  expect(box.horizontals).toEqual([
    expect.objectContaining({ direction: 'horizontal', position: 20, type: 'page' }),
    expect.objectContaining({ direction: 'horizontal', position: 40, type: 'page' }),
    expect.objectContaining({ direction: 'horizontal', position: 60, type: 'page' }),
  ]);
});

test('can get box verticals with type', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40, type: 'page' });

  expect(box.verticals).toEqual([
    expect.objectContaining({ direction: 'vertical', position: 10, type: 'page' }),
    expect.objectContaining({ direction: 'vertical', position: 25, type: 'page' }),
    expect.objectContaining({ direction: 'vertical', position: 40, type: 'page' }),
  ]);
});