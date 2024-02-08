import Block from "../../core/Block";
interface Props {
    error: string
}
type Ref = {}


export class ErrorLine extends Block<Props, Ref> {
    protected render(): string {
        return (`
            <div class="input__text-error">{{error}}</div>
        `)
    }
}
