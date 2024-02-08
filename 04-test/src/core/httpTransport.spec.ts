import sinon from 'sinon';
import {HTTPTransport, METHOD} from './httpTransport'
import { expect } from 'chai';
import { METHODS } from 'http';
import constants from "../constants";

describe('HttpTransport', () => {
    afterEach(() => {
        sinon.restore();
    })
    it('test', async () => {
        const http = new HTTPTransport('/test');
        const requestStub = sinon.stub(http, 'request').resolves();

        await http.get('', {data: { a: '1', b: '2 2' }});

        const expectedUrl = `${constants.HOST}/test?a=1&b=2%202`

        expect(requestStub.calledWithMatch(expectedUrl, {method: METHOD.GET})).to.be.true;
    })
})