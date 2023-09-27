import Block from "../../core/Block";

export class ListCatCards extends Block {
    static name = 'ListCatCards'

    protected render(): string {
        return (`
            <div>
                <ul>
                    {{#each cats}}
                        {{{ CatCard name="this.name" avatar=this.avatar active=this.active }}}
                    {{/each}}
                </ul>
            </div>
        `)
    }
}