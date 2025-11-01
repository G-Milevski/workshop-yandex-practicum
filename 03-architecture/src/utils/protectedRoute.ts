import { connect } from "./connect";

export function protectedRoute(WrappedBlock) {
  class Protected extends WrappedBlock {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      if (!this.props.user) {
        this.props.router.go("/login");
      }
    }
  }

  return connect(({ user }) => ({ user }))(Protected);
}
