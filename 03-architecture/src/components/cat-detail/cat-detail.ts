import Block from "../../core/block";

export default class CatDetail extends Block {
  constructor(props) {
    super("div", {
      ...props,
    });
  }
  render(): string {
    return `
      <h1> cat {{name}}</h1>
    `;
  }
}
