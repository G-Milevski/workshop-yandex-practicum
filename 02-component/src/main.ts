import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { registerComponent } from './core/resgiterComponent';


const pages = {
  'login': Pages.LoginPage,
  'list': Pages.ListPage,
};

// Object.entries(Components).forEach(([ name, component ]) => {
//   if(['Input', 'Button'].includes(name)) {
//     registerComponent(name, component);
//     return;
//   }
//   Handlebars.registerPartial(name, component);

// });


Handlebars.registerPartial('FormAuth', Components.FormAuth);
Handlebars.registerPartial('ListCat', Components.ListCat);
Handlebars.registerPartial('CatCard', Components.CatCard);

registerComponent('Button', Components.Button);
registerComponent('InputField', Components.InputField);
registerComponent('Input', Components.Input);
registerComponent('ErrorLine', Components.ErrorLine);


function navigate(page: string) {
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

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
