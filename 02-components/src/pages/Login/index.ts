import { Button } from "../../components/Button";
import { Input, InputProps } from "../../components/input/input";
import Block from "../../utils/Block";
import template from "./login.hbs";

interface ILogin {
  inputs: InputProps[];
}

export class Login extends Block {
  constructor(props: ILogin) {
    super(props);
  }

  protected init(): void {
    this.children.fields = this.props.inputs.map((props) => new Input(props));

    this.children.inputLogin = new Input({
      type: "text",
      events: {
        change: (evt) => {
          const value = evt.target.value;
          this.children.inputLogin.setProps({ value });
        },
      },
      label: "login",
      value: this.props.login,
    });
    this.children.inputPassword = new Input({
      type: "password",
      events: {
        change: (evt) => {
          const value = evt.target.value;
        },
      },
      label: "password",
      value: "",
    });
    this.children.button = new Button({
      label: "Click me",
      events: {
        click: (evt: PointerEvent) => {
          evt.preventDefault();
          const login = (
            this.children.inputLogin.element
              ?.firstElementChild as HTMLInputElement
          ).value;
          if (login.length < 3) {
            this.children.inputLogin.setProps({ error: "some error" });
          } else {
            this.children.inputLogin.setProps({ error: "" });
          }
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
