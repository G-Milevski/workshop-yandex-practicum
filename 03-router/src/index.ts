
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

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.store = store;

  store.on('changed', (prevState, nextState) => {
      if(!prevState.appIsInited && nextState.appIsInited) {
        initRouter(store);
      }
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
  });

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
