import Block from "../../core/Block";
import template from './template.hbs'

export interface LinkProps {
  label: string;
  events: {
    click: (evt: any) => void;
  };
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
