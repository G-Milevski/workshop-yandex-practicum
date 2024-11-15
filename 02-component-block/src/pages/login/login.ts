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
          const value = e.target.value;
          const error = value === "error" ? "Some error is happened." : "";
          this.children.InputLogin.setProps({
            error,
          });
          if (!error) {
            return;
          }

          this.setProps({
            formState: {
              ...this.props.formState,
              login: value,
            },
          });
        },
      }),
      InputPassword: new Input({ label: "Password" }),
      SignInButton: new Button({ label: "Sign in", color: "primary" }),
      SignUpButton: new Button({
        label: "Sign up",
        color: "link",
        onClick: () => console.log(this.props.formState),
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
