import './style.css';
// import Box from './src/box';
// import Grid from './src/grid';
// import Renderer from './src/renderer';
// import Snapper from './src/snapper';
import Snapster from './src/snapster';

// let drag = null;
// let shiftX;
// let shiftY;
// let grid = null;

// const renderer = new Renderer({ document, container: document.querySelector('.page') });

// document.addEventListener('mousedown', event => {
//   const target = event.target;

//   if (target.className !== 'box') return;

//   shiftX = event.pageX - target.offsetLeft;
//   shiftY = event.pageY - target.offsetTop;

//   grid = new Grid();

//   for (let el of document.querySelectorAll(`.box:not(#${target.id})`)) {
//     const { offsetLeft: x, offsetTop: y, clientWidth: width, clientHeight: height } = el
//     grid.add(new Box({ x, y, width, height }));
//   };

//   drag = target;
// });

// document.addEventListener('mousemove', event => {
//   if (!drag) return;

//   const { offsetLeft: x, offsetTop: y, clientWidth: width, clientHeight: height } = drag
//   const box = new Box({ x, y, width, height });
//   const matches = grid.matches(box);

//   box.x = event.pageX - shiftX;
//   box.y = event.pageY - shiftY;

//   const point = new Snapper({ grid }).snap(box);

//   drag.style.left = `${ point.x || box.x }px`;
//   drag.style.top = `${ point.y || box.y }px`;

//   renderer.draw(matches);
// });

// document.addEventListener('mouseup', event => {
//   if (!drag) return;
//   drag = null;
//   renderer.draw([]);
// });


const container = document.querySelector('.page');
const snapster = new Snapster({ document, container, threshold: 8 });

let drag = null;
let shiftX;
let shiftY;

document.addEventListener('mousedown', event => {
  const target = event.target;
  if (target.className !== 'box') return;

  drag = event.target;
  shiftX = event.pageX - target.offsetLeft;
  shiftY = event.pageY - target.offsetTop;

  snapster.populate([
    {
      x: 0,
      y: 0,
      width: container.clientWidth,
      height: container.clientHeight,
      setup: (guide) => guide.className = 'guide guide--page'
    },
    ...[...document.querySelectorAll(`.box:not(#${target.id})`)].map(element => ({
      x: element.offsetLeft,
      y: element.offsetTop,
      width: element.clientWidth,
      height: element.clientHeight,
      setup: (guide) => guide.className = 'guide'
    }))
  ]);
});

document.addEventListener('mousemove', event => {
  if (!drag) return;

  drag.style.left = `${event.pageX - shiftX}px`;
  drag.style.top = `${event.pageY - shiftY}px`;

  const position = snapster.snap({
    x: drag.offsetLeft,
    y: drag.offsetTop,
    width: drag.clientWidth,
    height: drag.clientHeight
  });

  drag.style.left = `${position.x}px`;
  drag.style.top = `${position.y}px`;
});

document.addEventListener('mouseup', event => {
  if (!drag) return;
  drag = null;
  shiftX = null;
  shiftY = null;

  snapster.clear();
});