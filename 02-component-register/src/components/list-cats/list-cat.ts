import Block from "../../core/block";

export default class ListCat extends Block {
  constructor(props) {
    super("ul", {
      ...props,
      activeCatIndex: -1,
      onOkRemoveCat: () => this.setProps({ showDialog: false }),
      onRemoveCat: () => {
        this.setProps({ showDialog: true });
      },
      onSetActiveCat: (catIndex) => {
        this.setProps({ activeCatIndex: catIndex });
      },
    });
  }

  render() {
    return `
      {{#each cats}}
        {{{ CatCard
          avatar=this.avatar
          name=this.name
          index=@index
          onClick=../onSetActiveCat
          currentIndex=../activeCatIndex
          onRemove=../onRemoveCat
        }}}
      {{/each}}
      {{#if showDialog}}
          {{{ RemoveCatDialog onClick=onOkRemoveCat }}}
      {{/if}}
      `;
  }
}
