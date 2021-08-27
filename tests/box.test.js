import Box from '../src/box';

test('can create box', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40 });
  
  expect(box.x).toEqual(10);
  expect(box.y).toEqual(20);
  expect(box.width).toEqual(30);
  expect(box.height).toEqual(40);
});

test('can get box horizontals', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40 });
  
  expect(box.horizontals).toEqual([20, 40, 60]);
});

test('can get box verticals', () => {
  const box = new Box({ x: 10, y: 20, width: 30, height: 40 });
  
  expect(box.verticals).toEqual([10, 25, 40]);
});