import Block from "../../core/Block"
import { Button } from "../button"
import { Input } from "../input"

export default class FormLogin extends Block {
    init() {
        const onChangeLoginBind = this.onChangeLogin.bind(this);
        const onLoginBind = this.onLogin.bind(this);


        const InputLogin = new Input({label: 'Логин', onBlur: onChangeLoginBind});
        const FormPassword = new Input({label: 'Пароль'});
        const ButtonLogin = new Button({label: 'Авторизироваться', type: 'primary', onClick: onLoginBind});
        const ButtonCreateAccount = new Button({label: 'Нет аккаунта?', type: 'link'});

        this.children = {
            ...this.children,
            InputLogin,
            FormPassword,
            ButtonLogin,
            ButtonCreateAccount
        }
    }


    onChangeLogin(e) {
        const inputValue = e.target.value;
        if(inputValue === 'error') {
            this.children.InputLogin.setProps({error: true, errorText: 'some error'});
            return;
        } else {
            this.children.InputLogin.setProps({error: false, errorText: null})
        }

        // this.setProps({login: inputValue})
    }

    onLogin() {
        console.log({
            login: this.props.login
        })
    }



    render() {
        return (`
            <div>
                <div class="form-content">
                    {{{ InputLogin }}}
                    {{{ FormPassword }}}
                </div>
                {{{ ButtonLogin }}}
                {{{ ButtonCreateAccount }}}
            </div>
        `)
    }
}