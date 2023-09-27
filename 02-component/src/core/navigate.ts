import * as Pages from '../pages';
import Handlebars from 'handlebars';

const pages = {
    'login': Pages.LoginPage,
    'list': Pages.Cats,
  };

export function navigate(page: string) {
    const app = document.getElementById('app');
  
    //@ts-ignore
    const Component = pages[page]
    const component = new Component();
    app?.append(component.getContent()!);
  }