import Block from "../../core/Block";

class Button extends Block {
    constructor(props) {
        super({
            ...props,
            events: {
                click: props.onClick
            }
        })
    }

    render(): string {
        return `
            <button class="button button__{{type}}" >
                {{label}}
            </button>
    
        `
    }
}

export default Button;