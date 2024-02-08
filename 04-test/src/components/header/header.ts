import Block from "../../core/Block"

interface IProps {
    logout: () => void,
    openCreateChatDialog: () => void,
}

type Ref = {}

export class Header extends Block<IProps, Ref> {
    protected render(): string {
        return (`
            <div class="header">
                <div class="header__left">
                    {{{ Button type="primary" label="создать переписку" onClick=openCreateChatDialog}}}
                </div>
                <div class="header__right">
                    <div>{{user.firstName}}</div>
                    {{{ Button type="link" label="выйти" onClick=logout}}}
                </div>
            </div>
        `)
    }
}