import './style.css';
import Box from './src/box';
import Grid from './src/grid';
import Renderer from './src/renderer';
import Snapper from './src/snapper';

let drag = null;
let shiftX;
let shiftY;
let grid = null;

const guides = new Renderer({ document, container: document.querySelector('.page') });

document.addEventListener('mousedown', event => {
  const target = event.target;

  if (target.className !== 'box') return;

  shiftX = event.pageX - target.offsetLeft;
  shiftY = event.pageY - target.offsetTop;

  grid = new Grid();

  for (let el of document.querySelectorAll(`.box:not(#${target.id})`)) {
    const { offsetLeft: x, offsetTop: y, clientWidth: width, clientHeight: height } = el
    grid.add(new Box({ x, y, width, height }));
  };

  drag = target;
});

document.addEventListener('mousemove', event => {
  if (!drag) return;

  const { offsetLeft: x, offsetTop: y, clientWidth: width, clientHeight: height } = drag
  const box = new Box({ x, y, width, height });
  const matches = grid.matches(box);

  box.x = event.pageX - shiftX;
  box.y = event.pageY - shiftY;

  const point = new Snapper({
    horizontals: grid.horizontals,
    verticals: grid.verticals
  }).snap(box);

  drag.style.left = `${ point.x || box.x }px`;
  drag.style.top = `${ point.y || box.y }px`;

  guides.draw(matches);
});

document.addEventListener('mouseup', event => {
  if (!drag) return;
  drag = null;
  guides.draw({ horizontals: [], verticals: [] });
});