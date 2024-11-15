import Block from "../../core/block";

import TrashSVG from "../../assets/icons/trash.svg?raw";

const ICONS_SVG_SOURCE = {
  trash: TrashSVG,
} as const;

interface IconButtonProps {
  kind: keyof typeof ICONS_SVG_SOURCE;
  onClick: () => void;
}

export default class IconButton extends Block {
  constructor(props: IconButtonProps) {
    super("div", {
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    const svgSource = ICONS_SVG_SOURCE[this.props.kind];

    if (!svgSource) {
      return "";
    }

    return svgSource;
  }
}
