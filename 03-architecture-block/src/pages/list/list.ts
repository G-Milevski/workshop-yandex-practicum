import { Button, CatCard, ListCard } from "../../components"
import Block from "../../core/Block"
import { loadCats } from "../../services/cats";
import { connect } from "../../utils/connect";

class ListPage extends Block {
    componentDidMount(oldProps: any): void {
        loadCats();
    }
    init(): void {
        const onCardClikBind = this.onCardClick.bind(this);
        const linkToLoginPageHandlerBind = this.linkToLoginPageHandler.bind(this);

        const BUttonLinkToLoginPage = new Button({label: 'Пкерейти на логин страницу', type: 'link', onClick: linkToLoginPageHandlerBind});
        const ListCat = new ListCard({cards: this.mapCatCardToCompoennt(this.cats, null, onCardClikBind) || []})

        this.children = {
            ListCat,
            BUttonLinkToLoginPage
        }
    }

    linkToLoginPageHandler() {
        this.props.router.go('/login')
    }

    mapCatCardToCompoennt(catCard, activeId, hundler) {
        return catCard?.map(({name, logo, id}) =>  new CatCard({name, avatar: logo, click: hundler, id, activeId}))
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const onCardClikBind = this.onCardClick.bind(this);
        if(oldProps.cats !== newProps.cats) {
            
            this.children.ListCat.setProps({
                cards: this.mapCatCardToCompoennt(newProps.cats, null, onCardClikBind) || [],
                showEmpty: newProps.cats.length === 0
            })
        }

        // if(oldProps?.selectCat?.id !== newProps?.selectCat?.id) {
        //     const activeId = newProps?.selectCat?.id
        //     this.children.ListCat.setProps({
        //         cards: this.mapCatCardToCompoennt(newProps.cats, activeId, onCardClikBind) || [],
        //     })
        // }

        return true;
    }

    onCardClick(cat) {
        // this.setProps({selectCat: cat})
    }

    render() {
        return `
            <div>
                {{{BUttonLinkToLoginPage}}}
                {{{ ListCat }}}
                {{#if selectCat}}
                    <h1>{{{selectCat.name}}}</h1>
                    <h2>{{{selectCat.avatar}}}</h2>
                    <h3>{{{selectCat.id}}}</h3>
                {{/if}}
            </div>
        `
    }
}

export default connect(({cats, selectedCard}) => ({cats, selectCat: selectedCard}))(ListPage)