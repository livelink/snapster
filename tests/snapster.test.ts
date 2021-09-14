import Snapster from '../src/snapster';

import DocumentInterface from '../src/interfaces/document-interface';
import ContainerInterface from '../src/interfaces/container-interface';
import ElementInterface from '../src/interfaces/element-interface';

test('can snap', () => {
  const document: DocumentInterface = {
    createElement(tagName: string) { return { tagName, className: '', style: {} }; }
  };

  const container: ContainerInterface = {
    children: [],
    appendChild(child: ElementInterface) { this.children.push(child); },
    removeChild(child: ElementInterface) {
      this.children = this.children.filter(existing => existing === child);
    }
  };

  const snapster = new Snapster({ document: document, container });

  snapster.populate([{ x: 100, y: 200, width: 300, height: 400 }]);

  const position = snapster.snap({ x: 101, y: 201, width: 500, height: 600 });

  expect(position).toEqual({ x: 100, y: 200 });

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '200px', left: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '100px', top: null }
    }
  ]);
});

test('can snap with scale', () => {
  const document: DocumentInterface = {
    createElement(tagName: string) { return { tagName, className: '', style: {} }; }
  };

  const container: ContainerInterface = {
    children: [],
    appendChild(child: ElementInterface) { this.children.push(child); },
    removeChild(child: ElementInterface) {
      this.children = this.children.filter(existing => existing === child);
    }
  };

  const snapster = new Snapster({
    document: document,
    container,
    positioner: ({ element, edge }) => {
      const position = edge.position * 0.3;

      element.style[edge.direction === 'horizontal' ? 'top' : 'left'] = `${position}px`;
    }
  });

  snapster.populate([{ x: 100, y: 200, width: 300, height: 400 }]);

  const position = snapster.snap({ x: 101, y: 201, width: 500, height: 600 });

  expect(position).toEqual({ x: 100, y: 200 });

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '60px', left: null }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '30px', top: null }
    }
  ]);
});

test('can clear previous guides', () => {
  const document: DocumentInterface = {
    createElement(tagName: string) {
      return { tagName, className: '', style: {} };
    }
  };

  const container: ContainerInterface = {
    children: [],
    appendChild(child: ElementInterface) { this.children.push(child); },
    removeChild(child: ElementInterface) {
      this.children = this.children.filter(existing => existing === child);
    }
  };

  const snapster = new Snapster({ document: document, container });

  snapster.populate([{ x: 49, y: 149, width: 300, height: 400 }]);
  snapster.snap({ x: 50, y: 150, width: 500, height: 600 });
  snapster.populate([{ x: 51, y: 151, width: 300, height: 400 }]);
  snapster.snap({ x: 50, y: 150, width: 500, height: 600 });

  expect(body.children).toEqual([
    {
      className: 'guide guide--horizontal',
      style: { left: null, top: '151px' },
      tagName: 'div',
    },
    {
      className: 'guide guide--vertical',
      style: { left: '51px', top: null },
      tagName: 'div',
    }
  ]);
});

test('can clear snaps', () => {
  const document: DocumentInterface = {
    createElement(tagName: string) {
      return { tagName, className: '', style: {} };
    }
  };

  const container: ContainerInterface = {
    children: [],
    appendChild(child: ElementInterface) { this.children.push(child); },
    removeChild(child: ElementInterface) {
      this.children = this.children.filter(existing => existing === child);
    }
  };

  const snapster = new Snapster({ document: document, container });

  snapster.populate([{ x: 100, y: 200, width: 300, height: 400 }]);
  snapster.snap({ x: 101, y: 201, width: 300, height: 400 });
  snapster.clear();

  expect(body.children).toEqual([]);
});

it('can take a custom setup', () => {
  const document: DocumentInterface = {
    createElement(tagName: string) {
      return { tagName, className: '', style: {} };
    }
  };

  const container: ContainerInterface = {
    children: [],
    appendChild(child: ElementInterface) { this.children.push(child); },
    removeChild(child: ElementInterface) {
      this.children = this.children.filter(existing => existing === child);
    }
  };

  const snapster = new Snapster({
    document,
    container,
    setup: ({ element, edge }) => element.className = `my-${edge.type}-${edge.direction}`
  });

  snapster.populate([{
    x: 100,
    y: 200,
    width: 500,
    height: 600,
    type: 'custom'
  }]);
  snapster.snap({ x: 101, y: 201, width: 300, height: 400 });

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'my-custom-horizontal',
      style: { top: '200px', left: null }
    },
    {
      tagName: 'div',
      className: 'my-custom-vertical',
      style: { left: '100px', top: null }
    }
  ]);

});

it('can take a custom positioner', () => {
  const document: DocumentInterface = {
    createElement(tagName: string) {
      return { tagName, className: '', style: {} };
    }
  };

  const container: ContainerInterface = {
    children: [],

    appendChild(child: ElementInterface) {
      this.children.push(child);
    },

    removeChild(child: ElementInterface) {
      this.children = this.children.filter((existing: ElementInterface) => existing !== child);
    }
  };

  const snapster = new Snapster({
    document,
    container,
    positioner: ({ element, edge }) => {
      element.style[edge.direction === 'horizontal' ? 'top' : 'left'] = `${edge.position * 2}px`;
    }
  });

  snapster.populate([{ x: 100, y: 200, width: 300, height: 400 }]);
  snapster.snap({ x: 101, y: 201, width: 500, height: 600 });

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '400px', left: null, }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '200px', top: null, }
    }
  ]);
});

it('can take a custom reset', () => {
  const document: DocumentInterface = {
    createElement(tagName: string) {
      return { tagName, className: '', style: {} };
    }
  };

  const container: ContainerInterface = {
    children: [],

    appendChild(child: ElementInterface) {
      this.children.push(child);
    },

    removeChild(child: ElementInterface) {
      this.children = this.children.filter((existing: ElementInterface) => existing !== child);
    }
  };

  const snapster = new Snapster({
    document,
    container,
    reset: ({ element }) => {
      element.className += " inactive";
      element.style.top = null;
      element.style.left = null;
    }
  });

  snapster.populate([{ x: 100, y: 200, width: 300, height: 400 }]);
  snapster.snap({ x: 101, y: 201, width: 500, height: 600 });

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal inactive',
      style: { top: '200px', left: null, }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical inactive',
      style: { left: '100px', top: null, }
    }
  ]);
});