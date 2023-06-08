import { HashRouter, Store, renderDOM } from './core';
import { AppState } from './store';
import { getScreenComponent, Screens } from './utils';

const routes = [
  {
    path: '#login',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '#home',
    block: Screens.Home,
    shouldAuthorized: true,
  },
  {
    path: '#description',
    block: Screens.Description,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Home,
    shouldAuthorized: true,
  },
];

export function initRouter(router: HashRouter, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);
      
      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        console.log('go to home');
        store.dispatch({ screen: Screens.Login });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
    
    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
    }
  });
}
