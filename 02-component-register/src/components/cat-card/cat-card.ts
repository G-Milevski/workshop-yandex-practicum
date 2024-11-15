import { IconButton } from "../icon-button";
import Block from "../../core/block";

export default class CatCard extends Block {
  constructor(props) {
    super("div", {
      ...props,
      events: {
        click: () => props.onClick(props.index),
      },
      RemoveButton: new IconButton({
        kind: "trash",
        onClick: props.onRemove,
      }),
    });
  }
  render(): string {
    const { currentIndex, index } = this.props;

    return `
      <div class="card {{#if ${currentIndex === index}}}card_active{{/if}}">
          {{{ RemoveButton }}}
          <img class="card__avatar" src="{{avatar}}" height="200px" width="200px" />
          <p>Hi. I'm {{ name }} </p>
      </div>
    `;
  }
}
