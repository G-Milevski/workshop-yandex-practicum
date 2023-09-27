import Block from "../../core/Block"

export class CatCard extends Block {
    protected render(): string {
        return (`
            <div class="card {{#if active}}card_active{{/if}}">
                <p>Hi. I'm {{ name }} </p>
                <img src="{{avatar}}" height="200px" width="200px" />
            </div>
        `)
    }
}