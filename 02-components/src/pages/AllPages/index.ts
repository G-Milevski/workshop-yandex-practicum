import template from "./allPages.hbs";
import Block from "../../utils/Block";

type link = {
  link: string;
  label: string;
};

interface AllPagesProps {
  pages: link[];
}

export class AllPages extends Block {
  constructor(props: AllPagesProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
