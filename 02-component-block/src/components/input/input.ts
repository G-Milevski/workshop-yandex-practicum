import Block from "../../core/Block";

class Input extends Block {
    constructor(props) {
        super(props)
    }

    render(): string {
        return `
            <input
                class="input__element"
                placeholder=""
            />
        `
    }
}

export default Input;