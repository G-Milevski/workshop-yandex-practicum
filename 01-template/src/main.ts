import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';


const pages = {
  'login': [ Pages.LoginPage, {test: '123'} ],
  'list': [ Pages.ListPage ],
  'nav': [ Pages.NavigatePage ],
  'sign-up': [ Pages.SignUpPage ],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});



