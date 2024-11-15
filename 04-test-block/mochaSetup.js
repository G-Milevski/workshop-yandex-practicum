import {JSDOM} from 'jsdom'
import { Store } from './src/core/Store.ts';

// jsdom
const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;


global.window.store = new Store({
    isLoading: false,
    loginError: null,
    cats: [],
    user: null,
    selectedCard: null
  });
  