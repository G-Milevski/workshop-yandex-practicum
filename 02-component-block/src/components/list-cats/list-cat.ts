import { CatCard } from "../cat-card";
import { RemoveCatDialog } from "../removeCatDialog";
import Block from "../../core/block";

export default class ListCat extends Block {
  constructor(props) {
    super("ul", {
      ...props,
      activeCatIndex: -1,
      RemoveCatDialog: new RemoveCatDialog({
        onOk: () => this.setProps({ showDialog: false }),
      }),
      cats: props.cats.map(
        (props, index) =>
          new CatCard({
            ...props,
            onClick: () => {
              this.setProps({ activeCatIndex: index });
            },
            onRemove: (cat) => {
              this.setProps({ showDialog: true });
            },
          }),
      ),
    });
  }

  render() {
    const { activeCatIndex } = this.props;
    const { cats } = this.children;

    cats.forEach((cat, index) => {
      if (index === activeCatIndex) {
        cat.setProps({ active: true });
        return;
      }

      if (cat.props.active) {
        cat.setProps({ active: false });
      }
    });

    return `
      {{#each cats}}
        {{{ this }}}
      {{/each}}
      {{#if showDialog}}
          {{{ RemoveCatDialog }}}
      {{/if}}
      `;
  }
}
