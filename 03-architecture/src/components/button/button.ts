import Block from "../../core/Block";

interface IProps {
    type: 'primary' | 'link',
    label: string,
    onClick: (e: Event) => void,
    events: {
        click: (e: Event) => void
    }
}

type Ref = {}

export class Button extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events:{
                click: (e) => {
                    if(props.onClick) {
                        props.onClick(e)
                    }
                }
            }
        });
    }

    protected render(): string {
        return (`
            <button type="button" class="button button__{{type}}">
                {{label}}
            </button>
        `)
    }
}