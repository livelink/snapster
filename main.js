import './style.css';
import Box from './src/box';
import Edges from './src/edges';
import Guides from './src/guides';
import Snapper from './src/snapper';

let dragging = false;
let shiftX;
let shiftY;
let edges = null;

const guides = new Guides({
  document,
  container: document.querySelector('.page'),
  // classer: (direction) => `guide guide--${direction} guide--page`
});

document.addEventListener('mousedown', event => {
  const target = event.target;
  if (target.className !== 'box') return;

  shiftX = event.pageX - target.offsetLeft;
  shiftY = event.pageY - target.offsetTop;

  edges = new Edges();

  for (let element of document.querySelectorAll(`.box:not(#${target.id})`)) {
    edges.add(
      new Box({
        x: element.offsetLeft,
        y: element.offsetTop,
        width: element.clientWidth,
        height: element.clientHeight
      })
    );
  };

  dragging = target;
});

document.addEventListener('mousemove', event => {
  if (!dragging) return;

  const box = new Box({
    x: dragging.offsetLeft,
    y: dragging.offsetTop,
    width: dragging.clientWidth,
    height: dragging.clientHeight
  });

  const matches = edges.matches(box);

  box.x = event.pageX - shiftX;
  box.y = event.pageY - shiftY;

  const point = new Snapper({ horizontals: edges.horizontals, verticals: edges.verticals }).snap(box);

  dragging.style.left = `${ point.x || box.x }px`;
  dragging.style.top = `${ point.y || box.y }px`;

  guides.draw(matches);
});

document.addEventListener('mouseup', event => {
  if (!dragging) return;
  dragging = null;
  guides.draw({ horizontals: [], verticals: [] });
});