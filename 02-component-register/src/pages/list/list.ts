import { Button, ListCat } from "../../components";
import Block from "../../core/block";
import catsMock from "./mockCats";

export default class ListPage extends Block {
  constructor(props) {
    super("div", {
      ...props,
      GoHomeButton: new Button({
        label: "go to home",
        color: "link",
      }),
      catsMock: catsMock,
    });
  }
  render(): string {
    return `
      {{{ GoHomeButton }}}
      {{{ ListCat cats=catsMock }}}
    `;
  }
}
