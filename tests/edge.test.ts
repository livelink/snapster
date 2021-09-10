import Edge from '../src/edge';

test('can create edge', () => {
  const edge = new Edge({ direction: 'horizontal', position: 100 });

  expect(edge.direction).toEqual('horizontal');
  expect(edge.position).toEqual(100);
});

test('can compare edges', () => {
  const edge = new Edge({ direction: 'horizontal', position: 100 });

  expect(edge.is(new Edge({ direction: 'horizontal', position: 100 }))).toEqual(true);
  expect(edge.is(new Edge({ direction: 'vertical', position: 100 }))).toEqual(false);
  expect(edge.is(new Edge({ direction: 'horizontal', position: 200 }))).toEqual(false);
  expect(edge.is(new Edge({ direction: 'vertical', position: 200 }))).toEqual(false);
});
