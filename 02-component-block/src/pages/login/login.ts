import { Button, Input } from "../../components";
import Block from "../../core/block";

export default class LoginPage extends Block {
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
          console.log('test')
          const value = e.target.value;
          let error = '';
          if(value === "error") {
            error = "Some error is happened."
          }
          if(value.length < 3) {
            error = "More 3 characters."
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
      InputPassword: new Input({ label: "Password" }),
      SignInButton: new Button({ label: "Sign in", color: "primary" }),
      SignUpButton: new Button({
        label: "Sign up",
        color: "link",
        onClick: (e) => {
          e.preventDefault();
          console.log(this.children.InputLogin.value())
          // let error = ''
          // if(this.props.formState.login === "error") {
          //   error = "Some error is happened."
          // }
          // if(this.props.formState.login.length < 3) {
          //   error = "More 3 characters."
          // }

          // this.children.InputLogin.setProps({
          //   error,
          // });
        },
      }),
    });
  }
  public render(): string {
    return `
      <form class="login-form">
          {{{ InputLogin }}}
          {{{ InputPassword }}}
          {{{ SignInButton }}}
          {{{ SignUpButton }}}
      </form>
    `;
  }
}
