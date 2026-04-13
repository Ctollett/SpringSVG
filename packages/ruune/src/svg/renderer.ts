import { PathCommand } from "./types";

import { serialize } from "./path";

export function render(element: SVGPathElement, commands: PathCommand[]): void {
    element.setAttribute('d', serialize(commands))
}