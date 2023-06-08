import { Button } from "../../components/Button";
import { Input, InputProps } from "../../components/input/input";
import Block from "../../core/Block";
import template from "./login.hbs";

import {login} from '../../services/auth'

interface ILogin {
  inputs: InputProps[];
}

export class Login extends Block {
  constructor(props: ILogin) {
    super(props);
  }

  protected init(): void {
    this.children.inputLogin = new Input({
      type: "text",
      events: {
        change: (evt) => {
          const value = evt.target.value;
          this.children.inputLogin.setProps({ value });
        },
      },
      label: "Login",
    });
    this.children.inputPassword = new Input({
      type: "password",
      events: {
        change: (evt) => {
          const value = evt.target.value;
          this.children.inputPassword.setProps({ value });
        },
      },
      label: "Password",
    });
    this.children.button = new Button({
      label: "Click me",
      events: {
        click: (evt: PointerEvent) => {
          evt.preventDefault();
          const loginElement: HTMLInputElement = this.children.inputLogin.element?.querySelector('.input__control')!;
          const passwordElement: HTMLInputElement = this.children.inputPassword.element?.querySelector('.input__control')!;
          const loginValue = loginElement.value;
          const passwordValue = passwordElement.value;
          if(passwordValue === '') {
            this.children.inputPassword.setProps({ error: "Field can't be empty" });
          } else {
            this.children.inputPassword.setProps({ error: "" });
          }
          if(loginValue === '') {
            this.children.inputLogin.setProps({ error: "Field can't be empty" });
          } else {
            this.children.inputLogin.setProps({ error: "" });
          }

          console.log({
            login: loginValue,
            password: passwordValue
          })

          window.store.dispatch(login, {
            login: loginValue,
            password: passwordValue
          })
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
