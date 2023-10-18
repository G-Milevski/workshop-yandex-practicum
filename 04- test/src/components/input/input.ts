import Block from "../../core/Block";

interface IProps {
    classes: string,
    placeholder: string,
    onBlur: () => void,
    events: {
        blur: () => void;
    }
}

type Ref = {
    input: HTMLInputElement
}

export class Input extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                blur: props.onBlur
            }
        })
    }

    public value() {
        return this.refs.input.value;
    }

    protected render(): string {
        const { classes, placeholder} = this.props;
        return (`
            <input
                class="${classes}"
                placeholder="${placeholder || ''}"
                ref="input"
            />
        `)
    }
}