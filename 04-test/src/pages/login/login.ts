import { connect } from "../../utils/connect";
import { Button, Input } from "../../components";
import Block from "../../core/block";
import * as authServices from "../../services/auth";

class LoginPage extends Block {
  constructor(props) {
    super("div", {
      ...props,
      formState: {
        login: "",
        password: "",
      },
      errors: {
        login: "",
        password: "",
      },
      className: "container",
      InputLogin: new Input({
        label: "Login",
        onChange: (e) => {
          console.log("test");
          const value = e.target.value;
          let error = "";
          if (value === "error") {
            error = "Some error is happened.";
          }
          if (value.length < 3) {
            error = "More 3 characters.";
          }
          this.children.InputLogin.setProps({
            error,
          });

          // this.setProps({
          //   formState: {
          //     ...this.props.formState,
          //     login: value,
          //   },
          // });
        },
      }),
      InputPassword: new Input({
        label: "Password",
        onChange: (e) => {
          console.log("test");
          const value = e.target.value;
          let error = "";
          if (value === "error") {
            error = "Some error is happened.";
          }
          if (value.length < 3) {
            error = "More 3 characters.";
          }
          this.children.InputLogin.setProps({
            error,
          });

          // this.setProps({
          //   formState: {
          //     ...this.props.formState,
          //     login: value,
          //   },
          // });
        },
      }),
      SignInButton: new Button({ label: "Sign in", color: "primary" }),
      SignUpButton: new Button({
        label: "Sign up",
        color: "link",
        onClick: (e) => {
          e.preventDefault();
          const data = {
            login: this.children.InputLogin.value(),
            password: this.children.InputPassword.value(),
          };

          console.log(data);
          authServices.login(data);
        },
      }),
    });
  }
  public render(): string {
    return `
    {{#if isLoading}}
        <h1>spinner</h1>
    {{/if}}
      <form class="login-form">
          {{{ InputLogin }}}
          {{{ InputPassword }}}
          {{#if loginError}}
              <p>{{loginError}}</p>
          {{/if}}
          {{{ SignInButton }}}
          {{{ SignUpButton }}}
      </form>
    `;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    loginError: state.loginError,
  };
};

export default connect(mapStateToProps)(LoginPage);
