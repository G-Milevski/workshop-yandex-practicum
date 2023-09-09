import * as Pages from '../pages';
import Handlebars from 'handlebars';

const pages = {
    'login': Pages.LoginPage,
    'list': Pages.ListPage,
  };

export function navigate(page: string) {
    const app = document.getElementById('app');
  
    if(page === 'list') {
      const container = document.getElementById('app')!;
      container.innerHTML = Handlebars.compile(pages[page])({});
      return;
    }
  
    //@ts-ignore
    const Component = pages[page]
    const component = new Component();
    app?.append(component.getContent()!);
  }