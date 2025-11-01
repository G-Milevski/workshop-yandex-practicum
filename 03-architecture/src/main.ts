import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";

import { ROUTER } from "./constants";
import Router from "./core/Router";
import { Store, StoreEvents } from "./core/Store";

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

window.store = new Store({
  isLoading: false,
  user: {},
  chats: [],
  selectedChat: 1,
  messages: [],
  apiError: null,
});

store.on(StoreEvents.Updated, (prevState, newState) => {
  console.log("prevState", prevState);
  console.log("newState", newState);
});

// authServices.checkLoginUser();

const APP_ROOT_ELEMNT = "#app";
window.router = new Router(APP_ROOT_ELEMNT);
window.router
  .use(ROUTER.login, Pages.LoginPage)
  .use(ROUTER.cats, Pages.ListPage)
  .use("*", Pages.NavigatePage)
  .start();
