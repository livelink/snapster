# Snapster

Allowing you to create snapping smart guides in your application.

## Installation

```shell
yarn add @livelink/snapster
```

## Usage

Snapster leverages JavaScript's native module system ([known as ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)), so can be used with your favourite front-end build tool.

```javascript
import Snapster from '@livelink/snapster';

// Create an instance.
const box = document.querySelector('.box');
const container = document.querySelector('.page');
const snapster = new Snapster({ document, container });

// Populate the grid.
snapster.populate([
  {
    x: 0,
    y: 0,
    width: container.clientWidth,
    height: container.clientHeight,
    type: 'page'
  },
  {
    x: 100,
    y: 200,
    width: 300,
    height: 400,
    type: 'normal'
  }
]);

// Snap and render.
const position = snapster.snap({
  x: box.offsetLeft,
  y: box.offsetTop,
  width: box.clientWidth,
  height: box.clientHeight
});

// Update your box position.
box.style.left = `${position.x}px`;
box.style.top = `${position.y}px`;

// Clear the guide.
snapster.clear();
```

## Tests

To run the Jest test suite, just run:

```shell
yarn test
```

The test suite will automatically be run by GitHub actions on a push or pull request.

[![Quality](https://github.com/livelink/snapster/actions/workflows/quality.yml/badge.svg)](https://github.com/livelink/snapster/actions/workflows/quality.yml)

## Releases

Releases are automatically handled by GitHub Actions. Just set the correct semantic version number in `package.json`, commit and push changes, create a tag e.g. `v0.9.8`, push the new tag with `git push --tags`, and the rest will happen automatically.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/livelink/snapster. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/livelink/snapster/blob/main/CODE_OF_CONDUCT.md).

## License

The library is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Snapster project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/livelink/snapster/blob/main/CODE_OF_CONDUCT.md).
