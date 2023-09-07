import Block from "../../core/Block";

interface IProps {
    type: 'primary' | 'link',
    label: string,
    page: string,
    onClick: () => void
}

export class Button extends Block {
    constructor(props: IProps) {
        super(props);
        this.props.events = {
            click: this.props.onClick || (() => {})
        }
    }

    protected render(): string {
        const { type, label, page } = this.props;
        return (`
            <button type="button" class="button button__${type}" ${page ? `page="${page}"` : ''}>
                ${label}
            </button>
        `)
    }
}