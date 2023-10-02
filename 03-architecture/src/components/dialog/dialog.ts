import Block from "../../core/Block";

interface Props {
    open: boolean
}
type Refs = {}

export class Dialog extends Block<Props, Refs> {
    protected render(): string {
        return `<dialog class="dialog" {{#if open}}open{{/if}} ></dialog>`
    }
}
