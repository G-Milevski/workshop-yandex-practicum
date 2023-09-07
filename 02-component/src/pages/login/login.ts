import Block from "../../core/Block";

export class LoginPage extends Block {
    constructor() {
        super({
            validate: {
                login: (value: string) => value.length < 3 && value.length !== 0 ? `Length of login should not be less 3 letters.` : ''
            },
            onLogin: (event) => {
                event.preventDefault();
                const login =  this.refs.login.value();
                const password =  this.refs.password.value();

                console.log({
                    login,
                    password
                })
            }
        });
    }

    protected render(): string {
        return(`
            <div class="container">
                {{#> FormAuth}}
                    {{{ InputField label="Login" ref="login" validate=validate.login }}}
                    {{{ InputField label="Password" ref="password" }}}
                    {{{ Button label="Sign in" type="primary" page="list" onClick=onLogin }}}
                    {{{ Button label="Sign up" type="link" }}}
                {{/FormAuth}}
            </div>
        `)
    }
}