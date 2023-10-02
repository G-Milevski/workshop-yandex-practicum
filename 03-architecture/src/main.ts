import * as Components from './components';
import { registerComponent } from './core/resgiterComponent';
import { Store } from './core/Store';
import { AppState } from './type';
import { initApp } from './services/initApp';


declare global {
  interface Window {
    store: Store<AppState>;
  }

  type Nullable<T> = T | null;

}

const initState: AppState = {
  error: null,
  user: null,
  isOpenDialogChat: false,
  chats: []
}
window.store = new Store<AppState>(initState);

Object.entries(Components).forEach(
    ([componentName, component]) => registerComponent(componentName, component)
)




document.addEventListener('DOMContentLoaded', () => initApp());

