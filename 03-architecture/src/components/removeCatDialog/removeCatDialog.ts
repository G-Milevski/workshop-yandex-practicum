import { Dialog } from "../index";
import Block from "../../core/block";

class DialogBody extends Block {
  constructor() {
    super("p", {
      className: "remove-text",
    });
  }

  render(): string {
    return `Вы точно хотите удалить котика ?`;
  }
}

export default class RemoveCatDialog extends Block {
  constructor(props) {
    super("div", {
      ...props,
      Dialog: new Dialog({
        title: "Удаление",
        labelOk: "Удалить",
        onOk: props.onOk,
        Body: new DialogBody(),
      }),
    });
  }
  render(): string {
    return `{{{ Dialog }}}`;
  }
}
