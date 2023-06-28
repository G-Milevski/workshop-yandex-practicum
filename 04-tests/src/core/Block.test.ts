
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake()
}

const {default: Block} = proxyquire('./Block.ts', {
    './EventBus.ts': {
        default: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on
        }
    }
})

describe.only('Block', () => {
    class ComponentMock extends Block{};

    it('Должен диспатчить init событие после инициализации', () => {
        //@ts-ignore
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith(ComponentMock.EVENTS.INIT)).to.be.true;
    });

})