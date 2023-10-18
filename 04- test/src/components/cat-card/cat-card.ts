import Block from "../../core/Block"

interface IProps {
    name: string,
    message: string,
    avatar: string,
    active: boolean,
    events: {
        click: (e: Event) => void
    }
}

type Ref = {}

export class CatCard extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: () => alert('sss')
            }
        })
    }

    protected render(): string {
        return (`
            <div class="card {{#if active}}card_active{{/if}}">
                <div class="card__description">
                    <div class="card__title">{{title}}</div>
                    {{#if lastMessage}}
                        <div class="card__message" >{{lastMessage.content}}</div>
                    {{/if}}
                </div>
                <img class="card__avatar" src="{{avatar}}" height="100" width="100" />
            </div>
        `)
    }
}