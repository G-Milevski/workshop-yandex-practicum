import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core/resgiterComponent';
import { navigate } from './core/navigate';




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




document.addEventListener('DOMContentLoaded', () => navigate('login'));

