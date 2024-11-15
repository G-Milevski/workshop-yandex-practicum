import Block from "../../core/block";

export default class RemoveCatDialog extends Block {
  constructor(props) {
    super("div", {
      ...props,
    });
  }
  render(): string {
    return `
    {{{ Dialog
      title="Удаление"
      labelOk="Удаление"
      body="Вы точно хотите удалить котика ?"
      onOk=onClick
    }}}`;
  }
}
