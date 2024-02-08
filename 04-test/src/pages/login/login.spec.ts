import { expect } from "chai";
import sinon from 'sinon';
import LoginPage from "./"

describe('Login Page', () => {
    it.only('Show error', () => {
        const loginPage = new LoginPage();
        const component = loginPage.getContent()!;

        const inputs = component.querySelectorAll('input');
        inputs.forEach(i => {
            i.value = '22'
        })

        const btnSign = component.querySelector<HTMLButtonElement>('.button__primary')!;
        btnSign.click();

        const errorText = component.querySelector<HTMLElement>('.input__text-error')!.innerHTML;

        console.log(component.innerHTML)

        expect(errorText).to.eql('Length of login should not be less 3 letters.')
    })

})