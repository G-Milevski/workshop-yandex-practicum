import Block from "../../core/Block";
import { Chat } from "../../type";

interface Props {
    chats: Chat[],
}

type Refs = {}

export class ListCatCards extends Block<Props, Refs> {
    protected render(): string {
        return (`
            <ul>
                {{#each chats}}
                    {{{ CatCard
                        title=this.title
                        avatar=this.avatar
                        lastMessage=this.lastMessage
                    }}}
                {{/each}}
            </ul>
        `)
    }
}