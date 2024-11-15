import Block from "../../core/Block";
import { connect } from "../../utils/connect";

class ListCard extends Block {
    constructor(props) {
        super({
            ...props,
            showEmpty: props.cards.length === 0,
            events: {
                click: props.onClick
            }
        })
    }

    render(): string {
        console.log(this.props.cards)
        return `
        <div>
            {{#if showEmpty}}
                <h2>котиков нет (</h2>
            {{/if}}
            <ul>
                {{{cards}}}
            </ul>
        </div>
        `
    }
}

export default connect(({isLoading}) => ({isLoading}))(ListCard);