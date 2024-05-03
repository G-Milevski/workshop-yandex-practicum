import Block from "../../core/Block";
import { setActiveCatCard } from "../../services/cats";
import { connect } from "../../utils/connect";

class CatCard extends Block {
    constructor(props) {
        super({
            ...props,
            active: props.activeId === props.id,
            events: {
                click: () => {
                    const card = {
                        name: props.name,
                        avatar: props.avatar,
                        id: props.id
                    }
                    setActiveCatCard(card)
                    props?.click(card)
                }
            }
        })
    }

    render(): string {
        const isActive = this.props.selectedCard?.id === this.props.id
        return `
        <div class="card {{#if ${isActive}}}card_active{{/if}}">
            <p>Hi. I'm {{ name }} </p>
            <img src="{{avatar}}" height="200px" width="200px" />
        </div>
        `
    }
}

export default connect(({selectedCard}) => ({selectedCard}))(CatCard);