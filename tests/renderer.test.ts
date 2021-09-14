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

  const guides = new Renderer({
    document,
    container: body,
    setup: (element, edge) => element.className = `guide guide--${edge.direction}`
  });

  guides.draw([
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

  const guides = new Renderer({
    document,
    container: body,
    setup: (element, edge) => element.className = `guide guide--${edge.direction}`
  });

  guides.draw([
    new Edge({ direction: 'horizontal', position: 100 }),
    new Edge({ direction: 'horizontal', position: 200 }),
    new Edge({ direction: 'vertical', position: 300 }),
    new Edge({ direction: 'vertical', position: 400 })
  ]);

  guides.draw([
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