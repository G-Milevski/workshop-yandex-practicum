import { FormLogin, FormWrapper, Input } from "../../components"
import Block from "../../core/Block"

export default class LoginPage extends Block {
    constructor(props) {
        const inputComponents = props.inputs.reduce((acc, data) => {
            const component = new Input({label: data});
            acc[component._id] = component;
            return acc;
        }, {});


        super({
            ...props,
            FormLogin: new FormWrapper({
                title: 'Вход',
                formBody: new FormLogin({}),
                onSubmit: (e) => {
                    e.preventDefault();
                    console.log('submit')
                }
            }),
            inputComponentKeys: Object.keys(inputComponents),
            ...inputComponents
        })
    }

    render() {
        return `
            <div class="container">
                {{{ FormLogin }}}
                ${this.props.inputComponentKeys.map((key) => `{{{ ${key} }}}`).join('')}
            </div>
        `
    }
}