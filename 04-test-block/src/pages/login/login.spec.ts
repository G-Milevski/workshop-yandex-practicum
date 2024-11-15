import { expect } from "chai";
import sinon from 'sinon';
import LoginPage from "./"

describe('Login Page', () => {
    it.only('Должен показать спинер когда идет загрузка', () => {
        // window.store.set({isLoading: true});
        const loginPage = new LoginPage();
        const component = loginPage.getContent()!;

        const spiner = component.querySelector('h2');

        console.log(component.innerHTML)
        expect(spiner.innerHTML).to.eql('SPINER')
    })

})