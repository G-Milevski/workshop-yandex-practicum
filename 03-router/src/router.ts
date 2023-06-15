import { PathRouter } from './core';

export const router = new PathRouter('#app')

import HomePage from './pages/Home';
import Login from './pages/Login';
import Description from './pages/Description';

export function initRouter(store) {
  router
    .use({
      pathname: '/login',
      block: Login,
    })
    .use({
      pathname: '/home',
      block: HomePage,
      needAuth: true,
      redirectPath: '/login',
      onUnautorized: () => Boolean(store.getState().user),
    })
    .use({
      pathname: '/description',
      block: Description,
      needAuth: true,
      redirectPath: '/login',
      onUnautorized: () => Boolean(store.getState().user),
    })
    .start();
}

