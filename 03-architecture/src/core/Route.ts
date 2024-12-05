import { RouteInterface } from "./Router";

class Route implements RouteInterface {
  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      // this._block.hide();
    }
  }

  match(pathname) {
    return pathname === this._pathname;
  }

  _renderDom(query, block) {
    const root = document.querySelector(query);
    root.innerHTML = "";
    root.append(block.getContent());
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
    }

    // this._block.show();
    this._renderDom(this._props.rootQuery, this._block);
    this._block.componentDidMount();
  }
}

export default Route;
