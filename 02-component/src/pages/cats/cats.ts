import Block from "../../core/Block";
import cat1 from '../../assets/01.jpg'
import cat2 from '../../assets/02.jpg'
import cat3 from '../../assets/03.jpg'

export class Cats extends Block {
    constructor() {
        super({
            cats: [
                {name: 'cat-1', avatar: cat1},
                {name: 'cat-2', avatar: cat2, active: true},
                {name: 'cat-3', avatar: cat3},
            ],
        })
    }
    protected render(): string {
        return (`
            <div>
                {{#ListCat cats=cats input=input}}{{/ListCat}}
            </div>
        `)
    }
}