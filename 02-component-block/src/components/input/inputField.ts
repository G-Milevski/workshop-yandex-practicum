import Block from "../../core/block";
import Input from "./input";

type InputFieldProps = {
  label: string;
  onChange: () => void;
  onBlur: () => void;
};
export default class InputField extends Block {
  constructor(props: InputFieldProps) {
    super("div", {
      ...props,
      className: "input",
      change: props.onChange,
      Input: new Input({
        className: "input__element",
        events: {
          blur: props.onChange,
        },
      }),
    });
  }

  public render(): string {
    return `
        <label class="input__container">
          {{{Input}}}
          <div class="input__label">{{label}}</div>
        </label>
        <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
    `;
  }
}
