import { FormLogin, FormWrapper, Input } from "../../components"
import Block from "../../core/Block"

export default class LoginPage extends Block {

    constructor(props) {
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
        })
    }



    render() {
        return `
            <div class="container">
                {{{ FormLogin }}}
            </div>
        `
    }
}