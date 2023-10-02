import * as Pages from '../pages';

const pages = {
    'login': Pages.LoginPage,
    'emails': Pages.CatMails,
    'registration': Pages.Registration
  };

export function navigate(page: string) {
    const app = document.getElementById('app')!;
  
    //@ts-ignore
    const Component = pages[page]
    const component = new Component();

    app.innerHTML = '';
    app.append(component.getContent()!);
  }