import Block from "../../utils/Block";
import template from "./home.hbs";
import catAvatar from './cat2.webp';

interface HomePageProps {
  userName?: string;
}

export class HomePage extends Block {
  constructor(props: HomePageProps) {
    super(props);
  }

  init() {}

  render() {
    return this.compile(template, {...this.props, avatar: catAvatar});
  }
}
