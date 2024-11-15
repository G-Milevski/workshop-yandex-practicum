export function withRouter(WrappedBlock) {
  return class extends WrappedBlock {
    constructor(props) {
      super({ ...props, router: window.router });
    }
  }
}