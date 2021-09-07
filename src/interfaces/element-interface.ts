export default interface ElementInterface {
  tagName: string;
  className: string;
  style: {
    top?: string,
    right?: string,
    bottom?: string,
    left?: string,
  };
}
