import ElementInterface from "./element-interface";
export default interface DocumentInterface {
  createElement: (tagName: string) => ElementInterface;
}