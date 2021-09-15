export default interface ElementInterface {
  tagName: string;
  className: string;
  style: {
    top?: string | null,
    right?: string | null,
    bottom?: string | null,
    left?: string | null,
  };
}
