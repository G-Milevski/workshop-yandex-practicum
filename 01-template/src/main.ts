import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

import cat1 from './assets/01.jpg'
import cat2 from './assets/02.jpg'
import cat3 from './assets/03.jpg'

const pages = {
  'login': [ Pages.LoginPage ],
  'list': [ Pages.ListPage, {
    cats: [
      {name: 'cat-1', avatar: cat1},
      {name: 'cat-2', avatar: cat2, active: true},
      {name: 'cat-3', avatar: cat3},
    ],
    showDialog: true
  }],
  'nav': [ Pages.NavigatePage ]
};

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  console.log('html', temlpatingFunction(context))
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('list'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});



