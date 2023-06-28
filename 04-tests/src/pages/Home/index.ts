import Block from "../../core/Block";
import template from "./home.hbs";
import catAvatar from './cat2.webp';
import { Button } from "../../components/Button";
import { logout } from "../../services/auth";
import { withStore } from "../../utils/withStore";
import { withRouter } from "../../utils/withRouter";
import { Link } from "../../components/Link";

interface HomePageProps {
  userName?: string;
  goToDescription: () => void
}

class HomePage extends Block {
  constructor(props: HomePageProps) {
    super(props);
  }

  init() {
    this.children.logoutButton = new Button({
      label: "logout",
      events: {
        click: (evt: PointerEvent) => {
          evt.preventDefault();
          window.store.dispatch(logout)
      },
    }});
    this.children.linkButton = new Link({
      label: 'go to more info',
      events: {
        click: (evt) => {
          evt.preventDefault();
          this.props.router.go('/description')
        }
      }
    })
  }

  render() {
    console.log(this.props.routerParams)
    return this.compile(template, {...this.props, avatar: catAvatar});
  }
}


export default withRouter(withStore(HomePage))