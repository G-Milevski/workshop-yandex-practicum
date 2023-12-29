import EventBus from "./EventBus";
import {nanoid} from 'nanoid';
import Handlebars from "handlebars";

export type RefType = {
  [key: string]: Element | Block<object>
}

export interface BlockClass<P extends object, R extends RefType> extends Function {
  new (props: P): Block<P, R>;
  componentName?: string;
}

class Block<Props extends object, Refs extends RefType = RefType> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  protected props: Props;
  protected refs: Refs = {} as Refs;
  private children: Block<object>[] = [];
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  constructor(props: Props = {} as Props) {
    const eventBus = new EventBus();

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this._checkInDom();
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

    /**
   * Хелпер, который проверяет, находится ли элемент в DOM дереве
   * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
   */
    _checkInDom() {
      const elementInDOM = document.body.contains(this._element);
  
      if (elementInDOM) {
        setTimeout(() => this._checkInDom(), 1000);
        return;
      }
  
      this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

  _componentWillUnmount() {
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }


  private _render() {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  private compile(template: string, context: any) {
    const contextAndStubs = {...context, __refs: this.refs};

    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
    })

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;
    contextAndStubs.__children?.forEach(({embed}: any) => {
      embed(temp.content);
    });

    Object.values(this.children).forEach((child) => {
      const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
      stub?.replaceWith(child.getContent()!);
    })

    return temp.content;
  }

  protected render(): string {
    return '';
  }

  getContent() {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount();
        }
      }, 100);
    }
    
    return this._element;
  }

  _makePropsProxy(props: any) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}

        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;