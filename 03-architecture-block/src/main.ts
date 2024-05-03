import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Router from './core/Router';
import { Store } from './core/Store';

declare global {
  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
}

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});


const router = new Router('#app');
window.router = router;

window.store = new Store({
  isLoading: false,
  loginError: null,
  cats: [],
  user: null,
  selectedCard: null
});


router.use('/login', Pages.LoginPage)
.use('/cats', Pages.ListPage)
.use('*', Pages.Page404)
.start();



