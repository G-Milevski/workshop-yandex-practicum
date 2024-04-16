import Handlebars from 'handlebars';
import './list-cat.css';
import cat1 from '../../assets/01.jpg'
import cat2 from '../../assets/02.jpg'
import cat3 from '../../assets/03.jpg'

export { default as ListCat } from './list-cat.hbs?raw';


Handlebars.registerHelper('cats', () => {
    return [
        {name: 'cat-1', avatar: cat1},
        {name: 'cat-2', avatar: cat2, active: true},
        {name: 'cat-3', avatar: cat3},
    ]
})