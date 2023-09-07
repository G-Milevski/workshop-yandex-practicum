import Block from "../../core/Block";

export class InputField extends Block {
    constructor(props) {
        super({
            ...props,
            onBlur: () => this.validate()
        });
    }
    public value() {
        if (!this.validate()) {
            return false;
          }
        return this.refs.input._element.value
    }

    private validate() {
        const value = this.refs.input._element.value;
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