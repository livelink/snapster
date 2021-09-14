import Renderer from '../src/renderer';
import Edge from '../src/edge';

import ElementInterface from '../src/interfaces/element-interface';
import ContainerInterface from '../src/interfaces/container-interface';
import DocumentInterface from '../src/interfaces/document-interface';

test('can draw guides', () => {
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

  const renderer = new Renderer({
    document,
    container: body
  });

  renderer.draw([
    new Edge({ direction: 'horizontal', position: 100 }),
    new Edge({ direction: 'horizontal', position: 200 }),
    new Edge({ direction: 'vertical', position: 300 }),
    new Edge({ direction: 'vertical', position: 400 })
  ]);

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: {
        top: '100px',
        left: null,
      }
    },
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: {
        top: '200px',
        left: null,
      }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: {
        left: '300px',
        top: null,
      }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: {
        left: '400px',
        top: null,
      }
    }
  ]);
});

test('can have custom positioning guides', () => {
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

  const renderer = new Renderer({
    document,
    container: body,
    positioner: options => {
      const { element, edge } = options;
      const position = edge.position * 0.3;

      element.style[edge.direction === 'horizontal' ? 'top' : 'left'] = `${position}px`;
    }
  });

  renderer.draw([
    new Edge({ direction: 'horizontal', position: 100 }),
    new Edge({ direction: 'horizontal', position: 200 }),
    new Edge({ direction: 'vertical', position: 300 }),
    new Edge({ direction: 'vertical', position: 455 })
  ]);

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: {
        top: '30px',
        left: null,
      }
    },
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: {
        top: '60px',
        left: null,
      }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: {
        left: '90px',
        top: null,
      }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: {
        left: '136.5px',
        top: null,
      }
    }
  ]);
});

it('adds edges with defaut classes', () => {
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
      this.children = this.children.filter((existing: ElementInterface) => existing !== child);
    }
  };

  const renderer = new Renderer({ document, container: body });

  renderer.draw([
    new Edge({ direction: 'horizontal', position: 100 }),
    new Edge({ direction: 'vertical', position: 300 }),
  ]);

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: { top: '100px', left: null, }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: { left: '300px', top: null, }
    }
  ]);
})

it('adds edge type when supplied by default', () => {
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
      this.children = this.children.filter((existing: ElementInterface) => existing !== child);
    }
  };

  const renderer = new Renderer({ document, container: body });

  renderer.draw([
    new Edge({ direction: 'horizontal', position: 100, type: 'page' }),
    new Edge({ direction: 'vertical', position: 300, type: 'normal' }),
  ]);

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal guide--page',
      style: { top: '100px', left: null, }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical guide--normal',
      style: { left: '300px', top: null, }
    }
  ]);
})

test('can remove unused guides', () => {
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
      this.children = this.children.filter((existing: ElementInterface) => existing !== child);
    }
  };

  const renderer = new Renderer({
    document,
    container: body
  });

  renderer.draw([
    new Edge({ direction: 'horizontal', position: 100 }),
    new Edge({ direction: 'horizontal', position: 200 }),
    new Edge({ direction: 'vertical', position: 300 }),
    new Edge({ direction: 'vertical', position: 400 })
  ]);

  renderer.draw([
    new Edge({ direction: 'horizontal', position: 100 }),
    new Edge({ direction: 'vertical', position: 300 })
  ]);

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'guide guide--horizontal',
      style: {
        top: '100px',
        left: null,
      }
    },
    {
      tagName: 'div',
      className: 'guide guide--vertical',
      style: {
        left: '300px',
        top: null,
      }
    },
  ]);
});

it('can take a custom setup', () => {
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
      this.children = this.children.filter((existing: ElementInterface) => existing !== child);
    }
  };

  const renderer = new Renderer({
    document,
    container: body,
    setup: ({ element, edge }) => element.className = `my-${edge.type}-${edge.direction}`
  });

  renderer.draw([
    new Edge({ direction: 'horizontal', position: 100, type: 'page' }),
    new Edge({ direction: 'vertical', position: 300, type: 'normal' }),
  ]);

  expect(body.children).toEqual([
    {
      tagName: 'div',
      className: 'my-page-horizontal',
      style: { top: '100px', left: null, }
    },
    {
      tagName: 'div',
      className: 'my-normal-vertical',
      style: { left: '300px', top: null, }
    }
  ]);
});