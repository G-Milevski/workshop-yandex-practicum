import Block from "../../core/Block";

interface IProps {
    classes: string,
    placeholder: string,
}

export class Input extends Block {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                blur: props.onBlur || (() => {})
            }
        })
    }

    protected render(): string {
        const { classes, placeholder } = this.props;
        return (`
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                ref="input"
            />
        `)
    }
}