import sinon from "sinon";
import PathRouter, { TRouteConstructor } from "./PathRouter";
import { expect } from "chai";
import Block from '../Block'

describe('Router', () => {
    let BlockMock: Block;
    //@ts-ignore
    let getContentFake = sinon.stub();
    let router: PathRouter;

    beforeEach(() => {
        getContentFake.returns(document.createElement('div'));
        BlockMock = class {
            //@ts-ignore
            getContent = getContentFake
        } as unknown as Block
        router = new PathRouter('#app');
    })

    afterEach(() => {
        sinon.restore();
    })

    it('метод use должен вернуть инстанс роутера', () => {
        const params: TRouteConstructor = {
            //@ts-ignore
            block: BlockMock,
            exact: true,
            needAuth: true,
            onUnautorized: () => true,
            pathname: '/',
            props: {},
            redirectPath: '/'
        }
        const result = router.use(params);

        expect(result).to.eq(router);
    });

    it('Должен отрисовать страницу после запуска роутера', () => {
        const params: TRouteConstructor = {
            //@ts-ignore
            block: BlockMock,
            exact: true,
            needAuth: true,
            onUnautorized: () => true,
            pathname: '/',
            props: {},
            redirectPath: '/'
        }
        router.use(params).start();

        expect(getContentFake.callCount).to.eql(1);
    });

    describe('back()', () => {
        it('Должен отрисовать предыдушию страницу', () => {
            const params: TRouteConstructor = {
                //@ts-ignore
                block: BlockMock,
                exact: true,
                needAuth: true,
                onUnautorized: () => true,
                pathname: '/',
                props: {},
                redirectPath: '/'
            }
            router.use(params).start();

            router.back();

            expect(getContentFake.callCount).to.eql(2);
        })
    })
})