import Block from "../../core/Block";
import template from "./button.hbs";

interface ButtonProps {
  label: string;
  events: {
    click: (evt: PointerEvent) => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
