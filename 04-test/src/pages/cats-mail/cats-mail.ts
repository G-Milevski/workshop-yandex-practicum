import { DialogCreateChat } from "../../components/dialog-create-chat";
import Block from "../../core/Block";
import { logout } from "../../services/auth";
import { createChat } from "../../services/chat";
import { initChatPage } from "../../services/initApp";
import { Chat } from "../../type";
import { connect } from "../../utils/connect";

interface Props {
    logout: () => void,
    openDialog: () => void,
    closeDialog: () => void,
    onSave: () => void,
    chats: Chat[]
}

type Refs = {
    createChat: DialogCreateChat
}

export class CatsMail extends Block<Props,Refs > {
    constructor(props: Props) {
        super({
            ...props,
            logout: logout,
            openDialog: () => window.store.set({isOpenDialogChat: true}),
            closeDialog: () => window.store.set({isOpenDialogChat: false}),
            onSave: () => {
                const chatTitle = this.refs.createChat.getChatTitle();
                if(!chatTitle) {
                    this.refs.createChat.setError('Название переписки не может быть пустым');
                    return;
                }
                createChat(chatTitle)
                .then(() => window.store.set({isOpenDialogChat: false}))
                .catch(error => this.refs.createChat.setError(error))
            },
        })
        initChatPage()
    }
    protected render(): string {
        // return `{{#ListCat mails=cats}}{{/ListCat}}`
        return `
            <div>
                {{{ Header
                    logout=logout
                    openCreateChatDialog=openDialog
                    user=user
                }}}
                {{{ DialogCreateChat onSave=onSave onClose=closeDialog ref="createChat"}}}
                {{{ ListCatCards chats=chats}}}
            </div>
        `
    }
}


export default connect(({chats, user}) => ({chats, user}))(CatsMail)
