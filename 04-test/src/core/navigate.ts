import * as Pages from '../pages';



export function navigate(page: string) {
  const pages = {
    'login': Pages.LoginPage,
    'emails': Pages.CatMails,
    'registration': Pages.Registration
  };
    const app = document.getElementById('app')!;
  
    //@ts-ignore
    const Component = pages[page]
    const component = new Component();

    app.innerHTML = '';
    app.append(component.getContent()!);
  }