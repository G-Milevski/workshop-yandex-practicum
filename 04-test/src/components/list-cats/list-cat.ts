import { CatCard } from "../cat-card";
import { RemoveCatDialog } from "../removeCatDialog";
import Block from "../../core/block";
import { CatDetail } from "../../components/cat-detail";

export default class ListCat extends Block {
  constructor(props) {
    super("ul", {
      ...props,
      activeCatIndex: -1,
      RemoveCatDialog: new RemoveCatDialog({
        onOk: () => this.setProps({ showDialog: false }),
      }),
      CatDetail: new CatDetail({}),
      rawCats: [...props.cats],
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
    const { cats, CatDetail } = this.children;

    cats.forEach((cat, index) => {
      if (index === activeCatIndex) {
        cat.setProps({ active: true });
        return;
      }

      if (cat.props.active) {
        cat.setProps({ active: false });
      }
    });

    const currentCat = this.props.rawCats[activeCatIndex];
    CatDetail.setProps({name: currentCat?.name})

    return `
      {{#each cats}}
        {{{ this }}}
      {{/each}}
      {{#if showDialog}}
          {{{ RemoveCatDialog }}}
      {{/if}}

      {{#if ${activeCatIndex === -1}}}
        <h1>Empty</h1>
      {{/if}}

      {{#if ${activeCatIndex !== -1}}}
        {{{CatDetail}}}
      {{/if}}
      `;
  }
}
