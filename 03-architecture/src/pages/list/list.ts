import { Button, ListCat } from "../../components";
import Block from "../../core/block";
import { protectedRoute } from "../../utils/protectedRoute";
import { withRouter } from "../../utils/withRouter";
import catsMock from "./mockCats";

class ListPage extends Block {
  constructor(props) {
    super("div", {
      ...props,
      GoHomeButton: new Button({
        label: "go to home",
        color: "link",
      }),
      ListCat: new ListCat({ cats: catsMock }),
    });
  }
  render(): string {
    return `
      {{{ GoHomeButton }}}
      {{{ ListCat }}}
    `;
  }
}

export default withRouter(protectedRoute(ListPage));
