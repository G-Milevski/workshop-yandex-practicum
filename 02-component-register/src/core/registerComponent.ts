import Block from "./block";
import Handlebars, { HelperOptions } from "handlebars";

interface BlockConstructable<P = PropsBlock> {
  new (props: P): Block;
}

export default function registerComponent<Props extends PropsBlock>(
  Component: BlockConstructable<Props>,
) {
  Handlebars.registerHelper(
    Component.name,
    function (
      this: Props,
      { hash: { ref, ...hash }, data, fn }: HelperOptions,
    ) {
      if (!data.root.children2) {
        data.root.children2 = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children2, refs } = data.root;

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       */
      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === "string") {
          hash[key] = hash[key].replace(
            new RegExp(`{{${key}}}`, "i"),
            this[key],
          );
        }
      });

      const component = new Component(hash);

      children2[component._id] = component;

      if (ref) {
        refs[ref] = component.getContent();
      }

      const contents = fn ? fn(this) : "";

      return `<div data-id="${component._id}">${contents}</div>`;
    },
  );
}
