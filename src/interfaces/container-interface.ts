import ElementInterface from "./element-interface";
export default interface ContainerInterface {
  children: ElementInterface[];
  appendChild: (child: ElementInterface) => void;
  removeChild: (child: ElementInterface) => void;
}