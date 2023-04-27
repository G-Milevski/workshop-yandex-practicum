import Handlebars from "handlebars";
import template from './cat-card.hbs';
import catImage from './asserts/cat2.webp';

window.addEventListener('load', () => {
    const rootNode = document.getElementById('root');
    // console.log(template)
    // const handlebarsTemplateDelegate = Handlebars.compile(template);
    rootNode.innerHTML = template({text:'World', image: catImage});
})