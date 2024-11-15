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
      onChangeLogin: (e) => {
        const value = e.target.value;
        const error = value === "error" ? "Some error is happened." : "";

        this.setProps({
          formState: {
            ...this.props.formState,
            login: value,
          },
          errors: {
            ...this.props.errors,
            login: error,
          },
        });
      },
      onSubmit: () => console.log(this.props.formState),
    });
  }

  public render(): string {
    return `
      <form class="login-form">
          {{{ InputField label="Login" error=errors.login onChange=onChangeLogin value=formState.login }}}
          {{{ InputField label="password" }}}
          {{{ Button onClick=onSubmit label="Sign in" color="primary"  }}}
          {{{ Button onClick=onSubmit label="Sign up" color="link"  }}}
      </form>
    `;
  }
}
