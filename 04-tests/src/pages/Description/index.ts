import Block from "../../core/Block";
import template from "./Description.hbs";
import { withStore } from "../../utils/withStore";
import { withRouter } from "../../utils/withRouter";

interface DescriptionPageProps {}

class DescriptionPage extends Block {
  constructor(props: DescriptionPageProps) {
    super(props);
  }

  init() {}

  render() {
    return this.compile(template, {...this.props});
  }
}


export default withStore(DescriptionPage);