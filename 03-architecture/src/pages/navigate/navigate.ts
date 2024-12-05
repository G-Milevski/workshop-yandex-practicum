import { Button, ListCat } from "../../components";
import Block from "../../core/block";
import { ROUTER } from "../../constants";
import { withRouter } from "../../utils/withRouter";

class Navigate extends Block {
  constructor(props) {
    super("div", {
      ...props,
      GoHome: new Button({
        color: "link",
        label: "go home",
        onClick: () => props.router.go(ROUTER.login),
      }),
    });
  }
  render(): string {
    return `
      <h1>404</h1>
      {{{GoHome}}}
    `;
  }
}

export default withRouter(Navigate);
