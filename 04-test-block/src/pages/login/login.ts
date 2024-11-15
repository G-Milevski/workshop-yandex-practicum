import { FormLogin, FormWrapper, Input } from "../../components"
import Block from "../../core/Block"
import { login } from "../../services/auth";
import { connect } from "../../utils/connect";

class LoginPage extends Block {
    constructor(props) {
        super({
            ...props,
            FormLogin: new FormWrapper({
                title: 'Вход',
                formBody: new FormLogin({}),
                onSubmit: (e) => {
                    e.preventDefault();
                    login({login: this.props.loginField, password: ''})
                }
            }),
        })
    }

    render() {
        return `
            <div class="container">
                {{#if isLoading}}
                    <h2>SPINER</h2>
                {{else}}
                    {{{ FormLogin }}}
                    {{#if loginError}}
                        <p>{{{loginError}}}</p>
                    {{/if}}
                {{/if}}
            </div>
        `
    }
}


const mapStateToPropsShort = ({loginField, isLoading, loginError}) => ({loginField, isLoading, loginError})

export default connect(mapStateToPropsShort)(LoginPage)