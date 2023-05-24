import Block from "../../utils/Block";
import template from "./input.hbs";

export interface InputProps {
  label: string;
  type: string;
  value: string;
  error?: string;
  events: {
    change: (evt) => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    console.log(this.props);
    return this.compile(template, this.props);
  }
}
