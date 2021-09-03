import Guides from '../dist/guides';

test('can draw guides', () => {
  const document = {
    createElement(tagName) {
      return { tagName, style: {} };
    }
  };

  const body = {
    children: [],
    appendChild(child) {
      this.children.push(child);
    },
    removeChild(child) {
      this.children.filter(existing => existing === child );
    }
  };

  const guides = new Guides({ document, container: body });

  guides.draw({
    horizontals: [100, 200],
    verticals: [300, 400]
  });

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
  const document = {
    createElement(tagName) {
      return { tagName, style: {} };
    }
  };

  const body = {
    children: [],
    appendChild(child) {
      this.children.push(child);
    },
    removeChild(child) {
      this.children = this.children.filter(item => item !== child );
    }
  };

  const guides = new Guides({ document, container: body });

  guides.draw({
    horizontals: [100, 200],
    verticals: [300, 400]
  });

  guides.draw({
    horizontals: [100],
    verticals: [300]
  });

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