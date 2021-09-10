import ElementInterface from './element-interface';

export default interface PopulateInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  setup?: (element: ElementInterface) => void;
}
