import { CreateUser } from "../../api/type";
import { ErrorLine, InputField } from "../../components";
import Block from "../../core/Block";
import { signup } from "../../services/auth";

interface Props {}

type Refs = {
    firstName: InputField,
    secondName: InputField,
    email: InputField,
    login: InputField,
    phone: InputField,
    password: InputField,
    errorLine: ErrorLine
}

export class RegistrationPage extends Block<Props, Refs> {
    constructor(props: Props) {
        super({
            ...props,
            onRegistration: () => {
                const newUser: CreateUser = {
                    login: this.refs.login.value()!,
                    first_name: this.refs.firstName.value()!,
                    second_name: this.refs.secondName.value()!,
                    email: this.refs.email.value()!,
                    phone: this.refs.phone.value()!,
                    password: this.refs.password.value()!,
                };

                signup(newUser).catch(error => this.refs.errorLine.setProps({error}))
            }
        })
    }

    protected render(): string {
        return `
            <div class="container">
                <form class="login-form">
                    {{{ InputField label="Имя" ref="firstName" }}}
                    {{{ InputField label="Фамилия" ref="secondName" }}}
                    {{{ InputField label="Эл. почта" ref="email" }}}
                    {{{ InputField label="Логин" ref="login" }}}
                    {{{ InputField label="Телефон" ref="phone" }}}
                    {{{ InputField label="Пароль" ref="password" }}}
                    {{{ ErrorLine ref="errorLine" }}}
                    {{{ Button label="Sign in" type="primary" page="list" onClick=onRegistration }}}
                </form>
            </div>
        `
    }
}