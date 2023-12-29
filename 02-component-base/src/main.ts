import Block from './core/Block';


class Button extends Block {
  constructor(props){
    super({
      ...props,
      events: {
        click: () => console.log('event')
      }
    })
  }
  render() {
    return `<button>{{text}}</button>`
  }
}


class Input extends Block {
  constructor(props){
    super({
      ...props,
      events: {
        input: (evt) => props.onChange(evt.target.value)
      }
    })
  }
  render() {
    return `<input />`
  }
}


class Page extends Block {
  constructor(props) {
    super({
      ...props,
      button: new Button({text: props.buttonText}),
      input: new Input({
        label: 'my input',
        onChange: (value) => {
          // this.setProps({buttonText: value})
          this.children.button.setProps({ text: value});
        }
      }),
    })
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.buttonText !== newProps.buttonText) {
        this.children.button.setProps({ text: newProps.buttonText });
    }

    return true;
}

  render() {
    return `<div>{{{ button }}} {{{ input }}}</div>`
  }
}


const block = new Page({buttonText: 'my button' });
const container = document.getElementById('app')!;
container.append(block.getContent()!);