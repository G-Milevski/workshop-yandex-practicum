import { ErrorLine, InputField } from "../../components";
import Block from "../../core/Block";
import { navigate } from "../../core/navigate";
import { signin } from "../../services/auth";
import * as validators from '../../utils/validators';

interface Props {
    validate: {
        login: (value: string) => boolean | string
    },
    onLogin: (e: Event) => void,
    onRegistration: (e: Event) => void
    events?: {},
    error: string | null
}

type Refs = {
    login: InputField,
    password: InputField,
    error: ErrorLine
}

class LoginPage extends Block<Props, Refs> {
    constructor() {
        super({
            error: null,
            validate: {
                login: validators.login
            },
            onLogin: (event) => {
                event.preventDefault();
                const login =  this.refs.login.value();
                const password =  this.refs.password.value();

                if(!login) {
                    return;
                }
                if(!password) {
                    return;
                }

                signin({
                    login,
                    password
                }).catch(error => this.refs.error.setProps({error}))

            },
            onRegistration: () => {
                navigate('registration')
            }
        });
    }
    protected render(): string {
        return(`
            <div class="container">
                <form class="login-form">
                    {{{ InputField label="Login" ref="login" validate=validate.login }}}
                    {{{ InputField label="Password" ref="password" }}}
                    {{{ Button label="Sign in" type="primary" onClick=onLogin }}}
                    {{{ Button label="Sign up" type="link" onClick=onRegistration }}}
                    {{{ ErrorLine error=error ref="error"}}}
                </form>
            </div>
        `)
    }
}

export default LoginPage

