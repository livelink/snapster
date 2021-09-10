import Snapster from '../src/snapster';

import DocumentInterface from '../src/interfaces/document-interface';
import ContainerInterface from '../src/interfaces/container-interface';
import ElementInterface from '../src/interfaces/element-interface';

test('can snap', () => {
  const document: DocumentInterface = {
    createElement(tagName: string) {
      return { tagName, className: '', style: {} };
    }
  };

  const body: ContainerInterface = {
    children: [],
    appendChild(child: ElementInterface) {
      this.children.push(child);
    },
    removeChild(child: ElementInterface) {
      this.children.filter(existing => existing === child );
    }
  };

  const snapster = new Snapster({ document: document, container: body });

  snapster.populate([
    { x: 100, y: 200, width: 300, height: 400 },
    { x: 300, y: 500, width: 500, height: 600 },
  ]);

  const position = snapster.snap({ x: 101, y: 201, width: 300, height: 400 });

  expect(position).toEqual({ x: 100, y: 200 });

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '200px', left: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '400px', left: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '600px', left: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '500px', left: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '800px', left: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '1100px', left: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '100px', top: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '250px', top: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '400px', top: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '300px', top: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '550px', top: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '800px', top: null }
    }
  ]);
});
