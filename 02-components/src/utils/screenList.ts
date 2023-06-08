import HomePage from '../pages/Home';
import {Login} from '../pages/Login';
import Description from '../pages/Description';
import Block from '../core/Block';

export enum Screens {
  Home = 'home',
  Login = 'login',
  Description = 'description',
}

const map: Record<Screens, any> = {
  [Screens.Home]: HomePage,
  [Screens.Login]: Login,
  [Screens.Description]: Description,
};

export const getScreenComponent = (screen: Screens): Block<any> => {
  return map[screen];
};
