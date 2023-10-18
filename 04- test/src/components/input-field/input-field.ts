import { ErrorLine, Input } from "..";
import Block from "../../core/Block";

interface Props {
    label: string,
    error: string,
    onBlur: () => void;
    validate?: (value: string) => false | string
}

type Ref = {
    input: Input,
    errorLine: ErrorLine
}

export class InputField extends Block<Props, Ref> {
    constructor(props: Props) {
        super({
            ...props,
            onBlur: () => this.validate()
        });
    }
    public value() {
        if (!this.validate()) {
            return null;
        }
        return this.refs.input.value()
    }

    private validate() {
        const value = this.refs.input.value();
        const error = this.props.validate?.(value);
        if (error) {
            this.refs.errorLine.setProps({ error });
            return false;
        }
        this.refs.errorLine.setProps({ error: undefined });
        return true;
    }

    protected render(): string {
        return (`
            <div class="input {{#if error}}input__error{{/if}}" >
                <label class="input__container">
                    {{{ Input
                        classes="input__element"
                        ref="input"
                        onBlur=onBlur
                    }}}
                    <div class="input__label">{{label}}</div>
                </label>
                {{{ ErrorLine error=error ref="errorLine"}}}
            </div>
        `)
    }
}