import CatsApi from "../api/chat";

const catsApi = new CatsApi();

export const loadCats = async ( ) => {
    window.store.set({isLoading: true});
    try {
        const cats = await catsApi.getCats();
        window.store.set({cats});
        
    } catch (error) {
        window.store.set({loginError: 'some error'});
    } finally {
        window.store.set({isLoading: false});
    }

}


export const setActiveCatCard = (card) => {
    window.store.set({selectedCard: card});
}