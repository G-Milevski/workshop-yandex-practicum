
import { renderDOM, HashRouter, Store } from './core';
import { initApp } from './services/initApp';
import { AppState, defaultState } from './store';
import { initRouter } from './router';

import './app.css';

declare global {
  interface Window {
    store: Store<AppState>;
    router: HashRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new HashRouter();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  store.on('changed', (prevState, nextState) => {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
  });

  /**
   * Инициализируем роутер
   */
  initRouter(router, store);

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
